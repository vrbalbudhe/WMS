import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

const ProductScanPage = () => {
  const { warehouseId, warehouseOfficer } = useParams();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [scanner, setScanner] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const navigate = useNavigate();

  // Initialize QR scanner
  useEffect(() => {
    if (!scanResult) {
      const qrScanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
        },
        false
      );

      setScanner(qrScanner);

      qrScanner.render(onScanSuccess, onScanFailure);
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, []);

  // Handle successful scan
  const onScanSuccess = (decodedText) => {
    try {
      // Parse the QR code content as JSON
      const scannedData = JSON.parse(decodedText);
      setScanResult(scannedData);

      // Stop the scanner after successful scan
      if (scanner) {
        scanner.clear();
      }

      // Automatically trigger data submission
      handleSubmitScan(scannedData);
    } catch (err) {
      setError("Invalid QR code format. Expected JSON data.");
    }
  };

  const onScanFailure = (error) => {
    // You can handle scan failures here if needed
    console.warn(`QR Code scan error: ${error}`);
  };

  // Submit scanned data to database
  const handleSubmitScan = async (scannedData) => {
    try {
      setIsSaving(true);

      // Add warehouse and officer info to the scanned data
      const dataToSubmit = {
        ...scannedData,
        warehouseId: warehouseId,
        warehouseOfficer: warehouseOfficer,
        status: status || "qr",
        scanTimestamp: new Date().toISOString(),
      };

      // Send data to your API
      const response = await fetch("/api/product-scans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error(`Error saving scan data: ${response.statusText}`);
      }

      const result = await response.json();
      setProduct(result);
      setScanSuccess(true);
      setIsSaving(false);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
      setLoading(false);
    }
  };

  // Fetch product data if IDs are provided in URL
  useEffect(() => {
    const fetchProductData = async () => {
      if (!warehouseId) return;

      try {
        setLoading(true);
        const response = await fetch(
          `/api/products/${warehouseId}${warehouseOfficer ? "/" + warehouseOfficer : ""}?status=${status || "qr"}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching product: ${response.statusText}`);
        }

        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [warehouseId, warehouseOfficer, status]);

  // Handle scan again
  const handleScanAgain = () => {
    setScanResult(null);
    setScanSuccess(false);
    setProduct(null);
    setError(null);

    // Re-initialize the scanner
    setTimeout(() => {
      const qrScanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        false
      );

      setScanner(qrScanner);
      qrScanner.render(onScanSuccess, onScanFailure);
    }, 100);
  };

  // Show scanner if no result yet
  if (!scanResult && !product) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Scan Product QR Code</h1>
        <div className="mb-4">
          <p className="text-gray-700 mb-4">
            Position the QR code within the scanner area.
          </p>
          <div
            id="reader"
            className="w-full max-w-md mx-auto border rounded"
          ></div>
        </div>

        {error && (
          <div className="p-4 mt-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>
    );
  }

  // Show loading state
  if (loading || isSaving) {
    return (
      <div className="p-4 text-center">
        {isSaving
          ? "Saving scan data to database..."
          : "Loading product information..."}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4">
        <div className="text-center text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={handleScanAgain}
          className="mx-auto block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Scan Again
        </button>
      </div>
    );
  }

  // Show product details after successful scan
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {scanSuccess ? "Scan Successful!" : "Product Details"}
      </h1>

      <div className="bg-white shadow rounded-lg p-6 mb-4">
        {scanSuccess && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            Product data has been successfully recorded in the database.
          </div>
        )}

        <div className="mb-4">
          <span className="font-semibold">Warehouse ID:</span>{" "}
          {product.warehouseId || warehouseId}
        </div>

        {(product.warehouseOfficer || warehouseOfficer) && (
          <div className="mb-4">
            <span className="font-semibold">Warehouse Officer:</span>{" "}
            {product.warehouseOfficer || warehouseOfficer}
          </div>
        )}

        <div className="mb-4">
          <span className="font-semibold">Status:</span>{" "}
          {product.status || status || "qr"}
        </div>

        {product.scanTimestamp && (
          <div className="mb-4">
            <span className="font-semibold">Scan Time:</span>{" "}
            {new Date(product.scanTimestamp).toLocaleString()}
          </div>
        )}

        {/* Display the product data */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="mb-2">{product.description}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              {product.category && (
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
              )}
              {product.price && (
                <p>
                  <span className="font-medium">Price:</span> ${product.price}
                </p>
              )}
            </div>
            <div>
              {product.sku && (
                <p>
                  <span className="font-medium">SKU:</span> {product.sku}
                </p>
              )}
              {product.inStock !== undefined && (
                <p>
                  <span className="font-medium">In Stock:</span>{" "}
                  {product.inStock ? "Yes" : "No"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleScanAgain}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Scan Another Product
        </button>

        <button
          onClick={() => navigate("/procurement/dashboard")}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProductScanPage;

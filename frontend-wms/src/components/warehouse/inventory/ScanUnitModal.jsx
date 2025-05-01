// frontend-wms/src/components/warehouse/inventory/ScanUnitModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaTimes, FaQrcode, FaSync, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const ScanUnitModal = ({ onClose, onSuccessfulScan }) => {
  const [qrData, setQrData] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  
  // Try to initialize QR scanner when component mounts
  useEffect(() => {
    startScanner();
    
    // Cleanup function to stop scanner when component unmounts
    return () => {
      stopScanner();
    };
  }, []);
  
  // Start the QR scanner
  const startScanner = async () => {
    try {
      // Reset states
      setScanning(false);
      setCameraError(null);
      
      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Your browser does not support camera access for QR scanning.');
        return;
      }
      
      // Try to get camera access, prioritizing rear camera
      try {
        // First try to get the environment-facing camera (rear)
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
      } catch (err) {
        // If that fails, try to get any camera
        console.log("Couldn't access rear camera, trying any camera:", err);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        streamRef.current = stream;
      }
      
      // Set video source
      if (videoRef.current && streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
            .then(() => {
              console.log("Camera successfully started");
              setScanning(true);
              setTimeout(processVideoFrame, 1000);
            })
            .catch(e => {
              console.error("Error playing video:", e);
              setCameraError("Could not play video stream: " + e.message);
            });
        };
      } else {
        setCameraError('Camera initialization failed. Please try again or use manual input.');
      }
    } catch (err) {
      console.error('Error starting scanner:', err);
      setCameraError('Could not access camera. Please check permissions or use manual input.');
    }
  };
  
  // Stop the QR scanner
  const stopScanner = () => {
    setScanning(false);
    
    // Stop video stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    
    // Clear video source
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };
  
  // Process video frames to detect QR codes
  const processVideoFrame = async () => {
    if (!scanning || !videoRef.current) return;
    
    try {
      // This is where you would normally use a QR code scanning library.
      // For this example, we'll simulate finding a QR code after a delay
      
      // In a real implementation, you would use a library like @zxing/browser or html5-qrcode
      // Example with @zxing/browser:
      // const codeReader = new BrowserQRCodeReader();
      // const result = await codeReader.decodeOnceFromVideoElement(videoRef.current);
      // if (result) {
      //   const qrText = result.getText();
      //   setQrData(qrText);
      //   await processScannedData(qrText);
      // }
      
      // Simulate successful scan after 5 seconds for demonstration
      setTimeout(() => {
        // Generate a random QR code data for demo
        const demoQrData = `PRD-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
        setQrData(demoQrData);
        processScannedData(demoQrData);
      }, 5000);
      
      // Continue scanning if no QR code is found yet
      if (!qrData) {
        setTimeout(processVideoFrame, 500);
      }
    } catch (err) {
      console.error('Error processing video frame:', err);
      // Continue scanning despite error
      setTimeout(processVideoFrame, 500);
    }
  };
  
  // Process scanned QR data
  const processScannedData = async (data) => {
    if (!data) return;
    
    try {
      setLoading(true);
      setError(null);
      stopScanner(); // Stop scanning once we have data
      
      // Call the API to get unit and product details
      const response = await axios.post(
        'http://localhost:8000/api/wm/units/scan',
        { qrData: data },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setScanResult(response.data.data);
        if (onSuccessfulScan) {
          onSuccessfulScan(response.data.data);
        }
      } else {
        setError(response.data.message || 'Failed to process QR code');
        startScanner(); // Restart scanning on error
      }
    } catch (err) {
      console.error('Error processing QR data:', err);
      setError(err.response?.data?.message || err.message || 'Failed to process QR code');
      startScanner(); // Restart scanning on error
    } finally {
      setLoading(false);
    }
  };
  
  // Handle manual input submission
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualInput.trim()) {
      setQrData(manualInput);
      processScannedData(manualInput);
    }
  };
  
  // Restart scanner
  const handleRescan = () => {
    setQrData('');
    setManualInput('');
    setScanResult(null);
    setError(null);
    startScanner();
  };
  
  // Get product status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      case 'damaged':
        return 'bg-red-100 text-red-800';
      case 'lost':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Scan Product Unit</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-grow">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded flex items-center">
              <FaExclamationTriangle className="mr-2" />
              <p>{error}</p>
            </div>
          )}
          
          {/* Camera Error Message */}
          {cameraError && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded flex items-center">
              <FaExclamationTriangle className="mr-2" />
              <p>{cameraError}</p>
            </div>
          )}
          
          {/* Scan Result */}
          {scanResult ? (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheck className="text-green-600 text-3xl" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-center mb-2">Unit Found!</h3>
                
                <div className="border-t border-b border-gray-200 py-3 my-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-gray-500">Unit ID:</div>
                    <div className="text-sm font-medium">{scanResult.unitId}</div>
                    
                    <div className="text-sm text-gray-500">Status:</div>
                    <div>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(scanResult.status)}`}>
                        {scanResult.status.charAt(0).toUpperCase() + scanResult.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-500">Product:</div>
                    <div className="text-sm font-medium">{scanResult.product.name}</div>
                    
                    <div className="text-sm text-gray-500">Category:</div>
                    <div className="text-sm">{scanResult.product.category?.name || '—'}</div>
                    
                    <div className="text-sm text-gray-500">Warehouse:</div>
                    <div className="text-sm">{scanResult.product.warehouse?.name || '—'}</div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4 space-x-3">
                  <button
                    onClick={handleRescan}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <FaSync className="mr-2" /> Scan Another
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Scanner */}
              <div className="border rounded-lg overflow-hidden">
                <div className="aspect-video bg-black relative">
                  {scanning ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                      ></video>
                      
                      {/* Overlay for scan area */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3/4 h-1/2 border-2 border-white rounded"></div>
                      </div>
                      
                      {/* Loading indicator */}
                      <div className="absolute top-4 right-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <FaQrcode className="text-4xl mx-auto mb-2" />
                        <p>{cameraError ? 'Camera not available' : 'Initializing camera...'}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 bg-gray-50">
                  <p className="text-sm text-gray-600 text-center">
                    Point your camera at a product QR code
                  </p>
                </div>
              </div>
              
              {/* Manual Entry */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-2">Manual Entry</h3>
                <form onSubmit={handleManualSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Enter QR code data or Unit ID"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
          
          {/* Loading Indicator */}
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <p>Processing...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanUnitModal;
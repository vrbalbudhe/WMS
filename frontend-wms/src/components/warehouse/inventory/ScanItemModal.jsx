import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaBarcode, FaCheck, FaCamera } from 'react-icons/fa';

const ScanItemModal = ({ onClose, onItemDetected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanMethod, setScanMethod] = useState('camera'); // 'camera' or 'manual'
  const [cameraError, setCameraError] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  
  // Mock function to simulate barcode detection
  const simulateBarcodeScan = () => {
    // In a real app, this would use a barcode scanning library
    return new Promise((resolve) => {
      // Simulate processing time
      setTimeout(() => {
        // Generate a random barcode for demonstration
        const randomCode = 'ITM-' + Math.floor(1000 + Math.random() * 9000);
        resolve(randomCode);
      }, 1500);
    });
  };
  
  // Start camera for scanning
  const startScanning = async () => {
    try {
      setCameraError(null);
      
      // Access user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      // Store stream reference to stop it later
      streamRef.current = stream;
      
      // Connect stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        
        // Start the scanning process after a short delay
        setTimeout(processScan, 1000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Unable to access camera. Please check permissions or try manual entry.');
      setIsScanning(false);
      setScanMethod('manual');
    }
  };
  
  // Process the video frame to detect barcodes
  const processScan = async () => {
    if (!isScanning) return;
    
    try {
      // Capture current video frame
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (video && canvas && video.readyState === 4) {
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // In a real app, this would pass the canvas data to a barcode detection library
        // Instead, we'll simulate a barcode detection
        const code = await simulateBarcodeScan();
        
        // Stop scanning and return result
        stopScanning();
        setScanResult(code);
      } else {
        // If video isn't ready yet, try again
        setTimeout(processScan, 500);
      }
    } catch (error) {
      console.error('Error processing scan:', error);
      // Continue scanning despite error
      setTimeout(processScan, 500);
    }
  };
  
  // Stop scanning
  const stopScanning = () => {
    setIsScanning(false);
    
    // Stop the camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Clear video source
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };
  
  // Submit manual barcode
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      setScanResult(manualCode);
    }
  };
  
  // Confirm the scanned item
  const confirmScan = () => {
    if (scanResult) {
      onItemDetected(scanResult);
    }
  };
  
  // Restart scanning
  const resetScan = () => {
    setScanResult(null);
    setManualCode('');
    
    if (scanMethod === 'camera') {
      startScanning();
    }
  };
  
  // Switch scan method
  const switchScanMethod = (method) => {
    stopScanning();
    setScanMethod(method);
    setScanResult(null);
    
    if (method === 'camera') {
      startScanning();
    }
  };
  
  // Start scanning when the component mounts and scanMethod is 'camera'
  useEffect(() => {
    if (scanMethod === 'camera') {
      startScanning();
    }
    
    // Cleanup on unmount
    return () => {
      stopScanning();
    };
  }, [scanMethod]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Scan Inventory Item</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Scan method toggle */}
        <div className="flex border-b">
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${scanMethod === 'camera' 
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => switchScanMethod('camera')}
          >
            <div className="flex items-center justify-center">
              <FaCamera className="mr-2" />
              Camera Scan
            </div>
          </button>
          {/* <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${scanMethod === 'manual' 
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => switchScanMethod('manual')}
          >
            <div className="flex items-center justify-center">
              <FaBarcode className="mr-2" />
              Manual Entry
            </div>
          </button> */}
        </div>
        
        {/* Body */}
        <div className="p-6">
          {scanMethod === 'camera' && !scanResult && (
            <div className="space-y-4">
              {cameraError ? (
                <div className="bg-red-50 text-red-700 p-3 rounded-md">
                  {cameraError}
                </div>
              ) : (
                <>
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline 
                      className="absolute inset-0 w-full h-full object-cover"
                    ></video>
                    <canvas ref={canvasRef} className="hidden"></canvas>
                    
                    {/* Scan overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-1/3 border-2 border-white border-opacity-70 rounded-md flex items-center justify-center">
                        {isScanning && (
                          <div className="animate-pulse text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                            Scanning...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 text-center">
                    Position the barcode within the frame to scan it automatically.
                  </p>
                </>
              )}
            </div>
          )}
          
          {scanMethod === 'manual' && !scanResult && (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label htmlFor="barcodeInput" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Item ID or Barcode
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="barcodeInput"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., ITM-1234"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                Enter the item ID printed on the label or scan the barcode manually with an external scanner.
              </p>
            </form>
          )}
          
          {scanResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg">
                <div className="text-center">
                  <FaBarcode className="mx-auto text-green-500" size={48} />
                  <h3 className="mt-2 text-xl font-semibold text-gray-800">{scanResult}</h3>
                  <p className="text-green-600 mt-1">Item code detected</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={resetScan}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Rescan
                </button>
                <button
                  onClick={confirmScan}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanItemModal;
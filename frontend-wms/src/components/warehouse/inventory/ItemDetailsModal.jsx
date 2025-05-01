// frontend-wms/src/components/warehouse/inventory/ItemDetailsModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaTimes, 
  FaEdit, 
  FaBoxOpen, 
  FaClipboardCheck, 
  FaWarehouse, 
  FaTag,
  FaQrcode, 
  FaExclamationTriangle,
  FaDownload,
  FaSync,
  FaTrash
} from 'react-icons/fa';

const ItemDetailsModal = ({ product, onClose, onEdit }) => {
  const [units, setUnits] = useState([]);
  const [unitCount, setUnitCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [confirmDeleteUnit, setConfirmDeleteUnit] = useState(null);
  const itemsPerPage = 5;
  
  useEffect(() => {
    if (product && product.id) {
      fetchUnits(1);
    }
  }, [product]);
  
  // Fetch units for this product
  const fetchUnits = async (page) => {
    if (!product || !product.id) return;
    
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/wm/products/${product.id}/units?page=${page}&limit=${itemsPerPage}`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setUnits(response.data.data);
        setUnitCount(response.data.pagination.total);
        setTotalPages(response.data.pagination.pages);
        setCurrentPage(page);
      } else {
        setError('Failed to load units');
      }
    } catch (err) {
      console.error('Error fetching units:', err);
      setError('An error occurred while loading units');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle viewing QR code
  const handleViewQRCode = async (unitId) => {
    try {
      setLoading(true);
      
      const response = await axios.get(
        `http://localhost:8000/api/wm/units/${unitId}/qr`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setSelectedUnit(response.data.data.unit);
        setQrCodeUrl(response.data.data.qrCode);
        setShowQRCode(true);
      } else {
        setError('Failed to generate QR code');
      }
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('An error occurred while generating QR code');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle deleting a unit
  const handleDeleteUnit = async (unitId) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Deleting unit with ID: ${unitId}`);
      
      // Make sure we're using the correct endpoint path
      const response = await axios.delete(
        `http://localhost:8000/api/wm/units/${unitId}`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        // Update the product quantity displayed
        if (product && product.quantity) {
          product.quantity = response.data.data.newQuantity;
        }
        
        // Refresh the units list
        fetchUnits(currentPage);
        
        // Close confirmation dialog
        setConfirmDeleteUnit(null);
      } else {
        setError('Failed to delete unit: ' + (response.data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error deleting unit:', err);
      setError('An error occurred while deleting the unit: ' + 
        (err.response?.data?.message || err.message || 'Unknown error'));
      
      // Log additional details for debugging
      if (err.response) {
        console.log('Response status:', err.response.status);
        console.log('Response data:', err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Get product status badge color
  const getStatusColor = (quantity, minStockLevel) => {
    if (quantity <= 0) {
      return 'bg-red-100 text-red-800';
    } else if (quantity <= minStockLevel) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-green-100 text-green-800';
    }
  };

  // Get status text
  const getStatusText = (quantity, minStockLevel) => {
    if (quantity <= 0) {
      return 'Out of Stock';
    } else if (quantity <= minStockLevel) {
      return 'Low Stock';
    } else {
      return 'In Stock';
    }
  };
  
  // Get status badge for unit
  const getUnitStatusBadge = (status) => {
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
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Handle page change in pagination
  const handlePageChange = (newPage) => {
    fetchUnits(newPage);
  };
  
  // Get custom fields for display
  const customFields = product?.customFields 
    ? Object.entries(product.customFields).map(([key, value]) => ({
        name: key,
        value: value
      }))
    : [];
  
  if (!product) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Basic details */}
            <div>
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Product Name</div>
                <div className="text-lg font-medium">{product.name}</div>
              </div>
              
              {product.sku && (
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">SKU</div>
                  <div className="flex items-center">
                    <FaTag className="text-gray-400 mr-2" size={14} />
                    {product.sku}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Category</div>
                <div>{product.category?.name || "—"}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.quantity, product.minStockLevel)}`}>
                    {getStatusText(product.quantity, product.minStockLevel)}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Warehouse</div>
                <div className="flex items-center">
                  <FaWarehouse className="text-gray-400 mr-2" size={14} />
                  {product.warehouse?.name || "—"}
                </div>
              </div>
            </div>
            
            {/* Right column - Inventory details */}
            <div>
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Current Quantity</div>
                <div className="text-2xl font-bold text-blue-600">{product.quantity}</div>
                {product._count?.units > 0 && (
                  <div className="text-sm text-blue-600 flex items-center mt-1">
                    <FaQrcode className="mr-1" /> 
                    {product._count.units} individual units tracked
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Minimum Stock Level</div>
                <div>{product.minStockLevel}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Created At</div>
                <div>{formatDate(product.createdAt)}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Last Updated</div>
                <div>{formatDate(product.updatedAt)}</div>
              </div>
              
              {product.createdByUser && (
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Created By</div>
                  <div>{product.createdByUser.name} ({product.createdByUser.email})</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Description */}
          {product.description && (
            <div className="mt-4 mb-8">
              <div className="text-sm text-gray-500 mb-1">Description</div>
              <div className="bg-gray-50 p-3 rounded text-gray-700">
                {product.description}
              </div>
            </div>
          )}
          
          {/* Custom Fields */}
          {customFields.length > 0 && (
            <div className="mt-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Fields</h3>
              
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {customFields.map((field, index) => (
                    <div key={index} className="border-b border-gray-200 pb-2">
                      <div className="text-xs font-medium text-gray-500">{field.name}</div>
                      <div className="text-sm">
                        {typeof field.value === 'boolean' 
                          ? field.value ? 'Yes' : 'No'
                          : field.value?.toString() || '—'
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Units Section */}
          {product._count?.units > 0 && (
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Product Units ({product._count.units})
                </h3>
                <button 
                  onClick={() => fetchUnits(currentPage)}
                  className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                >
                  <FaSync className="mr-1" size={12} /> Refresh
                </button>
              </div>
              
              {error && (
                <div className="bg-red-100 p-3 rounded mb-4 text-red-700 flex items-center">
                  <FaExclamationTriangle className="mr-2" />
                  <p>{error}</p>
                </div>
              )}
              
              {loading ? (
                <div className="py-8 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : units.length === 0 ? (
                <p className="text-gray-500 py-4 text-center">No individual units found for this product.</p>
              ) : (
                <>
                  {/* Units Table */}
                  <div className="overflow-hidden border rounded-lg shadow-sm mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Unit ID
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {units.map((unit) => (
                          <tr key={unit.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="font-medium text-gray-900">{unit.unitId}</span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUnitStatusBadge(unit.status)}`}>
                                {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(unit.createdAt)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => handleViewQRCode(unit.unitId)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="View QR Code"
                                >
                                  <FaQrcode size={16} />
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteUnit(unit.unitId)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Remove Unit"
                                >
                                  <FaTrash size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-between items-center py-2">
                      <p className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                      </p>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={`px-3 py-1 rounded ${
                            currentPage === 1
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-1 rounded ${
                            currentPage === totalPages
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          
          {/* QR Code Modal */}
          {showQRCode && selectedUnit && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
                <div className="text-lg font-bold mb-2 text-center">
                  Unit: {selectedUnit.unitId}
                </div>
                <div className="mb-4 text-center">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getUnitStatusBadge(selectedUnit.status)}`}>
                    {selectedUnit.status.charAt(0).toUpperCase() + selectedUnit.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-center mb-4">
                  <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 border p-2" />
                </div>
                <div className="text-xs text-center text-gray-500 mb-4">
                  QR Code Data: {selectedUnit.qrCodeData}
                </div>
                <div className="flex justify-center space-x-3">
                  <a 
                    href={qrCodeUrl}
                    download={`qrcode-${selectedUnit.unitId}.png`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                  >
                    <FaDownload className="mr-2" /> Download
                  </a>
                  <button 
                    onClick={() => setShowQRCode(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Confirm Delete Unit Modal */}
          {confirmDeleteUnit && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
                <div className="text-lg font-bold mb-4 text-red-600">
                  Remove Unit
                </div>
                <p className="mb-6">
                  Are you sure you want to remove this unit? This action will decrease the product quantity and cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setConfirmDeleteUnit(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteUnit(confirmDeleteUnit)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Remove Unit
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Quick actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={onEdit}
              className="flex items-center justify-center p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              <FaEdit className="mr-2" />
              Edit Product
            </button>
            <button className="flex items-center justify-center p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
              <FaBoxOpen className="mr-2" />
              Update Stock
            </button>
            <button className="flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
              <FaClipboardCheck className="mr-2" />
              Count Inventory
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
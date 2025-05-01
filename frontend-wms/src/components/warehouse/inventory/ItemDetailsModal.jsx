// Path: frontend-wms/src/components/warehouse/inventory/ItemDetailsModal.jsx
import React from 'react';
import { FaTimes, FaEdit, FaBoxOpen, FaClipboardCheck, FaWarehouse, FaTag, FaInfoCircle } from 'react-icons/fa';

const ItemDetailsModal = ({ product, onClose, onEdit }) => {
  if (!product) return null;
  
  // Helper function to determine badge color based on status
  const getStatusColor = (quantity, minStockLevel) => {
    if (quantity <= 0) {
      return 'bg-red-100 text-red-800';
    } else if (quantity <= minStockLevel) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-green-100 text-green-800';
    }
  };

  // Helper function to get status text
  const getStatusText = (quantity, minStockLevel) => {
    if (quantity <= 0) {
      return 'Out of Stock';
    } else if (quantity <= minStockLevel) {
      return 'Low Stock';
    } else {
      return 'In Stock';
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Get custom fields as array for rendering
  const customFields = product.customFields 
    ? Object.entries(product.customFields).map(([key, value]) => ({
        name: key,
        value: value
      }))
    : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
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
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaInfoCircle className="mr-2 text-blue-600" />
                Custom Fields
              </h3>
              
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
            className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
// Path: frontend-wms/src/components/warehouse/inventory/InventoryTable.jsx
import React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEye, FaEdit, FaTrash, FaExclamationTriangle } from 'react-icons/fa';

const InventoryTable = ({ 
  products, 
  sortField, 
  sortDirection, 
  onSort, 
  onView, 
  onEdit, 
  onDelete,
  loading
}) => {
  // Function to show the appropriate sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className="text-gray-400" />;
    }
    return sortDirection === 'asc' ? <FaSortUp className="text-blue-600" /> : <FaSortDown className="text-blue-600" />;
  };
  
  // Function to get status badge style
  const getStatusBadge = (quantity, minStockLevel) => {
    if (quantity <= 0) {
      return 'bg-red-100 text-red-800';
    } else if (quantity <= minStockLevel) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-green-100 text-green-800';
    }
  };

  // Function to get status text
  const getStatusText = (quantity, minStockLevel) => {
    if (quantity <= 0) {
      return 'Out of Stock';
    } else if (quantity <= minStockLevel) {
      return 'Low Stock';
    } else {
      return 'In Stock';
    }
  };

  // Display fewer columns on small screens
  const isSmallScreen = window.innerWidth < 768;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {products.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No products found. Try adjusting your search or filters, or add your first product.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  style={{ width: isSmallScreen ? '40%' : '25%' }}
                  onClick={() => onSort('name')}
                >
                  <div className="flex items-center">
                    Name {getSortIcon('name')}
                  </div>
                </th>
                {!isSmallScreen && (
                  <th 
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    style={{ width: '15%' }}
                    onClick={() => onSort('category.name')}
                  >
                    <div className="flex items-center">
                      Category {getSortIcon('category.name')}
                    </div>
                  </th>
                )}
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  style={{ width: isSmallScreen ? '15%' : '10%' }}
                  onClick={() => onSort('quantity')}
                >
                  <div className="flex items-center">
                    Qty {getSortIcon('quantity')}
                  </div>
                </th>
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  style={{ width: isSmallScreen ? '30%' : '15%' }}
                >
                  <div className="flex items-center">
                    Status
                  </div>
                </th>
                {!isSmallScreen && (
                  <th 
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    style={{ width: '25%' }}
                    onClick={() => onSort('createdAt')}
                  >
                    <div className="flex items-center">
                      Created At {getSortIcon('createdAt')}
                    </div>
                  </th>
                )}
                <th 
                  className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ width: isSmallScreen ? '15%' : '10%' }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate">
                    {product.name}
                    {product.sku && <div className="text-xs text-gray-500">SKU: {product.sku}</div>}
                  </td>
                  {!isSmallScreen && (
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 truncate">
                      {product.category?.name || "—"}
                    </td>
                  )}
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.quantity}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(product.quantity, product.minStockLevel)}`}>
                      {getStatusText(product.quantity, product.minStockLevel)}
                    </span>
                    {product.quantity <= product.minStockLevel && product.quantity > 0 && (
                      <div className="flex items-center mt-1 text-xs text-yellow-600">
                        <FaExclamationTriangle className="mr-1" /> 
                        Below minimum ({product.minStockLevel})
                      </div>
                    )}
                  </td>
                  {!isSmallScreen && (
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(product.createdAt).toLocaleString()}
                    </td>
                  )}
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-right">
                    <div className="flex justify-end space-x-1">
                      <button 
                        onClick={() => onView(product)} 
                        className="text-blue-600 hover:text-blue-900"
                        title="View details"
                      >
                        <FaEye size={16} />
                      </button>
                      <button 
                        onClick={() => onEdit(product)} 
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit product"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(product.id)} 
                        className="text-red-600 hover:text-red-900"
                        title="Delete product"
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
      )}
    </div>
  );
};

export default InventoryTable;
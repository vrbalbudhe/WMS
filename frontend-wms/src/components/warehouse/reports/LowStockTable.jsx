import React, { useState } from 'react';
import { FaShoppingCart, FaPlus } from 'react-icons/fa';
import CreateRequestModal from '../../procurement/request/CreateRequestModal';

const LowStockTable = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock departments data since it's required by CreateRequestModal
  const departments = ['IT', 'Finance', 'HR', 'Operations', 'Marketing', 'Sales'];
  
  // Function to get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate percentage of stock remaining for progress bar
  const calculatePercentage = (current, min) => {
    if (min === 0) return 100; // Avoid division by zero
    const percentage = (current / min) * 100;
    return percentage > 100 ? 100 : percentage;
  };

  // Get color for progress bar based on stock level
  const getStockLevelColor = (current, min) => {
    const percentage = (current / min) * 100;
    if (percentage <= 25) return 'bg-red-500';
    if (percentage <= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Open modal handler
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal handler
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Handle save from modal
  const handleSaveRequest = (requestData) => {
    // Implement save logic here
    console.log('Request saved:', requestData);
    closeModal();
  };
  
  // Handle request creation for a specific item
  const handleCreateItemRequest = (item) => {
    // You can pre-populate the modal with this item if desired
    // For now, we'll just open the modal
    openModal();
  };

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Low Stock Inventory</h2>
        <button 
          onClick={openModal}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaPlus className="mr-2" size={14} /> Create Request
        </button>
      </div>
    
      <div className="shadow overflow-x-auto border-b border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Name
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Stock
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Min Required
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Level
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.name}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.minRequired}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className={`h-2.5 rounded-full ${getStockLevelColor(item.quantity, item.minRequired)}`}
                        style={{ width: `${calculatePercentage(item.quantity, item.minRequired)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {Math.round(calculatePercentage(item.quantity, item.minRequired))}%
                    </span>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleCreateItemRequest(item)}
                  >
                    <FaShoppingCart size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* No items message */}
      {items.length === 0 && (
        <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
          <p className="text-gray-500">No low stock items found</p>
        </div>
      )}
      
      {/* Create Request Modal */}
      {isModalOpen && (
        <CreateRequestModal
          departments={departments}
          onSave={handleSaveRequest}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default LowStockTable;
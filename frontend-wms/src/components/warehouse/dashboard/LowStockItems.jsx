import React, { useState } from 'react';
import { FaExclamationTriangle, FaChevronRight, FaShoppingCart, FaPlus } from 'react-icons/fa';
import CreateRequestModal from '../../procurement/request/CreateRequestModal';

const LowStockItems = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock departments data since it's required by CreateRequestModal
  const departments = ['IT', 'Finance', 'HR', 'Operations', 'Marketing', 'Sales'];
  
  // Calculate percentage of stock remaining for progress bar
  const calculatePercentage = (current, min) => {
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

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <FaExclamationTriangle className="text-yellow-500 mr-2" size={18} />
          <h2 className="text-lg font-semibold text-gray-700">Low Stock Items</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={openModal}
            className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md text-sm flex items-center"
          >
            <FaPlus className="mr-1" size={12} /> Create Request
          </button>
          <button className="text-purple-600 flex items-center text-sm hover:underline">
            View All <FaChevronRight className="ml-1" size={12} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border-b border-gray-100 pb-3 last:border-b-0">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <div className="flex text-xs text-gray-500 space-x-4">
                    <span>ID: {item.id}</span>
                    <span>Category: {item.category}</span>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-800">
                  <FaShoppingCart size={16} />
                </button>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-gray-500">Current Stock: <span className="font-semibold">{item.currentStock}</span></span>
                  <span className="text-gray-500">Min Required: <span className="font-semibold">{item.minRequired}</span></span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getStockLevelColor(item.currentStock, item.minRequired)}`}
                    style={{ width: `${calculatePercentage(item.currentStock, item.minRequired)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No low stock items found
          </div>
        )}
      </div>
      
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

export default LowStockItems;
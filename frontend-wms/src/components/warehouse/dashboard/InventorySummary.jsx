import React from 'react';
import { 
  FaBoxOpen, 
  FaExclamationTriangle, 
  FaClock, 
  FaBox 
} from 'react-icons/fa';

const InventorySummary = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-4 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center mb-2">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <FaBox className="text-purple-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Inventory</h2>
            <p className="text-3xl font-bold text-purple-700">{data.totalItems}</p>
            <p className="text-sm text-gray-500">items in stock</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center mb-2">
          <div className="bg-yellow-100 p-3 rounded-full mr-4">
            <FaExclamationTriangle className="text-yellow-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Low Stock</h2>
            <p className="text-3xl font-bold text-yellow-600">{data.lowStock}</p>
            <p className="text-sm text-gray-500">items below threshold</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center mb-2">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <FaExclamationTriangle className="text-red-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Out of Stock</h2>
            <p className="text-3xl font-bold text-red-600">{data.outOfStock}</p>
            <p className="text-sm text-gray-500">items not available</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center mb-2">
          <div className="bg-indigo-100 p-3 rounded-full mr-4">
            <FaClock className="text-indigo-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Pending Receipts</h2>
            <p className="text-3xl font-bold text-indigo-600">{data.pendingReceipts}</p>
            <p className="text-sm text-gray-500">items to be received</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;
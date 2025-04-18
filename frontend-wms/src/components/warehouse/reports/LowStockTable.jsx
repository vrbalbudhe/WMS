import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const LowStockTable = ({ items }) => {
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

  return (
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
              <button className="text-purple-600 hover:text-purple-900">
                <FaShoppingCart size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LowStockTable;
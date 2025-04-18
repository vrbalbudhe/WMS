import React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const InventoryTable = ({ 
  items, 
  sortField, 
  sortDirection, 
  onSort, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  // Function to show the appropriate sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className="text-gray-400" />;
    }
    return sortDirection === 'asc' ? <FaSortUp className="text-purple-600" /> : <FaSortDown className="text-purple-600" />;
  };
  
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

  // Display fewer columns on small screens
  const isSmallScreen = window.innerWidth < 768;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {items.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No items found. Try adjusting your search or filters.
        </div>
      ) : (
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: '80px' }}
                onClick={() => onSort('id')}
              >
                <div className="flex items-center">
                  ID {getSortIcon('id')}
                </div>
              </th>
              <th 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: '25%' }}
                onClick={() => onSort('name')}
              >
                <div className="flex items-center">
                  Name {getSortIcon('name')}
                </div>
              </th>
              {!isSmallScreen && (
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  style={{ width: '100px' }}
                  onClick={() => onSort('category')}
                >
                  <div className="flex items-center">
                    Cat. {getSortIcon('category')}
                  </div>
                </th>
              )}
              <th 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: '60px' }}
                onClick={() => onSort('quantity')}
              >
                <div className="flex items-center">
                  Qty {getSortIcon('quantity')}
                </div>
              </th>
              <th 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: '90px' }}
                onClick={() => onSort('status')}
              >
                <div className="flex items-center">
                  Status {getSortIcon('status')}
                </div>
              </th>
              {!isSmallScreen && (
                <th 
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  style={{ width: '130px' }}
                  onClick={() => onSort('location')}
                >
                  <div className="flex items-center">
                    Location {getSortIcon('location')}
                  </div>
                </th>
              )}
              <th 
                className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: '90px' }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate">
                  {item.id}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 truncate">
                  {item.name}
                </td>
                {!isSmallScreen && (
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 truncate">
                    {item.category}
                  </td>
                )}
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                {!isSmallScreen && (
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 truncate">
                    {item.location}
                  </td>
                )}
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-right">
                  <div className="flex justify-end space-x-1">
                    <button 
                      onClick={() => onView(item)} 
                      className="text-purple-600 hover:text-purple-900"
                      title="View details"
                    >
                      <FaEye size={16} />
                    </button>
                    <button 
                      onClick={() => onEdit(item)} 
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit item"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)} 
                      className="text-red-600 hover:text-red-900"
                      title="Delete item"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryTable;
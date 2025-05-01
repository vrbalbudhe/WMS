// Path: frontend-wms/src/components/warehouse/categories/CategoryTable.jsx
import React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const CategoryTable = ({ 
  categories, 
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
    return sortDirection === 'asc' ? <FaSortUp className="text-blue-600" /> : <FaSortDown className="text-blue-600" />;
  };

  // Helper function to count fields
  const countFields = (fields) => {
    if (!fields) return 0;
    return Object.keys(fields).length;
  };

  // Format date in a readable way
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {categories.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No categories found. Create your first category to get started.
        </div>
      ) : (
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: '30%' }}
                onClick={() => onSort('name')}
              >
                <div className="flex items-center">
                  Category Name {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: '30%' }}
                onClick={() => onSort('description')}
              >
                <div className="flex items-center">
                  Description {getSortIcon('description')}
                </div>
              </th>
              <th 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: '8%' }}
                onClick={() => onSort('fields')}
              >
                <div className="flex items-center">
                  Fields {getSortIcon('fields')}
                </div>
              </th>
              <th 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                style={{ width: '22%' }}
                onClick={() => onSort('createdAt')}
              >
                <div className="flex items-center">
                  Created/Updated {getSortIcon('createdAt')}
                </div>
              </th>
              <th 
                className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: '10%' }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-3 py-4 text-sm text-gray-900 truncate">
                  {category.name}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 truncate">
                  {category.description || "—"}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    countFields(category.fields) > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {countFields(category.fields)}
                  </span>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  <div className="text-xs">
                    <div>Created: {formatDate(category.createdAt)}</div>
                    {category.updatedAt !== category.createdAt && (
                      <div className="mt-1">Updated: {formatDate(category.updatedAt)}</div>
                    )}
                    {category.createdByUserId && (
                      <div className="mt-1 text-blue-600">ID: {category.createdByUserId.substring(0, 8)}...</div>
                    )}
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-right">
                  <div className="flex justify-end space-x-1">
                    <button 
                      onClick={() => onView(category)} 
                      className="text-blue-600 hover:text-blue-900"
                      title="View details"
                    >
                      <FaEye size={16} />
                    </button>
                    <button 
                      onClick={() => onEdit(category)} 
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit category"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(category.id)} 
                      className="text-red-600 hover:text-red-900"
                      title="Delete category"
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

export default CategoryTable;
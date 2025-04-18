import React from 'react';
import { FaTimes } from 'react-icons/fa';

const InventoryFilters = ({ filters, setFilters, categories, statuses, suppliers, onClose }) => {
  // Toggle a filter value (add/remove)
  const toggleFilter = (type, value) => {
    if (filters[type].includes(value)) {
      setFilters({
        ...filters,
        [type]: filters[type].filter(item => item !== value)
      });
    } else {
      setFilters({
        ...filters,
        [type]: [...filters[type], value]
      });
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: [],
      status: [],
      supplier: []
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes />
          </button>
        )}
      </div>
      
      {/* Categories */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={filters.category.includes(category)}
                onChange={() => toggleFilter('category', category)}
                className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Status */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Status</h3>
        <div className="space-y-2">
          {statuses.map(status => (
            <div key={status} className="flex items-center">
              <input
                type="checkbox"
                id={`status-${status}`}
                checked={filters.status.includes(status)}
                onChange={() => toggleFilter('status', status)}
                className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700">
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Suppliers */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Suppliers</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {suppliers.map(supplier => (
            <div key={supplier} className="flex items-center">
              <input
                type="checkbox"
                id={`supplier-${supplier}`}
                checked={filters.supplier.includes(supplier)}
                onChange={() => toggleFilter('supplier', supplier)}
                className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <label htmlFor={`supplier-${supplier}`} className="ml-2 text-sm text-gray-700">
                {supplier}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reset button */}
      <button
        onClick={resetFilters}
        className="w-full mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default InventoryFilters;
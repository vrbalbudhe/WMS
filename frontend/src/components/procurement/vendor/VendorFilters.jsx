import React from 'react';
import { FaStar } from 'react-icons/fa';

const VendorFilters = ({ filters, setFilters, categories, statuses, onClose }) => {
  const handleCategoryChange = (category) => {
    if (filters.categories.includes(category)) {
      setFilters({
        ...filters,
        categories: filters.categories.filter(c => c !== category)
      });
    } else {
      setFilters({
        ...filters,
        categories: [...filters.categories, category]
      });
    }
  };
  
  const handleStatusChange = (status) => {
    if (filters.statuses.includes(status)) {
      setFilters({
        ...filters,
        statuses: filters.statuses.filter(s => s !== status)
      });
    } else {
      setFilters({
        ...filters,
        statuses: [...filters.statuses, status]
      });
    }
  };
  
  const handleRatingChange = (event) => {
    setFilters({
      ...filters,
      minRating: parseInt(event.target.value)
    });
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            &times;
          </button>
        )}
      </div>
      
      <div className="space-y-5">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Vendor Category</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <input
                  id={`category-${category}`}
                  name={`category-${category}`}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Vendor Status</h4>
          <div className="space-y-2">
            {statuses.map(status => (
              <div key={status} className="flex items-center">
                <input
                  id={`status-${status}`}
                  name={`status-${status}`}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={filters.statuses.includes(status)}
                  onChange={() => handleStatusChange(status)}
                />
                <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700">
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Minimum Rating</h4>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={filters.minRating}
              onChange={handleRatingChange}
              className="w-full"
            />
            <span className="text-sm text-gray-700 flex items-center">
              {filters.minRating} <FaStar className="text-yellow-400 ml-1" size={12} />
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Only Show Favorites</h4>
          <div className="flex items-center">
            <input
              id="favorites"
              name="favorites"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={filters.onlyFavorites}
              onChange={() => setFilters({
                ...filters,
                onlyFavorites: !filters.onlyFavorites
              })}
            />
            <label htmlFor="favorites" className="ml-2 text-sm text-gray-700">
              Show only favorite vendors
            </label>
          </div>
        </div>
        
        <button
          onClick={() => setFilters({
            categories: [],
            statuses: [],
            minRating: 1,
            onlyFavorites: false
          })}
          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default VendorFilters;
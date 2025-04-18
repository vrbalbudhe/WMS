import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ShipmentFilters = ({ filters, setFilters, statuses, types, carriers, onClose }) => {
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
      status: [],
      type: [],
      carrier: []
    });
  };
  
  // Get the color class for status badges
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
      case 'Received':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      
      {/* Status Filters */}
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
              <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700 flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(status)}`}></span>
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Type Filters */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Type</h3>
        <div className="space-y-2">
          {types.map(type => (
            <div key={type} className="flex items-center">
              <input
                type="checkbox"
                id={`type-${type}`}
                checked={filters.type.includes(type)}
                onChange={() => toggleFilter('type', type)}
                className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Carrier Filters */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Carrier</h3>
        <div className="space-y-2">
          {carriers.map(carrier => (
            <div key={carrier} className="flex items-center">
              <input
                type="checkbox"
                id={`carrier-${carrier}`}
                checked={filters.carrier.includes(carrier)}
                onChange={() => toggleFilter('carrier', carrier)}
                className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <label htmlFor={`carrier-${carrier}`} className="ml-2 text-sm text-gray-700">
                {carrier}
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

export default ShipmentFilters;
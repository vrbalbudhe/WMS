import React from 'react';
import { FaDollarSign, FaCalendarAlt } from 'react-icons/fa';

const PurchaseOrderFilters = ({ filters, setFilters, statuses, onClose }) => {
  const handleStatusChange = (status) => {
    if (filters.status.includes(status)) {
      setFilters({
        ...filters,
        status: filters.status.filter(s => s !== status)
      });
    } else {
      setFilters({
        ...filters,
        status: [...filters.status, status]
      });
    }
  };
  
  const handleDateChange = (field, value) => {
    setFilters({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };
  
  const handleAmountChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
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
          <h4 className="text-sm font-medium text-gray-900 mb-2">Order Status</h4>
          <div className="space-y-2">
            {statuses.map(status => (
              <div key={status} className="flex items-center">
                <input
                  id={`status-${status}`}
                  name={`status-${status}`}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={filters.status.includes(status)}
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
          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
            <FaCalendarAlt className="mr-1 text-gray-500" size={14} />
            Date Range
          </h4>
          <div className="space-y-2">
            <div>
              <label htmlFor="date-start" className="block text-xs text-gray-500 mb-1">
                From
              </label>
              <input
                id="date-start"
                type="date"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm"
                value={filters.dateRange.start}
                onChange={(e) => handleDateChange('start', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="date-end" className="block text-xs text-gray-500 mb-1">
                To
              </label>
              <input
                id="date-end"
                type="date"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm"
                value={filters.dateRange.end}
                onChange={(e) => handleDateChange('end', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
            <FaDollarSign className="mr-1 text-gray-500" size={14} />
            Order Amount
          </h4>
          <div className="space-y-2">
            <div>
              <label htmlFor="min-amount" className="block text-xs text-gray-500 mb-1">
                Minimum ($)
              </label>
              <input
                id="min-amount"
                type="number"
                min="0"
                step="100"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm"
                value={filters.minAmount}
                onChange={(e) => handleAmountChange('minAmount', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="max-amount" className="block text-xs text-gray-500 mb-1">
                Maximum ($)
              </label>
              <input
                id="max-amount"
                type="number"
                min="0"
                step="100"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 text-sm"
                value={filters.maxAmount}
                onChange={(e) => handleAmountChange('maxAmount', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setFilters({
            status: [],
            dateRange: { start: '', end: '' },
            minAmount: '',
            maxAmount: ''
          })}
          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default PurchaseOrderFilters;
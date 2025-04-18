import React from 'react';
import { FaTimes, FaCalendarAlt, FaChartPie } from 'react-icons/fa';

const StockReportFilters = ({
  dateRange,
  onDateRangeChange,
  categoryFilter,
  categories,
  onCategoryChange,
  onClose
}) => {
  // Handle date range input changes
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    onDateRangeChange({
      ...dateRange,
      [name]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Report Filters</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FaTimes />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date Range Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FaCalendarAlt className="mr-2 text-purple-600" />
            Date Range
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-xs text-gray-500 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={dateRange.startDate}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-xs text-gray-500 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={dateRange.endDate}
                onChange={handleDateChange}
                min={dateRange.startDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          
          {/* Preset Date Ranges */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
              onClick={() => {
                const date = new Date();
                const today = date.toISOString().split('T')[0];
                date.setDate(date.getDate() - 7);
                const lastWeek = date.toISOString().split('T')[0];
                onDateRangeChange({ startDate: lastWeek, endDate: today });
              }}
            >
              Last 7 Days
            </button>
            <button 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
              onClick={() => {
                const date = new Date();
                const today = date.toISOString().split('T')[0];
                date.setDate(date.getDate() - 30);
                const lastMonth = date.toISOString().split('T')[0];
                onDateRangeChange({ startDate: lastMonth, endDate: today });
              }}
            >
              Last 30 Days
            </button>
            <button 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
              onClick={() => {
                const date = new Date();
                const today = date.toISOString().split('T')[0];
                date.setDate(date.getDate() - 90);
                const lastQuarter = date.toISOString().split('T')[0];
                onDateRangeChange({ startDate: lastQuarter, endDate: today });
              }}
            >
              Last Quarter
            </button>
            <button 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
              onClick={() => {
                const date = new Date();
                const today = date.toISOString().split('T')[0];
                date.setFullYear(date.getFullYear() - 1);
                const lastYear = date.toISOString().split('T')[0];
                onDateRangeChange({ startDate: lastYear, endDate: today });
              }}
            >
              Last Year
            </button>
          </div>
        </div>
        
        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FaChartPie className="mr-2 text-purple-600" />
            Category Filter
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Quick Category Selections */}
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.slice(0, 4).map(category => (
              <button 
                key={category}
                className={`text-xs ${
                  categoryFilter === category 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } px-2 py-1 rounded`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Apply Button */}
      <div className="mt-6 flex justify-end">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          onClick={onClose}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default StockReportFilters;
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const RequestFilters = ({ 
  filters, 
  setFilters, 
  statuses, 
  departments, 
  priorities, 
  onClose 
}) => {
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
      department: [],
      priority: []
    });
  };

  // Function to get status badge style
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending Approval':
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get priority badge style
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
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
                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700 flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(status)}`}></span>
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Department Filters */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Department</h3>
        <div className="space-y-2">
          {departments.map(department => (
            <div key={department} className="flex items-center">
              <input
                type="checkbox"
                id={`dept-${department}`}
                checked={filters.department.includes(department)}
                onChange={() => toggleFilter('department', department)}
                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <label htmlFor={`dept-${department}`} className="ml-2 text-sm text-gray-700">
                {department}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Priority Filters */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Priority</h3>
        <div className="space-y-2">
          {priorities.map(priority => (
            <div key={priority} className="flex items-center">
              <input
                type="checkbox"
                id={`priority-${priority}`}
                checked={filters.priority.includes(priority)}
                onChange={() => toggleFilter('priority', priority)}
                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <label htmlFor={`priority-${priority}`} className="ml-2 text-sm text-gray-700 flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getPriorityColor(priority)}`}></span>
                {priority}
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

export default RequestFilters;
import React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEye, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const RequestsTable = ({ 
  requests, 
  sortField, 
  sortDirection, 
  onSort, 
  onView, 
  onApprove, 
  onReject, 
  onDelete 
}) => {
  // Function to show the appropriate sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className="text-gray-400" />;
    }
    return sortDirection === 'asc' ? <FaSortUp className="text-green-600" /> : <FaSortDown className="text-green-600" />;
  };
  
  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  // Function to get status badge style
  const getStatusBadge = (status) => {
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
  const getPriorityBadge = (priority) => {
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
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {requests.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No purchase requests found. Try adjusting your search or filters.
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('id')}
              >
                <div className="flex items-center">
                  ID {getSortIcon('id')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('date')}
              >
                <div className="flex items-center">
                  Date {getSortIcon('date')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('requestedBy')}
              >
                <div className="flex items-center">
                  Requester {getSortIcon('requestedBy')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('department')}
              >
                <div className="flex items-center">
                  Dept {getSortIcon('department')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('totalAmount')}
              >
                <div className="flex items-center">
                  Amount {getSortIcon('totalAmount')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center">
                  Status {getSortIcon('status')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => onSort('priority')}
              >
                <div className="flex items-center">
                  Priority {getSortIcon('priority')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                  {request.id}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                  {request.date}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-900">
                  {request.requestedBy}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                  {request.department}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(request.totalAmount)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadge(request.priority)}`}>
                    {request.priority}
                  </span>
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      onClick={() => onView(request)} 
                      className="text-blue-600 hover:text-blue-900"
                      title="View details"
                    >
                      <FaEye size={16} />
                    </button>
                    
                    {request.status === 'Pending Approval' && (
                      <>
                        <button 
                          onClick={() => onApprove(request.id)} 
                          className="text-green-600 hover:text-green-900"
                          title="Approve request"
                        >
                          <FaCheck size={16} />
                        </button>
                        <button 
                          onClick={() => onReject(request.id)} 
                          className="text-red-600 hover:text-red-900"
                          title="Reject request"
                        >
                          <FaTimes size={16} />
                        </button>
                      </>
                    )}
                    
                    <button 
                      onClick={() => onDelete(request.id)} 
                      className="text-red-600 hover:text-red-900"
                      title="Delete request"
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

export default RequestsTable;
import React from 'react';
import { 
  FaTimes, 
  FaCheck, 
  FaFileAlt, 
  FaUser, 
  FaBuilding, 
  FaCalendarAlt, 
  FaTag, 
  FaClipboardList,
  FaDollarSign,
  FaStickyNote
} from 'react-icons/fa';

const RequestDetailsModal = ({ request, onClose, onApprove, onReject }) => {
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
        return 'bg-blue-100 text-blue-800';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FaFileAlt className="mr-2" size={20} />
            <h2 className="text-xl font-semibold">
              Purchase Request {request.id}
            </h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Status Bar */}
        <div className="bg-gray-100 px-6 py-3 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Status:</span>
            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(request.status)}`}>
              {request.status}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Priority:</span>
            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadge(request.priority)}`}>
              {request.priority}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Request Info */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <FaClipboardList className="mr-2 text-blue-600" />
                Request Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-start">
                  <FaUser className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Requested By</p>
                    <p className="font-medium">{request.requestedBy}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaBuilding className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{request.department}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaCalendarAlt className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Date Requested</p>
                    <p className="font-medium">{request.date}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaDollarSign className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">{formatCurrency(request.totalAmount)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notes */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <FaStickyNote className="mr-2 text-blue-600" />
                Request Notes
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 h-40 overflow-y-auto">
                <p className="text-gray-700">
                  {request.notes || 'No notes provided for this request.'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Items Table */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <FaTag className="mr-2 text-blue-600" />
              Requested Items
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estimated Cost
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {request.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(item.estimatedCost / item.quantity)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(item.estimatedCost)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      Total:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(request.totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          {request.status === 'Pending Approval' && (
            <>
              <button
                onClick={() => {
                  onReject(request.id);
                  onClose();
                }}
                className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FaTimes className="mr-2" /> Reject
              </button>
              <button
                onClick={() => {
                  onApprove(request.id);
                  onClose();
                }}
                className="mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaCheck className="mr-2" /> Approve
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
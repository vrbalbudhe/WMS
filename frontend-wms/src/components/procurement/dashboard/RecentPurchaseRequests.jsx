import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const RecentPurchaseRequests = ({ requests }) => {
  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Function to get status badge color
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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-700">Recent Purchase Requests</h2>
        <a href="#" className="text-sm text-green-600 flex items-center hover:underline">
          View All <FaChevronRight className="ml-1" size={12} />
        </a>
      </div>
      
      <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">{request.id}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{request.date}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{request.requestedBy}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatCurrency(request.amount)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                    {request.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPurchaseRequests;
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const TopVendors = ({ vendors }) => {
  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-700">Top Vendors</h2>
        <a href="#" className="text-sm text-green-600 flex items-center hover:underline">
          View All <FaChevronRight className="ml-1" size={12} />
        </a>
      </div>
      
      <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spending</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reliability</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On-Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.map((vendor) => (
              <tr key={vendor.name} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatCurrency(vendor.spending)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 w-24">
                      <div 
                        className={`h-2.5 rounded-full ${vendor.reliability >= 95 ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${vendor.reliability}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{vendor.reliability}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 w-24">
                      <div 
                        className={`h-2.5 rounded-full ${vendor.onTimeDelivery >= 95 ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${vendor.onTimeDelivery}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{vendor.onTimeDelivery}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopVendors;
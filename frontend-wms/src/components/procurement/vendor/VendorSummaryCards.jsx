import React from 'react';
import { 
  FaBuilding, 
  FaStar, 
  FaDollarSign, 
  FaChartLine
} from 'react-icons/fa';

const VendorSummaryCards = ({ activeVendors, favoriteVendors, totalSpend, averageRating }) => {
  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <FaBuilding className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Active Vendors
                </dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">
                    {activeVendors}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
              <FaStar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Favorite Vendors
                </dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">
                    {favoriteVendors}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <FaDollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Spend
                </dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">
                    {formatCurrency(totalSpend)}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <FaChartLine className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Average Rating
                </dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 flex items-center">
                    {averageRating}
                    <span className="text-yellow-400 ml-1">
                      <FaStar size={16} />
                    </span>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSummaryCards;
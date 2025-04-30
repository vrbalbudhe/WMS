import React from 'react';
import { FaChartBar } from 'react-icons/fa';

const SpendingByCategory = ({ categories, totalSpend, timePeriod }) => {
  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Time period text mapping
  const timePeriodText = {
    'week': 'This Week',
    'month': 'This Month',
    'year': 'Year to Date'
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-700">Spending by Category</h2>
        <div className="text-sm text-gray-500">{timePeriodText[timePeriod]}</div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart Placeholder - In a real app, this would be a chart component */}
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <FaChartBar className="text-green-500 mr-2" size={24} />
            <span className="text-gray-500">Category Spending Chart</span>
          </div>
          
          {/* Category Table */}
          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.name} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatCurrency(category.amount)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{category.percentage}%</td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(totalSpend)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingByCategory;
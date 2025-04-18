import React from 'react';

const SummaryCard = ({ title, value, icon, bgColor, textColor, trend, isCurrency }) => {
  // Format currency if needed
  const formattedValue = isCurrency 
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(value)
    : value;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${bgColor} ${textColor} mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">{formattedValue}</p>
            {trend && <p className="ml-2 text-sm text-green-600">{trend}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
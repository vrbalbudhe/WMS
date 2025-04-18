import React from 'react';

const ShipmentStatusCard = ({ status, count, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center">
        <div className={`p-3 rounded-full mr-3 ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{status}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentStatusCard;
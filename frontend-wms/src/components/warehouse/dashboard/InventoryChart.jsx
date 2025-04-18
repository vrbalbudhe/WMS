import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InventoryChart = ({ data }) => {
  // Convert data to the format expected by Recharts
  const chartData = data.labels.map((label, index) => {
    const dataPoint = { name: label };
    
    data.datasets.forEach(dataset => {
      dataPoint[dataset.name] = dataset.data[index];
    });
    
    return dataPoint;
  });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <FaChartLine className="text-purple-600 mr-2" size={18} />
        <h2 className="text-lg font-semibold text-gray-700">Inventory Trends</h2>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Inventory Level" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              activeDot={{ r: 8 }} 
            />
            <Line 
              type="monotone" 
              dataKey="Shipments" 
              stroke="#60a5fa" 
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryChart;
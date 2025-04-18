import React from 'react';

const QuickActionButton = ({ icon, label, bgColor, textColor, onClick }) => {
  return (
    <button 
      className="bg-white shadow rounded-lg p-4 flex items-center justify-center flex-col hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <div className={`${bgColor} ${textColor} rounded-full p-3 mb-2`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
};

export default QuickActionButton;
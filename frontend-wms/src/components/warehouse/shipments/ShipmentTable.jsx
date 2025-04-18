import React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEye, FaTruck, FaBoxOpen, FaChevronDown } from 'react-icons/fa';

const ShipmentTable = ({ 
  shipments, 
  sortField, 
  sortDirection, 
  onSort, 
  onView, 
  onUpdateStatus 
}) => {
  // Function to show the appropriate sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className="text-gray-400" />;
    }
    return sortDirection === 'asc' ? <FaSortUp className="text-purple-600" /> : <FaSortDown className="text-purple-600" />;
  };
  
  // Function to get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
      case 'Received':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get next statuses available for the current status
  const getNextStatuses = (currentStatus) => {
    switch (currentStatus) {
      case 'Processing':
        return ['In Transit'];
      case 'In Transit':
        return ['Delivered', 'Delayed'];
      case 'Delayed':
        return ['In Transit', 'Delivered'];
      case 'Delivered':
      case 'Received':
        return [];
      default:
        return [];
    }
  };

  // Status dropdown menu
  const StatusDropdown = ({ shipment }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const nextStatuses = getNextStatuses(shipment.status);
    
    if (nextStatuses.length === 0) {
      return (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(shipment.status)}`}>
          {shipment.status}
        </span>
      );
    }
    
    return (
      <div className="relative">
        <button 
          className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusBadge(shipment.status)}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {shipment.status}
          <FaChevronDown className="ml-1" size={10} />
        </button>
        
        {isOpen && (
          <div className="absolute mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
            {nextStatuses.map(status => (
              <button
                key={status}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onUpdateStatus(shipment.id, status);
                  setIsOpen(false);
                }}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {shipments.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No shipments found. Try adjusting your search or filters.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-20"
                  onClick={() => onSort('id')}
                >
                  <div className="flex items-center">
                    ID {getSortIcon('id')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-24"
                  onClick={() => onSort('date')}
                >
                  <div className="flex items-center">
                    Date {getSortIcon('date')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-24"
                  onClick={() => onSort('type')}
                >
                  <div className="flex items-center">
                    Type {getSortIcon('type')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => onSort('destination')}
                >
                  <div className="flex items-center">
                    Destination {getSortIcon('destination')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-16"
                  onClick={() => onSort('items')}
                >
                  <div className="flex items-center">
                    Items {getSortIcon('items')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-28"
                  onClick={() => onSort('status')}
                >
                  <div className="flex items-center">
                    Status {getSortIcon('status')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-16"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {shipment.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shipment.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shipment.type === 'Inbound' ? (
                      <span className="flex items-center">
                        <FaBoxOpen className="text-purple-600 mr-1" size={14} />
                        {shipment.type}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FaTruck className="text-blue-600 mr-1" size={14} />
                        {shipment.type}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shipment.destination}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shipment.items}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusDropdown shipment={shipment} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => onView(shipment)} 
                      className="text-purple-600 hover:text-purple-900"
                      title="View details"
                    >
                      <FaEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShipmentTable;
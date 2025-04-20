import React from 'react';
import { FaTimes, FaEdit, FaHistory, FaBoxOpen, FaClipboardCheck } from 'react-icons/fa';

const ItemDetailsModal = ({ item, onClose, onEdit }) => {
  // Mock inventory history data
  const inventoryHistory = [
    { date: '2025-04-15', action: 'Received', quantity: 5, user: 'John Doe' },
    { date: '2025-04-10', action: 'Shipped', quantity: -2, user: 'Jane Smith' },
    { date: '2025-04-05', action: 'Stock Count', quantity: 12, user: 'John Doe' },
    { date: '2025-03-28', action: 'Received', quantity: 10, user: 'John Doe' }
  ];

  // Helper function to determine badge color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Item Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Basic details */}
            <div>
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Item ID</div>
                <div className="text-lg font-medium">{item.id}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Name</div>
                <div className="text-lg font-medium">{item.name}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Category</div>
                <div>{item.category}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Supplier</div>
                <div>{item.supplier}</div>
              </div>
            </div>
            
            {/* Right column - Inventory details */}
            <div>
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Current Quantity</div>
                <div className="text-2xl font-bold text-blue-600">{item.quantity}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Minimum Stock Level</div>
                <div>{item.minStock}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Location</div>
                <div>{item.location}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Last Updated</div>
                <div>{item.lastUpdated}</div>
              </div>
            </div>
          </div>
          
          {/* Inventory History */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FaHistory className="mr-2 text-blue-600" />
              Inventory History
            </h3>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventoryHistory.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.action}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className={record.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                          {record.quantity > 0 ? `+${record.quantity}` : record.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.user}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
              <FaEdit className="mr-2" />
              Update Quantity
            </button>
            <button className="flex items-center justify-center p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
              <FaBoxOpen className="mr-2" />
              Create Shipment
            </button>
            <button className="flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
              <FaClipboardCheck className="mr-2" />
              Count Inventory
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onEdit}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaEdit className="mr-2" /> Edit Item
          </button>
          <button
            onClick={onClose}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
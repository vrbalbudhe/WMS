import React, { useState } from 'react';
import { 
  FaTimes, 
  FaTruck, 
  FaBoxOpen, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUser,
  FaBarcode,
  FaNotesMedical,
  FaHistory,
  FaPrint,
  FaDownload,
  FaPencilAlt,
  FaCheck
} from 'react-icons/fa';

const ShipmentDetailsModal = ({ shipment, onClose, onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  
  // Mock shipment history data
  const shipmentHistory = [
    { date: '2025-04-15 14:35', action: 'Delivered', user: 'Jane Smith' },
    { date: '2025-04-15 09:22', action: 'Out for Delivery', user: 'John Doe' },
    { date: '2025-04-14 16:40', action: 'In Transit', user: 'System' },
    { date: '2025-04-13 11:05', action: 'Processing', user: 'Jane Smith' },
    { date: '2025-04-13 10:15', action: 'Order Created', user: 'Jane Smith' }
  ];
  
  // Mock items data
  const shipmentItems = [
    { id: 'ITM-2057', name: 'Office Chair - Ergonomic', quantity: 5, sku: 'SKU-12345' },
    { id: 'ITM-1867', name: 'Printer Toner - Black', quantity: 3, sku: 'SKU-67890' },
    { id: 'ITM-1942', name: 'Desktop Computer - Model X', quantity: 2, sku: 'SKU-45678' },
    { id: 'ITM-2103', name: 'First Aid Kit', quantity: 5, sku: 'SKU-98765' }
  ];
  
  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
      case 'Received':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
      case 'Out for Delivery':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
      case 'Order Created':
        return 'bg-blue-100 text-blue-800';
      case 'Delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get next possible statuses
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
  
  const nextStatuses = getNextStatuses(shipment.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {shipment.type === 'Inbound' ? (
              <FaBoxOpen className="mr-2" size={20} />
            ) : (
              <FaTruck className="mr-2" size={20} />
            )}
            <h2 className="text-xl font-semibold">
              Shipment {shipment.id} - {shipment.type}
            </h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Status Bar */}
        <div className="bg-gray-100 px-6 py-3 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Status:</span>
            <div className="relative">
              <button
                className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusBadge(shipment.status)}`}
                onClick={() => nextStatuses.length > 0 && setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                disabled={nextStatuses.length === 0}
              >
                {shipment.status}
                {nextStatuses.length > 0 && (
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              
              {isStatusDropdownOpen && (
                <div className="absolute mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                  {nextStatuses.map(status => (
                    <button
                      key={status}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        onUpdateStatus(shipment.id, status);
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Last Updated: {shipment.lastUpdated}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Shipment Details
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'items'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('items')}
            >
              Items
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </nav>
        </div>
        
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="text-purple-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Shipment Information</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <div className="text-sm text-gray-500">Shipment ID</div>
                        <div className="font-medium">{shipment.id}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Type</div>
                        <div className="font-medium">{shipment.type}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Origin</div>
                        <div className="font-medium">{shipment.origin}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Destination</div>
                        <div className="font-medium">{shipment.destination}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Items</div>
                        <div className="font-medium">{shipment.items}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <FaTruck className="text-purple-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Carrier Information</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <div className="text-sm text-gray-500">Carrier</div>
                        <div className="font-medium">{shipment.carrier}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Tracking Number</div>
                        <div className="font-medium flex items-center">
                          {shipment.trackingNumber}
                          <FaBarcode className="ml-2 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="text-purple-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Dates</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <div className="text-sm text-gray-500">Shipment Date</div>
                        <div className="font-medium">{shipment.date}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Expected Delivery</div>
                        <div className="font-medium">{shipment.expectedDelivery}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Actual Delivery</div>
                        <div className="font-medium">
                          {shipment.actualDelivery ? shipment.actualDelivery : 'Pending'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <FaUser className="text-purple-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <div className="text-sm text-gray-500">Customer</div>
                        <div className="font-medium">{shipment.customer}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <FaNotesMedical className="text-purple-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Notes</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{shipment.notes || 'No notes'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Items Tab */}
          {activeTab === 'items' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment Items</h3>
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SKU
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shipmentItems.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.sku}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment History</h3>
              <div className="space-y-6">
                {shipmentHistory.map((event, index) => (
                  <div 
                    key={index} 
                    className={`flex ${
                      index !== shipmentHistory.length - 1 ? 'pb-6 border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getStatusBadge(event.action)}`}>
                        <FaCheck className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">{event.action}</h4>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>{event.date}</span>
                        <span className="mx-2">&bull;</span>
                        <span>{event.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between">
          <div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-3">
              <FaPrint className="mr-2" /> Print
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <FaDownload className="mr-2" /> Export
            </button>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailsModal;
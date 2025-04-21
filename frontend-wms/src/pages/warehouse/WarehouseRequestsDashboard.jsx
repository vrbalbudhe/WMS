import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, Truck, Package, Filter, Search, RefreshCw } from 'lucide-react';

const WarehouseRequestsDashboard = () => {
  // Sample data for demonstration
  const [requests, setRequests] = useState([
    {
      id: 1,
      date: '2025-04-20',
      time: '09:30 AM',
      fromWarehouse: 'Warehouse B',
      priority: 'High',
      status: 'Pending',
      products: [
        { id: 101, name: 'Laptop Chargers', quantity: 25, unit: 'pcs' },
        { id: 102, name: 'USB Cables', quantity: 50, unit: 'pcs' }
      ]
    },
    {
      id: 2,
      date: '2025-04-21',
      time: '11:15 AM',
      fromWarehouse: 'Warehouse C',
      priority: 'Medium',
      status: 'Pending',
      products: [
        { id: 201, name: 'Desk Chairs', quantity: 10, unit: 'pcs' },
        { id: 202, name: 'Filing Cabinets', quantity: 5, unit: 'pcs' },
        { id: 203, name: 'Desk Lamps', quantity: 15, unit: 'pcs' }
      ]
    },
    {
      id: 3,
      date: '2025-04-19',
      time: '02:45 PM',
      fromWarehouse: 'Warehouse D',
      priority: 'Low',
      status: 'Completed',
      products: [
        { id: 301, name: 'Printer Paper', quantity: 100, unit: 'reams' },
        { id: 302, name: 'Ink Cartridges', quantity: 15, unit: 'pcs' }
      ]
    },
    {
      id: 4,
      date: '2025-04-22',
      time: '08:00 AM',
      fromWarehouse: 'Warehouse E',
      priority: 'Urgent',
      status: 'Processing',
      products: [
        { id: 401, name: 'Hand Sanitizer', quantity: 200, unit: 'bottles' },
        { id: 402, name: 'Face Masks', quantity: 500, unit: 'boxes' },
        { id: 403, name: 'Disinfectant Wipes', quantity: 150, unit: 'packs' }
      ]
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRequest, setExpandedRequest] = useState(null);

  // Filter requests based on status and search term
  const filteredRequests = requests.filter(request => {
    const matchesFilter = filter === 'all' || request.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      request.fromWarehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.products.some(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  // Handle request approval
  const handleApproveRequest = (id) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'Processing' } : request
    ));
  };

  // Handle request completion
  const handleCompleteRequest = (id) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'Completed' } : request
    ));
  };

  // Toggle expanded view for a request
  const toggleExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  // Get style based on priority
  const getPriorityStyle = (priority) => {
    switch(priority.toLowerCase()) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get style based on status
  const getStatusStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Warehouse Requests</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-3 py-2 bg-blue-50 rounded-md text-blue-700 hover:bg-blue-100">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-500" />
              <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters and search */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-2">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All Requests
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Pending
              </button>
              <button 
                onClick={() => setFilter('processing')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${filter === 'processing' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Processing
              </button>
              <button 
                onClick={() => setFilter('completed')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Completed
              </button>
            </div>
            
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search warehouses or products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Requests list */}
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
                No matching requests found
              </div>
            ) : (
              filteredRequests.map(request => (
                <div key={request.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Request header */}
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => toggleExpand(request.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {request.status === 'Completed' ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : request.status === 'Processing' ? (
                          <Clock className="h-6 w-6 text-purple-500" />
                        ) : (
                          <Truck className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Request from {request.fromWarehouse}</p>
                        <p className="text-sm text-gray-500">{request.date} at {request.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityStyle(request.priority)}`}>
                        {request.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  {expandedRequest === request.id && (
                    <div className="border-t border-gray-200 p-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Requested Products</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Unit
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {request.products.map(product => (
                              <tr key={product.id}>
                                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                                  {product.name}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                  {product.quantity}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                  {product.unit}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Action buttons */}
                      {request.status === 'Pending' && (
                        <div className="mt-4 flex justify-end space-x-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApproveRequest(request.id);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                          >
                            Approve Request
                          </button>
                        </div>
                      )}
                      
                      {request.status === 'Processing' && (
                        <div className="mt-4 flex justify-end space-x-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCompleteRequest(request.id);
                            }}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                          >
                            Mark as Complete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WarehouseRequestsDashboard;
import React, { useState } from 'react';
import { 
  FaFileAlt, 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaFileExport, 
  FaSort, 
  FaSortUp, 
  FaSortDown,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

// Import components
import RequestsTable from '../../components/procurement/request/RequestTable';
import RequestFilters from '../../components/procurement/request/RequestFilters';
import RequestDetailsModal from '../../components/procurement/request/RequestDetailsModal';
import CreateRequestModal from '../../components/procurement/request/CreateRequestModal';

const PurchaseRequests = () => {
  // State for purchase requests (in a real app, this would come from an API)
  const [purchaseRequests, setPurchaseRequests] = useState([
    { 
      id: 'PR-2089', 
      date: '2025-04-17', 
      requestedBy: 'John Smith', 
      department: 'IT', 
      items: [
        { name: 'Laptop - Model X', quantity: 2, estimatedCost: 2400 },
        { name: 'Monitor - 27"', quantity: 2, estimatedCost: 600 }
      ],
      totalAmount: 3000,
      status: 'Pending Approval',
      priority: 'High',
      notes: 'Required for new hires starting next month'
    },
    { 
      id: 'PR-2088', 
      date: '2025-04-16', 
      requestedBy: 'Sarah Johnson', 
      department: 'Marketing', 
      items: [
        { name: 'Marketing Software License', quantity: 1, estimatedCost: 1200 },
        { name: 'Digital Camera', quantity: 1, estimatedCost: 800 }
      ],
      totalAmount: 2000,
      status: 'Approved',
      priority: 'Medium',
      notes: 'For upcoming marketing campaign'
    },
    { 
      id: 'PR-2087', 
      date: '2025-04-15', 
      requestedBy: 'Michael Brown', 
      department: 'Operations', 
      items: [
        { name: 'Safety Goggles', quantity: 20, estimatedCost: 300 },
        { name: 'Work Gloves', quantity: 15, estimatedCost: 225 },
        { name: 'First Aid Kits', quantity: 5, estimatedCost: 125 }
      ],
      totalAmount: 650,
      status: 'Processing',
      priority: 'Low',
      notes: 'Regular replenishment of safety supplies'
    },
    { 
      id: 'PR-2086', 
      date: '2025-04-14', 
      requestedBy: 'Lisa Chen', 
      department: 'Finance', 
      items: [
        { name: 'Accounting Software Upgrade', quantity: 1, estimatedCost: 1500 },
        { name: 'Financial Reports Binders', quantity: 20, estimatedCost: 100 }
      ],
      totalAmount: 1600,
      status: 'Completed',
      priority: 'Medium',
      notes: 'Annual software upgrade'
    },
    { 
      id: 'PR-2085', 
      date: '2025-04-13', 
      requestedBy: 'David Wilson', 
      department: 'IT', 
      items: [
        { name: 'USB-C Adapters', quantity: 10, estimatedCost: 250 }
      ],
      totalAmount: 250,
      status: 'Rejected',
      priority: 'Low',
      notes: 'Rejected due to budget constraints. Will reconsider next quarter.'
    }
  ]);
  
  // State for sorting
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for filters
  const [filters, setFilters] = useState({
    status: [],
    department: [],
    priority: []
  });
  
  // State for showing filter sidebar
  const [showFilters, setShowFilters] = useState(false);
  
  // State for request detail modal
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  
  // State for create request modal
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  
  // Handle request view
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestDetails(true);
  };
  
  // Handle create request
  const handleCreateRequest = () => {
    setShowCreateRequest(true);
  };
  
  // Handle request save
  const handleSaveRequest = (request) => {
    if (request.id) {
      // Update existing request
      setPurchaseRequests(prevRequests => 
        prevRequests.map(r => r.id === request.id ? request : r)
      );
    } else {
      // Add new request with generated ID
      const newRequest = {
        ...request,
        id: `PR-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0]
      };
      setPurchaseRequests(prevRequests => [newRequest, ...prevRequests]);
    }
    setShowCreateRequest(false);
  };
  
  // Handle approve request
  const handleApproveRequest = (id) => {
    setPurchaseRequests(prevRequests => 
      prevRequests.map(request => {
        if (request.id === id && request.status === 'Pending Approval') {
          return { ...request, status: 'Approved' };
        }
        return request;
      })
    );
  };
  
  // Handle reject request
  const handleRejectRequest = (id) => {
    setPurchaseRequests(prevRequests => 
      prevRequests.map(request => {
        if (request.id === id && request.status === 'Pending Approval') {
          return { ...request, status: 'Rejected' };
        }
        return request;
      })
    );
  };
  
  // Handle request delete
  const handleDeleteRequest = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      setPurchaseRequests(prevRequests => prevRequests.filter(request => request.id !== id));
    }
  };
  
  // Get all unique departments and priorities for filters
  const departments = [...new Set(purchaseRequests.map(request => request.department))];
  const priorities = [...new Set(purchaseRequests.map(request => request.priority))];
  const statuses = [...new Set(purchaseRequests.map(request => request.status))];
  
  // Filter requests based on search term and filters
  const filteredRequests = purchaseRequests.filter(request => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = 
      filters.status.length === 0 || 
      filters.status.includes(request.status);
    
    // Filter by department
    const matchesDepartment = 
      filters.department.length === 0 || 
      filters.department.includes(request.department);
    
    // Filter by priority
    const matchesPriority = 
      filters.priority.length === 0 || 
      filters.priority.includes(request.priority);
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesPriority;
  });
  
  // Sort filtered requests
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Handle export
  const handleExport = () => {
    // This would connect to a real export function in a production app
    alert('Exporting purchase requests data...');
  };
  
  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Purchase Requests</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleCreateRequest}
              className="flex items-center text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
            >
              <FaPlus className="mr-2" />
              New Request
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center text-white bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded-lg"
            >
              <FaFileExport className="mr-2" />
              Export
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar for larger screens */}
          <div className={`hidden md:block w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'}`}>
            <RequestFilters 
              filters={filters}
              setFilters={setFilters}
              statuses={statuses}
              departments={departments}
              priorities={priorities}
            />
          </div>
          
          <div className="flex-grow">
            {/* Search and filter bar */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by ID or requester..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg leading-5 bg-white text-gray-700 hover:bg-gray-50"
                >
                  <FaFilter className="mr-2" />
                  Filters
                </button>
              </div>
              
              {/* Filter tags */}
              {(filters.status.length > 0 || filters.department.length > 0 || filters.priority.length > 0) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {filters.status.map(status => (
                    <span key={`status-${status}`} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                      {status}
                      <button 
                        className="ml-1 focus:outline-none" 
                        onClick={() => setFilters({...filters, status: filters.status.filter(s => s !== status)})}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  {filters.department.map(department => (
                    <span key={`dept-${department}`} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                      {department}
                      <button 
                        className="ml-1 focus:outline-none" 
                        onClick={() => setFilters({...filters, department: filters.department.filter(d => d !== department)})}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  {filters.priority.map(priority => (
                    <span key={`priority-${priority}`} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full flex items-center">
                      {priority}
                      <button 
                        className="ml-1 focus:outline-none" 
                        onClick={() => setFilters({...filters, priority: filters.priority.filter(p => p !== priority)})}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <button 
                    className="text-gray-500 text-xs underline"
                    onClick={() => setFilters({status: [], department: [], priority: []})}
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile filter panel */}
            {showFilters && (
              <div className="md:hidden mb-6">
                <RequestFilters 
                  filters={filters}
                  setFilters={setFilters}
                  statuses={statuses}
                  departments={departments}
                  priorities={priorities}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            )}
            
            {/* Requests table with better overflow handling */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <RequestsTable 
                requests={sortedRequests} 
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
                onView={handleViewRequest}
                onApprove={handleApproveRequest}
                onReject={handleRejectRequest}
                onDelete={handleDeleteRequest}
              />
            </div>
          </div>
        </div>
        
        {/* Request details modal */}
        {showRequestDetails && selectedRequest && (
          <RequestDetailsModal 
            request={selectedRequest} 
            onClose={() => setShowRequestDetails(false)}
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
          />
        )}
        
        {/* Create request modal */}
        {showCreateRequest && (
          <CreateRequestModal 
            departments={departments}
            onSave={handleSaveRequest}
            onClose={() => setShowCreateRequest(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PurchaseRequests;
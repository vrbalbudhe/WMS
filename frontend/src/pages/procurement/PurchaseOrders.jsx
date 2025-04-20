import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaFileExport, 
  FaReceipt,
  FaShoppingCart,
  FaTruck,
  FaCheck,
  FaTimes,
  FaFileInvoiceDollar
} from 'react-icons/fa';

// Import components
import PurchaseOrderTable from '../../components/procurement/order/PurchaseOrderTable';
import PurchaseOrderFilters from '../../components/procurement/order/PurchaseOrderFilters';
import PurchaseOrderDetailsModal from '../../components/procurement/order/PurchaseOrderDetailsModal';
import CreatePurchaseOrderModal from '../../components/procurement/order/CreatePurchaseOrderModal';
import PurchaseOrderSummaryCards from '../../components/procurement/order/PurchaseOrderSummaryCards';

const PurchaseOrders = () => {
  // State for purchase orders (in a real app, this would come from an API)
  const [purchaseOrders, setPurchaseOrders] = useState([
    { 
      id: 'PO-5001', 
      date: '2025-04-15', 
      requestId: 'PR-2089',
      vendorId: 'V-1001',
      vendorName: 'Tech Supplies Inc.',
      items: [
        { name: 'Laptop - Model X', quantity: 2, unitPrice: 1200.00, total: 2400.00 },
        { name: 'Monitor - 27"', quantity: 2, unitPrice: 300.00, total: 600.00 }
      ],
      totalAmount: 3000.00,
      status: 'Pending Approval',
      expectedDelivery: '2025-04-30',
      approvedBy: '',
      notes: 'Standard delivery requested'
    },
    { 
      id: 'PO-5000', 
      date: '2025-04-14', 
      requestId: 'PR-2088',
      vendorId: 'V-1006',
      vendorName: 'Creative Design Agency',
      items: [
        { name: 'Marketing Software License', quantity: 1, unitPrice: 1200.00, total: 1200.00 },
        { name: 'Digital Camera', quantity: 1, unitPrice: 800.00, total: 800.00 }
      ],
      totalAmount: 2000.00,
      status: 'Approved',
      expectedDelivery: '2025-04-25',
      approvedBy: 'John Director',
      notes: 'Expedited delivery requested'
    },
    { 
      id: 'PO-4999', 
      date: '2025-04-13', 
      requestId: 'PR-2087',
      vendorId: 'V-1002',
      vendorName: 'Office Essentials',
      items: [
        { name: 'Office Chairs', quantity: 5, unitPrice: 250.00, total: 1250.00 },
        { name: 'Filing Cabinets', quantity: 2, unitPrice: 175.00, total: 350.00 }
      ],
      totalAmount: 1600.00,
      status: 'Ordered',
      expectedDelivery: '2025-04-28',
      approvedBy: 'Sarah Manager',
      notes: 'Please deliver to reception area'
    },
    { 
      id: 'PO-4998', 
      date: '2025-04-12', 
      requestId: 'PR-2086',
      vendorId: 'V-1008',
      vendorName: 'Data Security Solutions',
      items: [
        { name: 'Security Software Renewal', quantity: 1, unitPrice: 3500.00, total: 3500.00 }
      ],
      totalAmount: 3500.00,
      status: 'Partially Received',
      expectedDelivery: '2025-04-20',
      approvedBy: 'Michael IT',
      notes: 'Access keys should be emailed to IT department'
    },
    { 
      id: 'PO-4997', 
      date: '2025-04-10', 
      requestId: 'PR-2085',
      vendorId: 'V-1003',
      vendorName: 'Global Hardware',
      items: [
        { name: 'Network Switches', quantity: 4, unitPrice: 425.00, total: 1700.00 },
        { name: 'Ethernet Cables (Box)', quantity: 2, unitPrice: 85.00, total: 170.00 }
      ],
      totalAmount: 1870.00,
      status: 'Received',
      expectedDelivery: '2025-04-18',
      approvedBy: 'David IT',
      notes: 'All items received in good condition'
    },
    { 
      id: 'PO-4996', 
      date: '2025-04-08', 
      requestId: 'PR-2084',
      vendorId: 'V-1007',
      vendorName: 'Logistics Partners',
      items: [
        { name: 'Shipping Services - Q2', quantity: 1, unitPrice: 4500.00, total: 4500.00 }
      ],
      totalAmount: 4500.00,
      status: 'Invoiced',
      expectedDelivery: '2025-04-15',
      approvedBy: 'Lisa Operations',
      notes: 'Quarterly shipping services contract'
    },
    { 
      id: 'PO-4995', 
      date: '2025-04-05', 
      requestId: 'PR-2083',
      vendorId: 'V-1010',
      vendorName: 'Eco-Friendly Packaging',
      items: [
        { name: 'Recycled Packaging Materials', quantity: 500, unitPrice: 1.20, total: 600.00 },
        { name: 'Biodegradable Packing Peanuts', quantity: 20, unitPrice: 25.00, total: 500.00 }
      ],
      totalAmount: 1100.00,
      status: 'Paid',
      expectedDelivery: '2025-04-12',
      approvedBy: 'Emily Sustainability',
      notes: 'Payment processed on receipt'
    },
    { 
      id: 'PO-4994', 
      date: '2025-04-03', 
      requestId: 'PR-2082',
      vendorId: 'V-1004',
      vendorName: 'Premium Consultants',
      items: [
        { name: 'Business Strategy Consultation', quantity: 1, unitPrice: 8500.00, total: 8500.00 }
      ],
      totalAmount: 8500.00,
      status: 'Cancelled',
      expectedDelivery: '2025-04-25',
      approvedBy: 'Robert CEO',
      notes: 'Cancelled due to budget constraints'
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
    dateRange: { start: '', end: '' },
    minAmount: '',
    maxAmount: ''
  });
  
  // State for showing filter sidebar
  const [showFilters, setShowFilters] = useState(false);
  
  // State for purchase order detail modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  
  // State for create purchase order modal
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  
  // Handle order view
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };
  
  // Handle create order
  const handleCreateOrder = () => {
    setEditingOrder(null);
    setShowCreateOrder(true);
  };
  
  // Handle edit order
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowCreateOrder(true);
  };
  
  // Handle order save
  const handleSaveOrder = (order) => {
    if (editingOrder) {
      // Update existing order
      setPurchaseOrders(prevOrders => 
        prevOrders.map(o => o.id === order.id ? order : o)
      );
    } else {
      // Add new order with generated ID
      const newOrder = {
        ...order,
        id: `PO-${5000 + purchaseOrders.length + 1}`,
        date: new Date().toISOString().split('T')[0]
      };
      setPurchaseOrders(prevOrders => [newOrder, ...prevOrders]);
    }
    setShowCreateOrder(false);
    setEditingOrder(null);
  };
  
  // Handle order approval
  const handleApproveOrder = (id) => {
    setPurchaseOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === id && order.status === 'Pending Approval') {
          return { 
            ...order, 
            status: 'Approved',
            approvedBy: 'Current User' // In a real app, this would be the logged-in user
          };
        }
        return order;
      })
    );
    // Close the modal if open
    setShowOrderDetails(false);
  };
  
  // Handle order rejection
  const handleRejectOrder = (id) => {
    setPurchaseOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === id && order.status === 'Pending Approval') {
          return { ...order, status: 'Cancelled' };
        }
        return order;
      })
    );
    // Close the modal if open
    setShowOrderDetails(false);
  };
  
  // Handle order cancellation
  const handleCancelOrder = (id) => {
    if (window.confirm('Are you sure you want to cancel this purchase order?')) {
      setPurchaseOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.id === id && ['Pending Approval', 'Approved'].includes(order.status)) {
            return { ...order, status: 'Cancelled' };
          }
          return order;
        })
      );
    }
  };
  
  // Handle order status update
  const handleUpdateStatus = (id, newStatus) => {
    setPurchaseOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === id) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  };
  
  // Handle order delete
  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this purchase order? This action cannot be undone.')) {
      setPurchaseOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    }
  };
  
  // Get all unique statuses for filters
  const statuses = [...new Set(purchaseOrders.map(order => order.status))];
  
  // Filter orders based on search term and filters
  const filteredOrders = purchaseOrders.filter(order => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.requestId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = 
      filters.status.length === 0 || 
      filters.status.includes(order.status);
    
    // Filter by date range
    const orderDate = new Date(order.date);
    const matchesDateStart = 
      !filters.dateRange.start || 
      new Date(filters.dateRange.start) <= orderDate;
    const matchesDateEnd = 
      !filters.dateRange.end || 
      new Date(filters.dateRange.end) >= orderDate;
    
    // Filter by amount range
    const matchesMinAmount = 
      !filters.minAmount || 
      order.totalAmount >= parseFloat(filters.minAmount);
    const matchesMaxAmount = 
      !filters.maxAmount || 
      order.totalAmount <= parseFloat(filters.maxAmount);
    
    return matchesSearch && matchesStatus && matchesDateStart && matchesDateEnd && matchesMinAmount && matchesMaxAmount;
  });
  
  // Sort filtered orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortField === 'date' || sortField === 'expectedDelivery') {
      return sortDirection === 'asc' 
        ? new Date(a[sortField]) - new Date(b[sortField])
        : new Date(b[sortField]) - new Date(a[sortField]);
    }
    
    if (sortField === 'totalAmount') {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    }
    
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
    alert('Exporting purchase orders data...');
  };
  
  // Calculate order statistics for summary cards
  const pendingApproval = purchaseOrders.filter(order => order.status === 'Pending Approval').length;
  const ordersInProgress = purchaseOrders.filter(order => ['Approved', 'Ordered', 'Partially Received'].includes(order.status)).length;
  const ordersCompleted = purchaseOrders.filter(order => ['Received', 'Invoiced', 'Paid'].includes(order.status)).length;
  const totalSpend = purchaseOrders.reduce((sum, order) => order.status !== 'Cancelled' ? sum + order.totalAmount : sum, 0);
  
  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Purchase Orders</h1>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={handleCreateOrder}
              className="flex items-center text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
            >
              <FaPlus className="mr-2" />
              New Order
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
        
        {/* Summary Cards */}
        <div className="w-full max-w-full overflow-hidden">
          <PurchaseOrderSummaryCards 
            pendingApproval={pendingApproval}
            ordersInProgress={ordersInProgress}
            ordersCompleted={ordersCompleted}
            totalSpend={totalSpend}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar for larger screens */}
          <div className={`hidden md:block w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'}`}>
            <PurchaseOrderFilters 
              filters={filters}
              setFilters={setFilters}
              statuses={statuses}
            />
          </div>
          
          <div className="flex-grow min-w-0 w-full">
            {/* Search and filter bar */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow min-w-0">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex-shrink-0 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg leading-5 bg-white text-gray-700 hover:bg-gray-50"
                >
                  <FaFilter className="mr-2" />
                  Filters
                </button>
              </div>
              
              {/* Filter tags */}
              {(filters.status.length > 0 || filters.dateRange.start || filters.dateRange.end || filters.minAmount || filters.maxAmount) && (
                <div className="flex flex-wrap gap-2 mt-3 overflow-hidden">
                  {filters.status.map(status => (
                    <span key={`status-${status}`} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <span className="truncate max-w-[120px]">{status}</span>
                      <button 
                        className="ml-1 flex-shrink-0 focus:outline-none" 
                        onClick={() => setFilters({...filters, status: filters.status.filter(s => s !== status)})}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  {filters.dateRange.start && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      From: {filters.dateRange.start}
                      <button 
                        className="ml-1 flex-shrink-0 focus:outline-none" 
                        onClick={() => setFilters({
                          ...filters, 
                          dateRange: {...filters.dateRange, start: ''}
                        })}
                      >
                        &times;
                      </button>
                    </span>
                  )}
                  {filters.dateRange.end && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      To: {filters.dateRange.end}
                      <button 
                        className="ml-1 flex-shrink-0 focus:outline-none" 
                        onClick={() => setFilters({
                          ...filters, 
                          dateRange: {...filters.dateRange, end: ''}
                        })}
                      >
                        &times;
                      </button>
                    </span>
                  )}
                  {filters.minAmount && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                      Min: ${filters.minAmount}
                      <button 
                        className="ml-1 flex-shrink-0 focus:outline-none" 
                        onClick={() => setFilters({...filters, minAmount: ''})}
                      >
                        &times;
                      </button>
                    </span>
                  )}
                  {filters.maxAmount && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                      Max: ${filters.maxAmount}
                      <button 
                        className="ml-1 flex-shrink-0 focus:outline-none" 
                        onClick={() => setFilters({...filters, maxAmount: ''})}
                      >
                        &times;
                      </button>
                    </span>
                  )}
                  <button 
                    className="text-gray-500 text-xs underline"
                    onClick={() => setFilters({
                      status: [],
                      dateRange: { start: '', end: '' },
                      minAmount: '',
                      maxAmount: ''
                    })}
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile filter panel */}
            {showFilters && (
              <div className="md:hidden mb-6">
                <PurchaseOrderFilters 
                  filters={filters}
                  setFilters={setFilters}
                  statuses={statuses}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            )}
            
            {/* Purchase Orders table */}
            <PurchaseOrderTable 
              orders={sortedOrders} 
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onView={handleViewOrder}
              onEdit={handleEditOrder}
              onApprove={handleApproveOrder}
              onReject={handleRejectOrder}
              onCancel={handleCancelOrder}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteOrder}
            />
          </div>
        </div>
        
        {/* Purchase order details modal */}
        {showOrderDetails && selectedOrder && (
          <PurchaseOrderDetailsModal 
            order={selectedOrder} 
            onClose={() => setShowOrderDetails(false)}
            onEdit={() => {
              setShowOrderDetails(false);
              handleEditOrder(selectedOrder);
            }}
            onApprove={handleApproveOrder}
            onReject={handleRejectOrder}
            onCancel={handleCancelOrder}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
        
        {/* Create/edit order modal */}
        {showCreateOrder && (
          <CreatePurchaseOrderModal 
            order={editingOrder}
            onSave={handleSaveOrder}
            onClose={() => {
              setShowCreateOrder(false);
              setEditingOrder(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PurchaseOrders;
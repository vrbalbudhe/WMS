import React, { useState } from 'react';
import { 
  FaTruck, 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaFileExport,
  FaEye,
  FaEdit,
  FaPrint,
  FaMapMarkerAlt,
  FaBox,
  FaBoxOpen,
  FaCalendarAlt,
  FaUserAlt
} from 'react-icons/fa';
import ShipmentFilters from '../../components/warehouse/shipments/ShipmentFilters';
import ShipmentTable from '../../components/warehouse/shipments/ShipmentTable';
import ShipmentDetailsModal from '../../components/warehouse/shipments/ShipmentDetailsModal';
import CreateShipmentModal from '../../components/warehouse/shipments/CreateShipmentModal';
import ShipmentStatusCard from '../../components/warehouse/shipments/ShipmentStatusCard';

const ShipmentTracking = () => {
  // State for shipments (in a real app, this would come from an API)
  const [shipments, setShipments] = useState([
    {
      id: 'SH-1023',
      date: '2025-04-16',
      type: 'Outbound',
      destination: 'Main Store, New York',
      origin: 'Warehouse A, New Jersey',
      status: 'Delivered',
      items: 15,
      carrier: 'FastExpress',
      trackingNumber: 'FE-789456123',
      expectedDelivery: '2025-04-16',
      actualDelivery: '2025-04-16',
      customer: 'Retail Division',
      notes: 'Regular weekly delivery',
      lastUpdated: '2025-04-16 14:35'
    },
    {
      id: 'SH-1022',
      date: '2025-04-15',
      type: 'Outbound',
      destination: 'North Branch, Boston',
      origin: 'Warehouse A, New Jersey',
      status: 'In Transit',
      items: 8,
      carrier: 'FastExpress',
      trackingNumber: 'FE-789456124',
      expectedDelivery: '2025-04-17',
      actualDelivery: null,
      customer: 'Retail Division',
      notes: 'Priority shipment',
      lastUpdated: '2025-04-16 09:22'
    },
    {
      id: 'SH-1021',
      date: '2025-04-14',
      type: 'Outbound',
      destination: 'South Branch, Miami',
      origin: 'Warehouse B, Atlanta',
      status: 'Processing',
      items: 12,
      carrier: 'Global Logistics',
      trackingNumber: 'GL-456789123',
      expectedDelivery: '2025-04-18',
      actualDelivery: null,
      customer: 'Retail Division',
      notes: 'Contains fragile items',
      lastUpdated: '2025-04-14 16:40'
    },
    {
      id: 'SH-1020',
      date: '2025-04-13',
      type: 'Outbound',
      destination: 'East Branch, Philadelphia',
      origin: 'Warehouse A, New Jersey',
      status: 'Delivered',
      items: 5,
      carrier: 'FastExpress',
      trackingNumber: 'FE-789456125',
      expectedDelivery: '2025-04-14',
      actualDelivery: '2025-04-14',
      customer: 'Retail Division',
      notes: 'Standard delivery',
      lastUpdated: '2025-04-14 10:15'
    },
    {
      id: 'SH-1019',
      date: '2025-04-12',
      type: 'Inbound',
      destination: 'Warehouse A, New Jersey',
      origin: 'Supplier Inc., Chicago',
      status: 'Received',
      items: 20,
      carrier: 'Global Logistics',
      trackingNumber: 'GL-456789124',
      expectedDelivery: '2025-04-13',
      actualDelivery: '2025-04-13',
      customer: 'Inventory Restock',
      notes: 'Monthly inventory restock',
      lastUpdated: '2025-04-13 11:05'
    },
    {
      id: 'SH-1018',
      date: '2025-04-11',
      type: 'Inbound',
      destination: 'Warehouse B, Atlanta',
      origin: 'Manufacturer Ltd., Detroit',
      status: 'In Transit',
      items: 30,
      carrier: 'Reliable Transport',
      trackingNumber: 'RT-123789456',
      expectedDelivery: '2025-04-17',
      actualDelivery: null,
      customer: 'Inventory Restock',
      notes: 'New product line',
      lastUpdated: '2025-04-15 08:30'
    }
  ]);
  
  // Status summary counts
  const statusCounts = {
    processing: shipments.filter(s => s.status === 'Processing').length,
    inTransit: shipments.filter(s => s.status === 'In Transit').length,
    delivered: shipments.filter(s => s.status === 'Delivered').length,
    delayed: shipments.filter(s => s.status === 'Delayed').length,
    received: shipments.filter(s => s.status === 'Received').length
  };
  
  // State for sorting
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for filters
  const [filters, setFilters] = useState({
    status: [],
    type: [],
    carrier: []
  });
  
  // State for showing filter sidebar
  const [showFilters, setShowFilters] = useState(false);
  
  // State for shipment detail modal
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showShipmentDetails, setShowShipmentDetails] = useState(false);
  
  // State for create shipment modal
  const [showCreateShipment, setShowCreateShipment] = useState(false);
  
  // Handle shipment view
  const handleViewShipment = (shipment) => {
    setSelectedShipment(shipment);
    setShowShipmentDetails(true);
  };
  
  // Handle create shipment
  const handleCreateShipment = () => {
    setShowCreateShipment(true);
  };
  
  // Handle shipment save
  const handleSaveShipment = (shipment) => {
    if (shipment.id) {
      // Update existing shipment
      setShipments(prevShipments => 
        prevShipments.map(s => s.id === shipment.id ? shipment : s)
      );
    } else {
      // Add new shipment with generated ID
      const newShipment = {
        ...shipment,
        id: `SH-${Math.floor(1000 + Math.random() * 9000)}`,
        lastUpdated: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().substring(0, 5)
      };
      setShipments(prevShipments => [newShipment, ...prevShipments]);
    }
    setShowCreateShipment(false);
  };
  
  // Handle update shipment status
  const handleUpdateStatus = (id, newStatus) => {
    setShipments(prevShipments => 
      prevShipments.map(shipment => {
        if (shipment.id === id) {
          const updatedShipment = { 
            ...shipment, 
            status: newStatus,
            lastUpdated: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().substring(0, 5)
          };
          
          // If status is Delivered or Received, set actual delivery date
          if (newStatus === 'Delivered' || newStatus === 'Received') {
            updatedShipment.actualDelivery = new Date().toISOString().split('T')[0];
          }
          
          return updatedShipment;
        }
        return shipment;
      })
    );
  };
  
  // Get all unique statuses, types, and carriers for filters
  const statuses = [...new Set(shipments.map(shipment => shipment.status))];
  const types = [...new Set(shipments.map(shipment => shipment.type))];
  const carriers = [...new Set(shipments.map(shipment => shipment.carrier))];
  
  // Filter shipments based on search term and filters
  const filteredShipments = shipments.filter(shipment => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = 
      filters.status.length === 0 || 
      filters.status.includes(shipment.status);
    
    // Filter by type
    const matchesType = 
      filters.type.length === 0 || 
      filters.type.includes(shipment.type);
    
    // Filter by carrier
    const matchesCarrier = 
      filters.carrier.length === 0 || 
      filters.carrier.includes(shipment.carrier);
    
    return matchesSearch && matchesStatus && matchesType && matchesCarrier;
  });
  
  // Sort filtered shipments
  const sortedShipments = [...filteredShipments].sort((a, b) => {
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
    alert('Exporting shipment data...');
  };
  
  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Shipment Tracking</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleCreateShipment}
              className="flex items-center text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
            >
              <FaPlus className="mr-2" />
              Create Shipment
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
        
        {/* Status Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <ShipmentStatusCard 
            status="Processing"
            count={statusCounts.processing}
            icon={<FaBox />}
            color="bg-blue-100 text-blue-800"
          />
          <ShipmentStatusCard 
            status="In Transit"
            count={statusCounts.inTransit}
            icon={<FaTruck />}
            color="bg-yellow-100 text-yellow-800"
          />
          <ShipmentStatusCard 
            status="Delivered"
            count={statusCounts.delivered}
            icon={<FaBoxOpen />}
            color="bg-green-100 text-green-800"
          />
          <ShipmentStatusCard 
            status="Delayed"
            count={statusCounts.delayed || 0}
            icon={<FaCalendarAlt />}
            color="bg-red-100 text-red-800"
          />
          <ShipmentStatusCard 
            status="Received"
            count={statusCounts.received}
            icon={<FaBoxOpen />}
            color="bg-blue-100 text-blue-800"
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar for larger screens */}
          <div className={`hidden md:block w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'}`}>
            <ShipmentFilters 
              filters={filters}
              setFilters={setFilters}
              statuses={statuses}
              types={types}
              carriers={carriers}
            />
          </div>
          
          <div className="flex-grow min-w-0 max-w-full">
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
                    placeholder="Search by ID, destination, or tracking..."
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
              {(filters.status.length > 0 || filters.type.length > 0 || filters.carrier.length > 0) && (
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
                  {filters.type.map(type => (
                    <span key={`type-${type}`} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                      {type}
                      <button 
                        className="ml-1 focus:outline-none" 
                        onClick={() => setFilters({...filters, type: filters.type.filter(t => t !== type)})}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  {filters.carrier.map(carrier => (
                    <span key={`carrier-${carrier}`} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      {carrier}
                      <button 
                        className="ml-1 focus:outline-none" 
                        onClick={() => setFilters({...filters, carrier: filters.carrier.filter(c => c !== carrier)})}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <button 
                    className="text-gray-500 text-xs underline"
                    onClick={() => setFilters({status: [], type: [], carrier: []})}
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile filter panel */}
            {showFilters && (
              <div className="md:hidden mb-6">
                <ShipmentFilters 
                  filters={filters}
                  setFilters={setFilters}
                  statuses={statuses}
                  types={types}
                  carriers={carriers}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            )}
            
            {/* Shipments table */}
            <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
              <ShipmentTable 
                shipments={sortedShipments} 
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
                onView={handleViewShipment}
                onUpdateStatus={handleUpdateStatus}
              />
            </div>
          </div>
        </div>
        
        {/* Shipment details modal */}
        {showShipmentDetails && selectedShipment && (
          <ShipmentDetailsModal 
            shipment={selectedShipment} 
            onClose={() => setShowShipmentDetails(false)}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
        
        {/* Create shipment modal */}
        {showCreateShipment && (
          <CreateShipmentModal 
            carriers={carriers}
            onSave={handleSaveShipment}
            onClose={() => setShowCreateShipment(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ShipmentTracking;
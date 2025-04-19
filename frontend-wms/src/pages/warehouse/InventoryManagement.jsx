import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaFileExport, 
  FaSort, 
  FaSortUp, 
  FaSortDown,
  FaEdit,
  FaTrash,
  FaEye,
  FaHistory
} from 'react-icons/fa';
import InventoryFilters from '../../components/warehouse/inventory/InventoryFilters';
import InventoryTable from '../../components/warehouse/inventory/InventoryTable';
import ItemDetailsModal from '../../components/warehouse/inventory/ItemDetailsModal';
import AddEditItemModal from '../../components/warehouse/inventory/AddEditItemModal';

const InventoryManagement = () => {
  // State for inventory items (in a real app, this would come from an API)
  const [inventoryItems, setInventoryItems] = useState([
    { 
      id: 'ITM-2057', 
      name: 'Office Chair - Ergonomic', 
      category: 'Furniture',
      location: 'Warehouse A, Shelf 5',
      quantity: 15,
      minStock: 10,
      supplier: 'Office Furnish Co.',
      lastUpdated: '2025-04-10',
      status: 'In Stock'
    },
    { 
      id: 'ITM-1867', 
      name: 'Printer Toner - Black', 
      category: 'Office Supplies',
      location: 'Warehouse B, Shelf 2',
      quantity: 3,
      minStock: 15,
      supplier: 'Tech Supplies Inc.',
      lastUpdated: '2025-04-12',
      status: 'Low Stock'
    },
    { 
      id: 'ITM-1942', 
      name: 'Desktop Computer - Model X', 
      category: 'Electronics',
      location: 'Warehouse A, Shelf 10',
      quantity: 8,
      minStock: 5,
      supplier: 'Tech Supplies Inc.',
      lastUpdated: '2025-04-15',
      status: 'In Stock'
    },
    { 
      id: 'ITM-2103', 
      name: 'First Aid Kit', 
      category: 'Safety',
      location: 'Warehouse A, Shelf 1',
      quantity: 1,
      minStock: 8,
      supplier: 'Safety First Ltd.',
      lastUpdated: '2025-04-08',
      status: 'Low Stock'
    },
    { 
      id: 'ITM-1756', 
      name: 'Paper - A4', 
      category: 'Office Supplies',
      location: 'Warehouse B, Shelf 3',
      quantity: 0,
      minStock: 20,
      supplier: 'Paper Supplies Co.',
      lastUpdated: '2025-04-11',
      status: 'Out of Stock'
    },
    { 
      id: 'ITM-2104', 
      name: 'Projector - HD', 
      category: 'Electronics',
      location: 'Warehouse A, Shelf 7',
      quantity: 5,
      minStock: 3,
      supplier: 'Tech Supplies Inc.',
      lastUpdated: '2025-04-14',
      status: 'In Stock'
    },
    { 
      id: 'ITM-1893', 
      name: 'Conference Table', 
      category: 'Furniture',
      location: 'Warehouse C, Floor Area',
      quantity: 2,
      minStock: 1,
      supplier: 'Office Furnish Co.',
      lastUpdated: '2025-04-01',
      status: 'In Stock'
    },
    { 
      id: 'ITM-2035', 
      name: 'Whiteboard - Large', 
      category: 'Office Equipment',
      location: 'Warehouse C, Wall Storage',
      quantity: 4,
      minStock: 2,
      supplier: 'Office Furnish Co.',
      lastUpdated: '2025-04-09',
      status: 'In Stock'
    }
  ]);
  
  // State for sorting
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for filters
  const [filters, setFilters] = useState({
    category: [],
    status: [],
    supplier: []
  });
  
  // State for showing filter sidebar
  const [showFilters, setShowFilters] = useState(false);
  
  // State for item detail modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  
  // State for adding/editing item modal
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Handle item view
  const handleViewItem = (item) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };
  
  // Handle item edit
  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowAddEditModal(true);
  };
  
  // Handle adding a new item
  const handleAddNewItem = () => {
    setEditingItem(null);
    setShowAddEditModal(true);
  };
  
  // Handle item save (add/edit)
  const handleSaveItem = (item) => {
    if (item.id) {
      // Update existing item
      setInventoryItems(prevItems => 
        prevItems.map(i => i.id === item.id ? item : i)
      );
    } else {
      // Add new item with generated ID
      const newItem = {
        ...item,
        id: `ITM-${Math.floor(1000 + Math.random() * 9000)}`,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setInventoryItems(prevItems => [...prevItems, newItem]);
    }
    setShowAddEditModal(false);
  };
  
  // Handle item delete
  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventoryItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };
  
  // Get all unique categories, statuses, and suppliers for filters
  const categories = [...new Set(inventoryItems.map(item => item.category))];
  const statuses = [...new Set(inventoryItems.map(item => item.status))];
  const suppliers = [...new Set(inventoryItems.map(item => item.supplier))];
  
  // Filter items based on search term and filters
  const filteredItems = inventoryItems.filter(item => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      filters.category.length === 0 || 
      filters.category.includes(item.category);
    
    // Filter by status
    const matchesStatus = 
      filters.status.length === 0 || 
      filters.status.includes(item.status);
    
    // Filter by supplier
    const matchesSupplier = 
      filters.supplier.length === 0 || 
      filters.supplier.includes(item.supplier);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesSupplier;
  });
  
  // Sort filtered items
  const sortedItems = [...filteredItems].sort((a, b) => {
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
    alert('Exporting inventory data...');
  };
  
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleAddNewItem}
              className="flex items-center text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
            >
              <FaPlus className="mr-2" />
              Add Item
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
            <InventoryFilters 
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              statuses={statuses}
              suppliers={suppliers}
            />
          </div>
          
          <div className="flex-grow" style={{ minWidth: 0, maxWidth: '100%' }}>
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
                    placeholder="Search by name or ID..."
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
              {(filters.category.length > 0 || filters.status.length > 0 || filters.supplier.length > 0) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {filters.category.map(cat => (
                    <span key={`cat-${cat}`} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                      {cat}
                      <button 
                        className="ml-1 focus:outline-none" 
                        onClick={() => setFilters({...filters, category: filters.category.filter(c => c !== cat)})}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
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
                  {filters.supplier.map(supplier => (
                    <span key={`supplier-${supplier}`} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      {supplier}
                      <button 
                        className="ml-1 focus:outline-none" 
                        onClick={() => setFilters({...filters, supplier: filters.supplier.filter(s => s !== supplier)})}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <button 
                    className="text-gray-500 text-xs underline"
                    onClick={() => setFilters({category: [], status: [], supplier: []})}
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile filter panel */}
            {showFilters && (
              <div className="md:hidden mb-6">
                <InventoryFilters 
                  filters={filters}
                  setFilters={setFilters}
                  categories={categories}
                  statuses={statuses}
                  suppliers={suppliers}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            )}
            
            {/* Inventory table with limited width to prevent overflow */}
            <div style={{ width: '100%', overflowX: 'auto', display: 'block' }}>
              <InventoryTable 
                items={sortedItems} 
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
                onView={handleViewItem}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            </div>
          </div>
        </div>
        
        {/* Item details modal */}
        {showItemDetails && selectedItem && (
          <ItemDetailsModal 
            item={selectedItem} 
            onClose={() => setShowItemDetails(false)}
            onEdit={() => {
              setShowItemDetails(false);
              handleEditItem(selectedItem);
            }}
          />
        )}
        
        {/* Add/Edit item modal */}
        {showAddEditModal && (
          <AddEditItemModal 
            item={editingItem} 
            categories={categories}
            suppliers={suppliers}
            onSave={handleSaveItem}
            onClose={() => setShowAddEditModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;
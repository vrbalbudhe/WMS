import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaFileExport, 
  FaBuilding,
  FaFileContract
} from 'react-icons/fa';

// Import components
import VendorTable from '../../components/procurement/vendor/VendorTable';
import VendorFilters from '../../components/procurement/vendor/VendorFilters';
import VendorDetailsModal from '../../components/procurement/vendor/VendorDetailsModal';
import CreateVendorModal from '../../components/procurement/vendor/CreateVendorModal';
import VendorSummaryCards from '../../components/procurement/vendor/VendorSummaryCards';

const VendorManagement = () => {
  // State for vendors (in a real app, this would come from an API)
  const [vendors, setVendors] = useState([
    { 
      id: 'V-1001', 
      name: 'Tech Supplies Inc.', 
      category: 'IT Equipment',
      contactPerson: 'John Anderson',
      email: 'j.anderson@techsupplies.com',
      phone: '(555) 123-4567',
      address: '123 Tech Lane, Suite 400',
      location: 'Boston, MA 02110',
      website: 'www.techsupplies.com',
      totalSpend: 128500,
      contractEndDate: '2025-09-30',
      status: 'Active',
      rating: 4,
      favorite: true,
      paymentTerms: 'Net 30',
      notes: 'Preferred supplier for IT equipment. Volume discounts available for orders over $10,000.'
    },
    { 
      id: 'V-1002', 
      name: 'Office Essentials', 
      category: 'Office Supplies',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@officeessentials.com',
      phone: '(555) 987-6543',
      address: '456 Office Park Drive',
      location: 'Chicago, IL 60601',
      website: 'www.officeessentials.com',
      totalSpend: 75200,
      contractEndDate: '2025-12-15',
      status: 'Active',
      rating: 5,
      favorite: false,
      paymentTerms: 'Net 45',
      notes: 'Reliable office supply vendor with excellent customer service. Free delivery for orders over $200.'
    },
    { 
      id: 'V-1003', 
      name: 'Global Hardware', 
      category: 'Manufacturing',
      contactPerson: 'Michael Wong',
      email: 'm.wong@globalhardware.com',
      phone: '(555) 456-7890',
      address: '789 Industrial Blvd',
      location: 'Detroit, MI 48201',
      website: 'www.globalhardware.com',
      totalSpend: 92800,
      contractEndDate: '2025-07-22',
      status: 'Active',
      rating: 3,
      favorite: false,
      paymentTerms: 'Net 60',
      notes: 'International supplier with competitive pricing on manufacturing components. Long lead times.'
    },
    { 
      id: 'V-1004', 
      name: 'Premium Consultants', 
      category: 'Professional Services',
      contactPerson: 'Emily Davis',
      email: 'e.davis@premiumconsultants.com',
      phone: '(555) 789-0123',
      address: '101 Consultant Plaza',
      location: 'New York, NY 10001',
      website: 'www.premiumconsultants.com',
      totalSpend: 215000,
      contractEndDate: '2026-01-15',
      status: 'Active',
      rating: 4,
      favorite: true,
      paymentTerms: 'Net 15',
      notes: 'High-end consulting firm. Requires detailed SOW for all engagements.'
    },
    { 
      id: 'V-1005', 
      name: 'BuildRight Construction', 
      category: 'Construction',
      contactPerson: 'Robert Martinez',
      email: 'robert@buildright.com',
      phone: '(555) 234-5678',
      address: '202 Builder Way',
      location: 'Austin, TX 78701',
      website: 'www.buildright.com',
      totalSpend: 350000,
      contractEndDate: '2025-08-30',
      status: 'Inactive',
      rating: 4,
      favorite: false,
      paymentTerms: 'Net 30',
      notes: 'Used for office renovations. Currently inactive as projects are complete.'
    },
    { 
      id: 'V-1006', 
      name: 'Creative Design Agency', 
      category: 'Marketing',
      contactPerson: 'Sophia Lee',
      email: 'sophia@creativedesign.com',
      phone: '(555) 345-6789',
      address: '303 Creative Blvd',
      location: 'San Francisco, CA 94105',
      website: 'www.creativedesign.com',
      totalSpend: 87500,
      contractEndDate: '2025-10-10',
      status: 'Active',
      rating: 5,
      favorite: true,
      paymentTerms: 'Net 30',
      notes: 'Handles all branding and design work. Excellent quality and responsive team.'
    },
    { 
      id: 'V-1007', 
      name: 'Logistics Partners', 
      category: 'Transportation',
      contactPerson: 'David Wilson',
      email: 'd.wilson@logisticspartners.com',
      phone: '(555) 456-7890',
      address: '404 Transport Lane',
      location: 'Atlanta, GA 30301',
      website: 'www.logisticspartners.com',
      totalSpend: 130000,
      contractEndDate: '2025-06-30',
      status: 'Pending Review',
      rating: 3,
      favorite: false,
      paymentTerms: 'Net 45',
      notes: 'Transportation and logistics provider. Currently under performance review due to delayed shipments.'
    },
    { 
      id: 'V-1008', 
      name: 'Data Security Solutions', 
      category: 'IT Services',
      contactPerson: 'Amanda Chen',
      email: 'a.chen@datasecurity.com',
      phone: '(555) 567-8901',
      address: '505 Security Drive',
      location: 'Seattle, WA 98101',
      website: 'www.datasecurity.com',
      totalSpend: 175000,
      contractEndDate: '2025-11-15',
      status: 'Active',
      rating: 4,
      favorite: false,
      paymentTerms: 'Net 30',
      notes: 'Cybersecurity vendor with comprehensive service offerings. Annual security audits.'
    },
    { 
      id: 'V-1009', 
      name: 'Industrial Supplies Co.', 
      category: 'Manufacturing',
      contactPerson: 'James Thompson',
      email: 'james@industrialsupplies.com',
      phone: '(555) 678-9012',
      address: '606 Industrial Way',
      location: 'Pittsburgh, PA 15222',
      website: 'www.industrialsupplies.com',
      totalSpend: 68000,
      contractEndDate: '2025-12-31',
      status: 'Blacklisted',
      rating: 1,
      favorite: false,
      paymentTerms: 'Net 60',
      notes: 'Blacklisted due to consistent quality issues and missed delivery deadlines.'
    },
    { 
      id: 'V-1010', 
      name: 'Eco-Friendly Packaging', 
      category: 'Packaging',
      contactPerson: 'Lisa Green',
      email: 'lisa@ecofriendly.com',
      phone: '(555) 789-0123',
      address: '707 Sustainable Street',
      location: 'Portland, OR 97201',
      website: 'www.ecofriendly.com',
      totalSpend: 43500,
      contractEndDate: '2025-05-15',
      status: 'Active',
      rating: 5,
      favorite: true,
      paymentTerms: 'Net 30',
      notes: 'Specializes in sustainable packaging solutions. Slightly higher costs but aligns with corporate sustainability goals.'
    }
  ]);
  
  // State for sorting
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for filters
  const [filters, setFilters] = useState({
    categories: [],
    statuses: [],
    minRating: 1,
    onlyFavorites: false
  });
  
  // State for showing filter sidebar
  const [showFilters, setShowFilters] = useState(false);
  
  // State for vendor detail modal
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showVendorDetails, setShowVendorDetails] = useState(false);
  
  // State for create vendor modal
  const [showCreateVendor, setShowCreateVendor] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  
  // Handle vendor view
  const handleViewVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowVendorDetails(true);
  };
  
  // Handle create vendor
  const handleCreateVendor = () => {
    setEditingVendor(null);
    setShowCreateVendor(true);
  };
  
  // Handle edit vendor
  const handleEditVendor = (vendor) => {
    setEditingVendor(vendor);
    setShowCreateVendor(true);
  };
  
  // Handle vendor save
  const handleSaveVendor = (vendor) => {
    if (editingVendor) {
      // Update existing vendor
      setVendors(prevVendors => 
        prevVendors.map(v => v.id === vendor.id ? vendor : v)
      );
    } else {
      // Add new vendor with generated ID
      const newVendor = {
        ...vendor,
        id: `V-${1000 + vendors.length + 1}`,
        totalSpend: 0,
        rating: 3,
        favorite: false
      };
      setVendors(prevVendors => [...prevVendors, newVendor]);
    }
    setShowCreateVendor(false);
    setEditingVendor(null);
  };
  
  // Handle toggle favorite
  const handleToggleFavorite = (id) => {
    setVendors(prevVendors => 
      prevVendors.map(vendor => {
        if (vendor.id === id) {
          return { ...vendor, favorite: !vendor.favorite };
        }
        return vendor;
      })
    );
  };
  
  // Handle vendor delete
  const handleDeleteVendor = (id) => {
    if (window.confirm('Are you sure you want to delete this vendor? This action cannot be undone.')) {
      setVendors(prevVendors => prevVendors.filter(vendor => vendor.id !== id));
    }
  };
  
  // Get all unique categories for filters
  const categories = [...new Set(vendors.map(vendor => vendor.category))];
  const statuses = [...new Set(vendors.map(vendor => vendor.status))];
  
  // Filter vendors based on search term and filters
  const filteredVendors = vendors.filter(vendor => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      filters.categories.length === 0 || 
      filters.categories.includes(vendor.category);
    
    // Filter by status
    const matchesStatus = 
      filters.statuses.length === 0 || 
      filters.statuses.includes(vendor.status);
    
    // Filter by rating
    const matchesRating = vendor.rating >= filters.minRating;
    
    // Filter by favorites
    const matchesFavorites = !filters.onlyFavorites || vendor.favorite;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesRating && matchesFavorites;
  });
  
  // Sort filtered vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
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
    alert('Exporting vendors data...');
  };
  
  // Calculate vendor statistics for summary cards
  const activeVendors = vendors.filter(vendor => vendor.status === 'Active').length;
  const favoriteVendors = vendors.filter(vendor => vendor.favorite).length;
  const totalSpend = vendors.reduce((sum, vendor) => sum + vendor.totalSpend, 0);
  const averageRating = vendors.length > 0 
    ? (vendors.reduce((sum, vendor) => sum + vendor.rating, 0) / vendors.length).toFixed(1) 
    : 0;
  
    
    return (
        <div className="w-full max-w-full overflow-hidden">
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Vendor Management</h1>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={handleCreateVendor}
                  className="flex items-center text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
                >
                  <FaPlus className="mr-2" />
                  New Vendor
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
              <VendorSummaryCards 
                activeVendors={activeVendors}
                favoriteVendors={favoriteVendors}
                totalSpend={totalSpend}
                averageRating={averageRating}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Filter sidebar for larger screens */}
              <div className={`hidden md:block w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'}`}>
                <VendorFilters 
                  filters={filters}
                  setFilters={setFilters}
                  categories={categories}
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
                        placeholder="Search vendors..."
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
                  {(filters.categories.length > 0 || filters.statuses.length > 0 || filters.minRating > 1 || filters.onlyFavorites) && (
                    <div className="flex flex-wrap gap-2 mt-3 overflow-hidden">
                      {filters.categories.map(category => (
                        <span key={`category-${category}`} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <span className="truncate max-w-[120px]">{category}</span>
                          <button 
                            className="ml-1 flex-shrink-0 focus:outline-none" 
                            onClick={() => setFilters({...filters, categories: filters.categories.filter(c => c !== category)})}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                      {filters.statuses.map(status => (
                        <span key={`status-${status}`} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <span className="truncate max-w-[120px]">{status}</span>
                          <button 
                            className="ml-1 flex-shrink-0 focus:outline-none" 
                            onClick={() => setFilters({...filters, statuses: filters.statuses.filter(s => s !== status)})}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                      {filters.minRating > 1 && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                          {filters.minRating}+ Stars
                          <button 
                            className="ml-1 flex-shrink-0 focus:outline-none" 
                            onClick={() => setFilters({...filters, minRating: 1})}
                          >
                            &times;
                          </button>
                        </span>
                      )}
                      {filters.onlyFavorites && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
                          Favorites Only
                          <button 
                            className="ml-1 flex-shrink-0 focus:outline-none" 
                            onClick={() => setFilters({...filters, onlyFavorites: false})}
                          >
                            &times;
                          </button>
                        </span>
                      )}
                      <button 
                        className="text-gray-500 text-xs underline"
                        onClick={() => setFilters({
                          categories: [],
                          statuses: [],
                          minRating: 1,
                          onlyFavorites: false
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
                    <VendorFilters 
                      filters={filters}
                      setFilters={setFilters}
                      categories={categories}
                      statuses={statuses}
                      onClose={() => setShowFilters(false)}
                    />
                  </div>
                )}
                
                {/* Vendors table */}
                <VendorTable 
                  vendors={sortedVendors} 
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  onView={handleViewVendor}
                  onEdit={handleEditVendor}
                  onDelete={handleDeleteVendor}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            </div>
            
            {/* Vendor details modal */}
            {showVendorDetails && selectedVendor && (
              <VendorDetailsModal 
                vendor={selectedVendor} 
                onClose={() => setShowVendorDetails(false)}
                onEdit={() => {
                  setShowVendorDetails(false);
                  handleEditVendor(selectedVendor);
                }}
              />
            )}
            
            {/* Create/edit vendor modal */}
            {showCreateVendor && (
              <CreateVendorModal 
                vendor={editingVendor}
                categories={categories}
                statuses={statuses}
                onSave={handleSaveVendor}
                onClose={() => {
                  setShowCreateVendor(false);
                  setEditingVendor(null);
                }}
              />
            )}
          </div>
        </div>
      );
    };
    
export default VendorManagement;
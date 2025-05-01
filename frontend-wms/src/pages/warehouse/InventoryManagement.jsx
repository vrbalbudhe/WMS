// Path: frontend-wms/src/pages/warehouse/InventoryManagement.jsx
import React, { useState, useEffect, useContext } from 'react';
import { FaPlus, FaFilter, FaSearch, FaExclamationTriangle, FaSyncAlt } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import InventoryTable from '../../components/warehouse/inventory/InventoryTable';
import AddEditItemModal from '../../components/warehouse/inventory/AddEditItemModal';
import ItemDetailsModal from '../../components/warehouse/inventory/ItemDetailsModal';
import ScanItemModal from '../../components/warehouse/inventory/ScanItemModal';

const InventoryManagement = () => {
  const { currentUser } = useContext(AuthContext);
  
  // State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  
  // Modal state
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  
  // Fetch products and categories on component mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [currentPage, sortField, sortDirection]);
  
  // Fetch products with pagination and sorting
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        sortBy: sortField,
        sortOrder: sortDirection
      });
      
      // Add filters if they exist
      if (searchTerm) params.append('search', searchTerm);
      if (filterCategory) params.append('categoryId', filterCategory);
      
      const response = await axios.get(
        `http://localhost:8000/api/wm/products?${params.toString()}`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setProducts(response.data.data);
        setTotalPages(response.data.pagination.pages);
        setTotalItems(response.data.pagination.total);
      } else {
        setError(response.data.message || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch categories for filtering
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/wm/categories',
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Don't set error state here as it's not critical
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle category filter change
  const handleCategoryFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };
  
  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };
  
  // Apply filters
  const applyFilters = () => {
    setCurrentPage(1); // Reset to first page when filters change
    fetchProducts();
  };
  
  // Handle sort
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
  };
  
  // Open modal for creating a new product
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setShowAddEditModal(true);
  };
  
  // Open modal for editing a product
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setShowAddEditModal(true);
  };
  
  // Open modal for viewing product details
  const handleViewProduct = (product) => {
    setCurrentProduct(product);
    setShowDetailsModal(true);
  };
  
  // Show delete confirmation
  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };
  
  // Handle product create or update
  const handleSaveProduct = async (productData) => {
    try {
      let response;
      
      if (currentProduct) {
        // Update existing product
        response = await axios.put(
          `http://localhost:8000/api/wm/products/${currentProduct.id}`,
          productData,
          { withCredentials: true }
        );
      } else {
        // Create new product
        response = await axios.post(
          'http://localhost:8000/api/wm/products',
          productData,
          { withCredentials: true }
        );
      }
      
      if (response.data.success) {
        // Refresh products list
        fetchProducts();
        // Close modal
        setShowAddEditModal(false);
      } else {
        alert(response.data.message || 'Failed to save product');
      }
    } catch (err) {
      console.error('Error saving product:', err);
      alert(err.response?.data?.message || err.message || 'Failed to save product');
    }
  };
  
  // Handle product delete
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/wm/products/${productToDelete}`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        // Refresh products list
        fetchProducts();
        // Close confirmation dialog
        setShowDeleteConfirm(false);
        setProductToDelete(null);
      } else {
        alert(response.data.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert(err.response?.data?.message || err.message || 'Failed to delete product');
    }
  };
  
  // Handle QR scanning
  const handleScanProduct = () => {
    setShowScanModal(true);
  };
  
  // Handle scanned item
  const handleItemDetected = async (scanResult) => {
    try {
      // Here you would typically lookup the product by QR code/barcode
      alert(`Item detected: ${scanResult}`);
      setShowScanModal(false);
      
      // For now, let's just close the modal
      // In a real implementation, you'd fetch the product details and show them
    } catch (err) {
      console.error('Error processing scanned item:', err);
      alert('Failed to process scanned item');
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <div className="flex gap-2">
          <button
            onClick={handleScanProduct}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaSyncAlt className="mr-2 -ml-1" />
            Scan Item
          </button>
          <button
            onClick={handleAddProduct}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-2 -ml-1" />
            Add New Item
          </button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-48">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  value={filterCategory}
                  onChange={handleCategoryFilterChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
          <div className="flex items-center">
            <FaExclamationTriangle className="mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}
      
      {/* Products Table */}
      <InventoryTable
        products={products}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onView={handleViewProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteClick}
        loading={isLoading}
      />
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              const pageNum = currentPage <= 3
                ? i + 1
                : currentPage >= totalPages - 2
                  ? totalPages - 4 + i
                  : currentPage - 2 + i;
              
              if (pageNum <= 0 || pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {/* Add/Edit Product Modal */}
      {showAddEditModal && (
        <AddEditItemModal
          item={currentProduct}
          onSave={handleSaveProduct}
          onClose={() => setShowAddEditModal(false)}
        />
      )}
      
      {/* Product Details Modal */}
      {showDetailsModal && (
        <ItemDetailsModal
          product={currentProduct}
          onEdit={() => {
            setShowDetailsModal(false);
            setShowAddEditModal(true);
          }}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
      
      {/* Scan Modal */}
      {showScanModal && (
        <ScanItemModal
          onItemDetected={handleItemDetected}
          onClose={() => setShowScanModal(false)}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-red-600 text-white px-6 py-4">
              <h2 className="text-xl font-semibold">Confirm Delete</h2>
            </div>
            <div className="p-6">
              <p className="mb-4">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
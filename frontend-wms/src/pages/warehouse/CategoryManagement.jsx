// Path: frontend-wms/src/pages/warehouse/CategoryManagement.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaPlus, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import CategoryTable from '../../components/warehouse/categories/CategoryTable';
import AddEditCategoryModal from '../../components/warehouse/categories/AddEditCategoryModal';

const CategoryManagement = () => {
  const { currentUser } = useContext(AuthContext);
  
  // State
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  
  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);
  
  // Fetch categories from API
  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        'http://localhost:8000/api/wm/categories',
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
  
  // Open modal for creating a new category
  const handleAddCategory = () => {
    setCurrentCategory(null);
    setShowModal(true);
  };
  
  // Open modal for editing a category
  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setShowModal(true);
  };
  
  // Handle view details (same as edit for now)
  const handleViewCategory = (category) => {
    setCurrentCategory(category);
    setShowModal(true);
  };
  
  // Show delete confirmation
  const handleDeleteClick = (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowDeleteConfirm(true);
  };
  
  // Handle category create or update
  const handleSaveCategory = async (categoryData) => {
    try {
      let response;
      
      if (currentCategory) {
        // Update existing category
        response = await axios.put(
          `http://localhost:8000/api/wm/categories/${currentCategory.id}`,
          categoryData,
          { withCredentials: true }
        );
      } else {
        // Create new category
        response = await axios.post(
          'http://localhost:8000/api/wm/categories',
          categoryData,
          { withCredentials: true }
        );
      }
      
      if (response.data.success) {
        // Refresh categories list
        fetchCategories();
        // Close modal
        setShowModal(false);
      } else {
        alert(response.data.message || 'Failed to save category');
      }
    } catch (err) {
      console.error('Error saving category:', err);
      alert(err.response?.data?.message || err.message || 'Failed to save category');
    }
  };
  
  // Handle category delete
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/wm/categories/${categoryToDelete}`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        // Refresh categories list
        fetchCategories();
        // Close confirmation dialog
        setShowDeleteConfirm(false);
        setCategoryToDelete(null);
      } else {
        alert(response.data.message || 'Failed to delete category');
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      alert(err.response?.data?.message || err.message || 'Failed to delete category');
    }
  };
  
  // Filter and sort categories
  const filteredCategories = categories
    .filter((category) => {
      // Filter by search term
      return category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()));
    })
    .sort((a, b) => {
      // Sort by field
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'description') {
        comparison = (a.description || '').localeCompare(b.description || '');
      } else if (sortField === 'fields') {
        const aCount = a.fields ? Object.keys(a.fields).length : 0;
        const bCount = b.fields ? Object.keys(b.fields).length : 0;
        comparison = aCount - bCount;
      } else if (sortField === 'createdAt') {
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
      }
      
      // Apply sort direction
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
        <button
          onClick={handleAddCategory}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaPlus className="mr-2 -ml-1" />
          Add New Category
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow">
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
                placeholder="Search categories..."
              />
            </div>
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
      
      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        /* Categories Table */
        <CategoryTable
          categories={filteredCategories}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onView={handleViewCategory}
          onEdit={handleEditCategory}
          onDelete={handleDeleteClick}
        />
      )}
      
      {/* Add/Edit Category Modal */}
      {showModal && (
        <AddEditCategoryModal
          category={currentCategory}
          onSave={handleSaveCategory}
          onClose={() => setShowModal(false)}
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
              <p className="mb-4">Are you sure you want to delete this category? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCategory}
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

export default CategoryManagement;
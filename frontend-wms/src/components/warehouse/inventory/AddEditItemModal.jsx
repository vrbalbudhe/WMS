// Path: frontend-wms/src/components/warehouse/inventory/AddEditItemModal.jsx
import React, { useState, useEffect, useContext } from 'react';
import { FaTimes, FaSave, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';

const AddEditItemModal = ({ item, onSave, onClose }) => {
  const { currentUser } = useContext(AuthContext);
  
  // States
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    categoryId: '',
    warehouseId: currentUser?.warehouseId || '',
    quantity: 0,
    minStockLevel: 0,
    customFields: {}
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryFields, setCategoryFields] = useState([]);
  
  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);
  
  // When item prop changes (for edit mode)
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        sku: item.sku || '',
        categoryId: item.categoryId || '',
        warehouseId: item.warehouseId || currentUser?.warehouseId || '',
        quantity: item.quantity || 0,
        minStockLevel: item.minStockLevel || 0,
        customFields: item.customFields || {}
      });
      
      // If category already selected, fetch its fields
      if (item.categoryId) {
        fetchCategoryFields(item.categoryId);
      }
    }
  }, [item, currentUser]);
  
  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'http://localhost:8000/api/wm/categories', 
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        setError('Failed to load categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('An error occurred while loading categories');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch fields for selected category
  const fetchCategoryFields = async (categoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/wm/categories/${categoryId}`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        const category = response.data.data;
        setSelectedCategory(category);
        
        // Transform fields object to array for easier rendering
        if (category.fields) {
          const fieldsArray = Object.entries(category.fields).map(([name, config]) => ({
            name,
            ...config
          }));
          setCategoryFields(fieldsArray);
          
          // Initialize custom fields if in create mode
          if (!item) {
            const initialCustomFields = {};
            fieldsArray.forEach(field => {
              // Set default values based on field type
              if (field.type === 'number') {
                initialCustomFields[field.name] = 0;
              } else if (field.type === 'checkbox') {
                initialCustomFields[field.name] = false;
              } else if (field.type === 'dropdown' && field.options && field.options.length > 0) {
                initialCustomFields[field.name] = field.options[0];
              } else {
                initialCustomFields[field.name] = '';
              }
            });
            
            setFormData(prev => ({
              ...prev,
              customFields: initialCustomFields
            }));
          }
        } else {
          setCategoryFields([]);
        }
      } else {
        setError('Failed to load category details');
        setCategoryFields([]);
      }
    } catch (err) {
      console.error('Error fetching category details:', err);
      setError('An error occurred while loading category details');
      setCategoryFields([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle basic input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let updatedValue = value;
    
    // Convert numeric fields to numbers
    if (type === 'number') {
      updatedValue = value === '' ? 0 : parseInt(value, 10);
    }
    
    // If changing category, fetch its fields
    if (name === 'categoryId' && value) {
      fetchCategoryFields(value);
    }
    
    setFormData({
      ...formData,
      [name]: updatedValue
    });
  };
  
  // Handle custom field changes
  const handleCustomFieldChange = (fieldName, value, type) => {
    let processedValue = value;
    
    // Convert value based on field type
    if (type === 'number') {
      processedValue = value === '' ? 0 : parseInt(value, 10);
    } else if (type === 'checkbox') {
      processedValue = value;
    }
    
    setFormData({
      ...formData,
      customFields: {
        ...formData.customFields,
        [fieldName]: processedValue
      }
    });
  };
  
  // Validate form before submission
  const validateForm = () => {
    // Basic validation
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    
    if (!formData.categoryId) {
      setError('Please select a category');
      return false;
    }
    
    if (!formData.warehouseId) {
      setError('Warehouse is required');
      return false;
    }
    
    // Validate required custom fields
    const missingRequiredFields = categoryFields
      .filter(field => field.isRequired)
      .filter(field => {
        const value = formData.customFields[field.name];
        if (value === undefined || value === null || value === '') {
          return true;
        }
        return false;
      })
      .map(field => field.name);
    
    if (missingRequiredFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingRequiredFields.join(', ')}`);
      return false;
    }
    
    return true;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }
    
    onSave(formData);
  };
  
  // Render custom field based on its type
  const renderCustomField = (field) => {
    const value = formData.customFields[field.name] !== undefined 
      ? formData.customFields[field.name] 
      : '';
    
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleCustomFieldChange(field.name, e.target.value, field.type)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleCustomFieldChange(field.name, e.target.value, field.type)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleCustomFieldChange(field.name, e.target.value, field.type)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => handleCustomFieldChange(field.name, e.target.checked, field.type)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        );
      
      case 'dropdown':
        return (
          <select
            value={value}
            onChange={(e) => handleCustomFieldChange(field.name, e.target.value, field.type)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an option</option>
            {field.options && field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleCustomFieldChange(field.name, e.target.value, 'text')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        );
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {item ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6">
          {/* Error message */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
              <p>{error}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information Section */}
            <div className="col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Information</h3>
            </div>
            
            {/* Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter item name"
              />
            </div>
            
            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., ITM-12345"
              />
            </div>
            
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Min Stock Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Stock Level
              </label>
              <input
                type="number"
                name="minStockLevel"
                min="0"
                value={formData.minStockLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">Alert will trigger when quantity falls below this level</p>
            </div>
            
            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product description"
              ></textarea>
            </div>
            
            {/* Custom Fields Section */}
            {categoryFields.length > 0 && (
              <>
                <div className="col-span-2 border-t pt-4 mt-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {selectedCategory?.name} Fields
                  </h3>
                </div>
                
                {categoryFields.map((field) => (
                  <div key={field.name} className={field.type === 'checkbox' ? 'flex items-center' : ''}>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${field.type === 'checkbox' ? 'order-2 ml-2' : ''}`}>
                      {field.name} {field.isRequired && <span className="text-red-500">*</span>}
                    </label>
                    <div className={field.type === 'checkbox' ? 'order-1' : 'w-full'}>
                      {renderCustomField(field)}
                    </div>
                  </div>
                ))}
              </>
            )}
            
            {/* Loading spinner for category fields */}
            {loading && (
              <div className="col-span-2 flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
        </form>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaSave className="mr-2" /> 
            {item ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditItemModal;
import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaTrash } from 'react-icons/fa';

const AddEditItemModal = ({ item, categories, suppliers, onSave, onClose }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    location: '',
    quantity: 0,
    minStock: 0,
    supplier: '',
    status: 'In Stock',
    lastUpdated: new Date().toISOString().split('T')[0]
  });
  
  // When item prop changes, update form state
  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    
    // Convert numeric fields to numbers
    if (name === 'quantity' || name === 'minStock') {
      updatedValue = value === '' ? 0 : parseInt(value, 10);
    }
    
    // Update status based on quantity
    let updatedFormData = {
      ...formData,
      [name]: updatedValue
    };
    
    if (name === 'quantity') {
      if (updatedValue === 0) {
        updatedFormData.status = 'Out of Stock';
      } else if (updatedValue < updatedFormData.minStock) {
        updatedFormData.status = 'Low Stock';
      } else {
        updatedFormData.status = 'In Stock';
      }
    }
    
    setFormData(updatedFormData);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  // Handle "Enter" key to submit form
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {item ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item ID - shown only for edit mode */}
            {item && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item ID
                </label>
                <input
                  type="text"
                  value={formData.id}
                  disabled
                  className="bg-gray-100 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="mt-1 text-xs text-gray-500">Item ID cannot be changed</p>
              </div>
            )}
            
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter item name"
              />
            </div>
            
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* Supplier */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier *
              </label>
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select a supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier} value={supplier}>
                    {supplier}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Warehouse A, Shelf 5"
              />
            </div>
            
            {/* Current Quantity */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            {/* Min Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Stock Level *
              </label>
              <input
                type="number"
                name="minStock"
                min="0"
                value={formData.minStock}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
              <p className="mt-1 text-xs text-gray-500">Alert will trigger when quantity falls below this level</p>
            </div>
            
            {/* Status (calculated automatically) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <input
                type="text"
                value={formData.status}
                disabled
                className="bg-gray-100 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <p className="mt-1 text-xs text-gray-500">Status is determined automatically based on quantity</p>
            </div>
          </div>
        </form>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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
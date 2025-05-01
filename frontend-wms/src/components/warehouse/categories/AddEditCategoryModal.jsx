// Path: frontend-wms/src/components/warehouse/categories/AddEditCategoryModal.jsx
import React, { useState, useEffect, useContext } from 'react';
import { FaTimes, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthContext';

const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'checkbox', label: 'Checkbox' }
];

const AddEditCategoryModal = ({ category, onSave, onClose }) => {
  // Get user context
  const { currentUser } = useContext(AuthContext);
  
  // Initialize state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fields: [] // Array of field objects
  });
  
  // For dropdown options
  const [currentField, setCurrentField] = useState({
    name: '',
    type: 'text',
    isRequired: false,
    options: [] // For dropdown type
  });
  
  const [currentOption, setCurrentOption] = useState('');
  
  // When category prop changes, update form state
  useEffect(() => {
    if (category) {
      // Transform fields object into array for easier management in UI
      const fieldsArray = category.fields 
        ? Object.entries(category.fields).map(([name, config]) => ({
            name,
            ...config
          })) 
        : [];
      
      setFormData({
        name: category.name || '',
        description: category.description || '',
        fields: fieldsArray
      });
    }
  }, [category]);
  
  // Handle basic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle current field form changes
  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentField({
      ...currentField,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Reset options if field type is changed from dropdown
    if (name === 'type' && value !== 'dropdown' && currentField.type === 'dropdown') {
      setCurrentField(prev => ({
        ...prev,
        options: []
      }));
    }
  };
  
  // Add new field to fields array
  const addField = () => {
    // Validate field
    if (!currentField.name.trim()) {
      alert('Field name is required');
      return;
    }
    
    // Check for duplicate field name
    if (formData.fields.some(field => field.name === currentField.name)) {
      alert('Field name must be unique');
      return;
    }
    
    // Add field to form data
    setFormData({
      ...formData,
      fields: [...formData.fields, { ...currentField }]
    });
    
    // Reset current field form
    setCurrentField({
      name: '',
      type: 'text',
      isRequired: false,
      options: []
    });
  };
  
  // Remove field from fields array
  const removeField = (index) => {
    const updatedFields = [...formData.fields];
    updatedFields.splice(index, 1);
    setFormData({
      ...formData,
      fields: updatedFields
    });
  };
  
  // Add option to current field (for dropdown type)
  const addOption = () => {
    if (!currentOption.trim()) {
      alert('Option cannot be empty');
      return;
    }
    
    if (currentField.options.includes(currentOption)) {
      alert('Option must be unique');
      return;
    }
    
    setCurrentField({
      ...currentField,
      options: [...currentField.options, currentOption]
    });
    
    setCurrentOption('');
  };
  
  // Remove option from current field
  const removeOption = (index) => {
    const updatedOptions = [...currentField.options];
    updatedOptions.splice(index, 1);
    setCurrentField({
      ...currentField,
      options: updatedOptions
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }
    
    // Transform fields array back to object for storage
    const fieldsObject = formData.fields.reduce((obj, field) => {
      const { name, ...config } = field;
      obj[name] = config;
      return obj;
    }, {});
    
    // Prepare data for saving
    const categoryData = {
      ...formData,
      fields: fieldsObject,
      // User ID will be added by the backend from the auth token
    };
    
    onSave(categoryData);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {category ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category name"
                />
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category description"
                ></textarea>
              </div>
              
              {/* Display current user info */}
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">
                  Changes will be tracked under user: {currentUser?.name || 'Unknown'} 
                  {currentUser?.email && ` (${currentUser.email})`}
                </p>
              </div>
            </div>
            
            {/* Custom Fields */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Custom Fields</h3>
              
              {/* Existing Fields */}
              {formData.fields.length > 0 && (
                <div className="bg-gray-50 rounded-md p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Defined Fields</h4>
                  <div className="space-y-2">
                    {formData.fields.map((field, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-2 border border-gray-200 rounded bg-white"
                      >
                        <div>
                          <span className="font-medium">{field.name}</span>
                          <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded bg-gray-100">
                              {FIELD_TYPES.find(t => t.value === field.type)?.label || field.type}
                            </span>
                            {field.isRequired && (
                              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                                Required
                              </span>
                            )}
                            {field.options && field.options.length > 0 && (
                              <span className="px-2 py-0.5 rounded bg-green-100 text-green-800">
                                {field.options.length} options
                              </span>
                            )}
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => removeField(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add New Field Form */}
              <div className="bg-blue-50 rounded-md p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Field</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Field Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Field Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={currentField.name}
                        onChange={handleFieldChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Weight, Color, Size"
                      />
                    </div>
                    
                    {/* Field Type */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Field Type
                      </label>
                      <select
                        name="type"
                        value={currentField.type}
                        onChange={handleFieldChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        {FIELD_TYPES.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Required Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isRequired"
                      id="isRequired"
                      checked={currentField.isRequired}
                      onChange={handleFieldChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isRequired" className="ml-2 text-sm text-gray-700">
                      This field is required
                    </label>
                  </div>
                  
                  {/* Options for dropdown type */}
                  {currentField.type === 'dropdown' && (
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Dropdown Options
                      </label>
                      
                      {/* Option Input */}
                      <div className="flex mb-2">
                        <input
                          type="text"
                          value={currentOption}
                          onChange={(e) => setCurrentOption(e.target.value)}
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter option"
                        />
                        <button
                          type="button"
                          onClick={addOption}
                          className="px-3 py-2 bg-blue-100 text-blue-600 rounded-r-md hover:bg-blue-200"
                        >
                          Add
                        </button>
                      </div>
                      
                      {/* Options List */}
                      {currentField.options.length > 0 && (
                        <div className="mt-2 p-2 border border-gray-200 rounded bg-white">
                          <div className="text-xs font-medium text-gray-700 mb-1">
                            Current Options:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {currentField.options.map((option, index) => (
                              <div 
                                key={index}
                                className="flex items-center bg-gray-100 text-gray-800 text-xs rounded-full px-2 py-1"
                              >
                                {option}
                                <button
                                  type="button"
                                  onClick={() => removeOption(index)}
                                  className="ml-1 text-gray-500 hover:text-gray-700"
                                >
                                  <FaTimes size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Add Field Button */}
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={addField}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaPlus className="mr-2" /> Add Field
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
            {category ? 'Update Category' : 'Create Category'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditCategoryModal;
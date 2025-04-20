// Path: frontend-wms/src/components/admin/adminSections/Warehouse/WarehouseFieldSettings.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const WarehouseFieldSettings = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'text',
    isRequired: false,
    options: []
  });
  const [editingField, setEditingField] = useState(null);
  const [option, setOption] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/fields');
      setFields(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching fields:', error);
      setError('Failed to load custom fields. Please try again.');
      setLoading(false);
      setFields([]);
    }
  };
  

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'text',
      isRequired: false,
      options: []
    });
    setFormErrors({});
    setOption('');
    setEditingField(null);
  };

  const handleCreateClick = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditClick = (field) => {
    setFormData({
      name: field.name,
      type: field.type,
      isRequired: field.isRequired,
      options: [...field.options]
    });
    setEditingField(field);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (field) => {
    setFieldToDelete(field);
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    try {
      console.log('Deleting field with ID:', fieldToDelete.id);
      // Make sure this URL matches your backend route
      await axios.delete(`/api/admin/fields/${fieldToDelete.id}`);
      setFields(fields.filter(f => f.id !== fieldToDelete.id));
      setIsDeleting(false);
      setFieldToDelete(null);
    } catch (error) {
      console.error('Error deleting field:', error);
      // More detailed error logging
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      alert('Failed to delete field. Please try again.');
      setIsDeleting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleAddOption = () => {
    if (!option.trim()) return;
    
    if (formData.options.includes(option.trim())) {
      setFormErrors({
        ...formErrors,
        options: 'This option already exists'
      });
      return;
    }

    setFormData({
      ...formData,
      options: [...formData.options, option.trim()]
    });
    setOption('');
    
    if (formErrors.options) {
      setFormErrors({
        ...formErrors,
        options: ''
      });
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...formData.options];
    newOptions.splice(index, 1);
    setFormData({
      ...formData,
      options: newOptions
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Field name is required';
    }

    if (formData.type === 'dropdown' && formData.options.length === 0) {
      errors.options = 'At least one option is required for dropdown fields';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      if (editingField) {
        // Update existing field
        await axios.put(`/api/admin/fields/${editingField.id}`, formData);
      } else {
        // Create new field
        await axios.post('/api/admin/fields', formData);
      }
  
      fetchFields();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving field:', error);
      
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Failed to save field. Please try again.');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading custom fields...</div>;

  if (error) return <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center p-6 border-b">
        <h1 className="text-2xl font-semibold text-gray-800">Warehouse Field Settings</h1>
        <button
          onClick={handleCreateClick}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Add New Field
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No custom fields found. Click "Add New Field" to create one.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fields.map((field) => (
                <tr key={field.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{field.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{field.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {field.isRequired ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {field.type === 'dropdown' ? (
                      <div className="max-w-xs">
                        {field.options.join(', ')}
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(field)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FaEdit className="inline-block" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(field)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="inline-block" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Field Creation/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {editingField ? 'Edit Field' : 'Add New Field'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Field Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      formErrors.name ? 'border-red-500' : ''
                    }`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Field Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isRequired"
                    name="isRequired"
                    checked={formData.isRequired}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isRequired" className="ml-2 block text-sm text-gray-700">
                    This field is required
                  </label>
                </div>

                {formData.type === 'dropdown' && (
                  <div>
                    <label htmlFor="options" className="block text-sm font-medium text-gray-700">
                      Options <span className="text-red-500">*</span>
                    </label>
                    <div className="flex mt-1">
                      <input
                        type="text"
                        id="option"
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                        className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Add an option"
                      />
                      <button
                        type="button"
                        onClick={handleAddOption}
                        className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    {formErrors.options && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.options}</p>
                    )}
                    
                    {formData.options.length > 0 && (
                      <div className="mt-2">
                        <ul className="bg-gray-50 rounded-md p-2">
                          {formData.options.map((opt, index) => (
                            <li key={index} className="flex justify-between items-center py-1">
                              <span className="text-sm">{opt}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveOption(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                &times;
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingField ? 'Update Field' : 'Add Field'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleting && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete the field "{fieldToDelete?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleting(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseFieldSettings;
// Path: frontend-wms/src/components/admin/adminSections/Warehouse/WarehouseModal.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WarehouseModal = ({ warehouse, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    googleMapLink: '',
    description: '',
    customFields: {}
  });
  const [errors, setErrors] = useState({});
  const [customFields, setCustomFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCustomFields();

    if (warehouse) {
      setFormData({
        name: warehouse.name || '',
        address: warehouse.address || '',
        city: warehouse.city || '',
        pincode: warehouse.pincode || '',
        googleMapLink: warehouse.googleMapLink || '',
        description: warehouse.description || '',
        customFields: warehouse.customFields || {}
      });
    }
  }, [warehouse]);

  const fetchCustomFields = async () => {
    try {
      setLoading(true);
      // Make sure this URL matches your backend route
      const response = await axios.get('/api/admin/warehouses/fields');
      console.log('Custom fields fetched:', response?.data); // Add this for debugging
      setCustomFields(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching custom fields:', error);
      setLoading(false);
      setCustomFields([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleCustomFieldChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      customFields: {
        ...formData.customFields,
        [field.name]: value
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';

    // Validate custom fields that are required
    customFields.forEach(field => {
      if (field.isRequired &&
        (!formData.customFields[field.name] ||
          formData.customFields[field.name].toString().trim() === '')) {
        newErrors[`custom_${field.name}`] = `${field.name} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      if (warehouse) {
        // Update existing warehouse
        await axios.put(`/api/admin/warehouses/${warehouse.id}`, formData);
      } else {
        // Create new warehouse
        await axios.post('/api/admin/warehouses', formData);
      }

      setSubmitting(false);
      onClose(true); // Close modal and refresh list
    } catch (error) {
      console.error('Error saving warehouse:', error);
      setSubmitting(false);

      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Failed to save warehouse. Please try again.');
      }
    }
  };

  // Render different input types based on field type
  const renderCustomField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            id={`custom_${field.name}`}
            value={formData.customFields[field.name] || ''}
            onChange={(e) => handleCustomFieldChange(e, field)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors[`custom_${field.name}`] ? 'border-red-500' : ''
              }`}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            id={`custom_${field.name}`}
            value={formData.customFields[field.name] || ''}
            onChange={(e) => handleCustomFieldChange(e, field)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors[`custom_${field.name}`] ? 'border-red-500' : ''
              }`}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            id={`custom_${field.name}`}
            value={formData.customFields[field.name] || ''}
            onChange={(e) => handleCustomFieldChange(e, field)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors[`custom_${field.name}`] ? 'border-red-500' : ''
              }`}
          />
        );
      case 'dropdown':
        return (
          <select
            id={`custom_${field.name}`}
            value={formData.customFields[field.name] || ''}
            onChange={(e) => handleCustomFieldChange(e, field)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors[`custom_${field.name}`] ? 'border-red-500' : ''
              }`}
          >
            <option value="">Select {field.name}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            id={`custom_${field.name}`}
            value={formData.customFields[field.name] || ''}
            onChange={(e) => handleCustomFieldChange(e, field)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors[`custom_${field.name}`] ? 'border-red-500' : ''
              }`}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {warehouse ? 'Edit Warehouse' : 'Create Warehouse'}
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Warehouse Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.address ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.city ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.pincode ? 'border-red-500' : ''
                      }`}
                  />
                  {errors.pincode && (
                    <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="googleMapLink" className="block text-sm font-medium text-gray-700">
                Google Map Link (Optional)
              </label>
              <input
                type="text"
                id="googleMapLink"
                name="googleMapLink"
                value={formData.googleMapLink}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Custom Fields */}
            {customFields.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {customFields.map((field) => (
                    <div key={field.id}>
                      <label htmlFor={`custom_${field.name}`} className="block text-sm font-medium text-gray-700">
                        {field.name} {field.isRequired && <span className="text-red-500">*</span>}
                      </label>
                      {renderCustomField(field)}
                      {errors[`custom_${field.name}`] && (
                        <p className="mt-1 text-sm text-red-500">{errors[`custom_${field.name}`]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {submitting ? 'Saving...' : warehouse ? 'Update Warehouse' : 'Create Warehouse'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default WarehouseModal;
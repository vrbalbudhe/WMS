import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const CreatePurchaseOrderModal = ({ order, onSave, onClose }) => {
  // Mock data for vendors and requests
  // In a real app, these would come from API calls
  const vendors = [
    { id: 'V-1001', name: 'Tech Supplies Inc.' },
    { id: 'V-1002', name: 'Office Essentials' },
    { id: 'V-1003', name: 'Global Hardware' },
    { id: 'V-1004', name: 'Premium Consultants' },
    { id: 'V-1006', name: 'Creative Design Agency' },
    { id: 'V-1007', name: 'Logistics Partners' },
    { id: 'V-1008', name: 'Data Security Solutions' },
    { id: 'V-1010', name: 'Eco-Friendly Packaging' }
  ];
  
  const requests = [
    { id: 'PR-2089', description: 'IT Equipment' },
    { id: 'PR-2088', description: 'Marketing Materials' },
    { id: 'PR-2087', description: 'Safety Supplies' },
    { id: 'PR-2086', description: 'Software Licenses' },
    { id: 'PR-2085', description: 'Office Supplies' },
    { id: 'PR-2084', description: 'Shipping Services' },
    { id: 'PR-2083', description: 'Packaging Materials' },
    { id: 'PR-2082', description: 'Consulting Services' }
  ];

  const initialItemState = { name: '', quantity: 1, unitPrice: 0, total: 0 };

  const [formData, setFormData] = useState({
    id: '',
    date: new Date().toISOString().split('T')[0],
    requestId: '',
    vendorId: '',
    vendorName: '',
    items: [{ ...initialItemState }],
    totalAmount: 0,
    status: 'Pending Approval',
    expectedDelivery: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // If editing an existing order, populate the form
  useEffect(() => {
    if (order) {
      setFormData({
        ...order
      });
    } else {
      // Set default expected delivery date to 2 weeks from now for new orders
      const twoWeeksFromNow = new Date();
      twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
      setFormData({
        ...formData,
        expectedDelivery: twoWeeksFromNow.toISOString().split('T')[0]
      });
    }
  }, [order]);
  
  // Calculate item total when quantity or unit price changes
  const calculateItemTotal = (item) => {
    return item.quantity * item.unitPrice;
  };
  
  // Calculate order total from all items
  const calculateOrderTotal = (items) => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'vendorId') {
      const selectedVendor = vendors.find(v => v.id === value);
      setFormData({
        ...formData,
        vendorId: value,
        vendorName: selectedVendor ? selectedVendor.name : ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field if any
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };
  
  // Handle item field changes
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    
    // Update the specific field
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'quantity' || field === 'unitPrice' ? parseFloat(value) || 0 : value
    };
    
    // Recalculate the total for this item
    newItems[index].total = calculateItemTotal(newItems[index]);
    
    // Update form data with new items and total amount
    setFormData({
      ...formData,
      items: newItems,
      totalAmount: calculateOrderTotal(newItems)
    });
    
    // Clear error for this item if any
    if (errors[`items[${index}].${field}`]) {
      setErrors({
        ...errors,
        [`items[${index}].${field}`]: undefined
      });
    }
  };
  
  // Add a new item
  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { ...initialItemState }]
    });
  };
  
  // Remove an item
  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    
    setFormData({
      ...formData,
      items: newItems,
      totalAmount: calculateOrderTotal(newItems)
    });
  };
  
  // Validate the form
  const validate = () => {
    const newErrors = {};
    
    if (!formData.vendorId) {
      newErrors.vendorId = 'Vendor is required';
    }
    
    if (!formData.requestId) {
      newErrors.requestId = 'Request ID is required';
    }
    
    if (!formData.expectedDelivery) {
      newErrors.expectedDelivery = 'Expected delivery date is required';
    }
    
    // Validate items
    formData.items.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`items[${index}].name`] = 'Item name is required';
      }
      
      if (item.quantity <= 0) {
        newErrors[`items[${index}].quantity`] = 'Quantity must be greater than 0';
      }
      
      if (item.unitPrice <= 0) {
        newErrors[`items[${index}].unitPrice`] = 'Unit price must be greater than 0';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSave(formData);
    }
  };
  
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {order ? 'Edit Purchase Order' : 'Create Purchase Order'}
              </h3>
              
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                {/* Request ID */}
                <div>
                  <label htmlFor="requestId" className="block text-sm font-medium text-gray-700">
                    Request ID *
                  </label>
                  <select
                    id="requestId"
                    name="requestId"
                    value={formData.requestId}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.requestId ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    disabled={order && order.status !== 'Pending Approval'}
                  >
                    <option value="">Select a Request</option>
                    {requests.map(request => (
                      <option key={request.id} value={request.id}>
                        {request.id} - {request.description}
                      </option>
                    ))}
                  </select>
                  {errors.requestId && (
                    <p className="mt-1 text-sm text-red-600">{errors.requestId}</p>
                  )}
                </div>
                
                {/* Vendor */}
                <div>
                  <label htmlFor="vendorId" className="block text-sm font-medium text-gray-700">
                    Vendor *
                  </label>
                  <select
                    id="vendorId"
                    name="vendorId"
                    value={formData.vendorId}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.vendorId ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    disabled={order && order.status !== 'Pending Approval'}
                  >
                    <option value="">Select a Vendor</option>
                    {vendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                  {errors.vendorId && (
                    <p className="mt-1 text-sm text-red-600">{errors.vendorId}</p>
                  )}
                </div>
                
                {/* Expected Delivery */}
                <div>
                  <label htmlFor="expectedDelivery" className="block text-sm font-medium text-gray-700">
                    Expected Delivery *
                  </label>
                  <input
                    type="date"
                    name="expectedDelivery"
                    id="expectedDelivery"
                    value={formData.expectedDelivery}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.expectedDelivery ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.expectedDelivery && (
                    <p className="mt-1 text-sm text-red-600">{errors.expectedDelivery}</p>
                  )}
                </div>
                
                {/* Status - shown only when editing */}
                {order && (
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <input
                      type="text"
                      name="status"
                      id="status"
                      value={formData.status}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 sm:text-sm"
                      disabled
                    />
                  </div>
                )}
                
                {/* Notes */}
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {/* Items Table */}
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-2">Order Items</h4>
                
                <div className="overflow-x-auto border border-gray-300 rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item *
                        </th>
                        <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                          Qty *
                        </th>
                        <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px' }}>
                          Unit Price *
                        </th>
                        <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px' }}>
                          Total
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '60px' }}>
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              className={`block w-full border ${errors[`items[${index}].name`] ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                              value={item.name}
                              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                              placeholder="Item description"
                              disabled={order && order.status !== 'Pending Approval'}
                            />
                            {errors[`items[${index}].name`] && (
                              <p className="mt-1 text-xs text-red-600">{errors[`items[${index}].name`]}</p>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              min="1"
                              step="1"
                              className={`block w-full text-right border ${errors[`items[${index}].quantity`] ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                              disabled={order && order.status !== 'Pending Approval'}
                            />
                            {errors[`items[${index}].quantity`] && (
                              <p className="mt-1 text-xs text-red-600">{errors[`items[${index}].quantity`]}</p>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              className={`block w-full text-right border ${errors[`items[${index}].unitPrice`] ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                              value={item.unitPrice}
                              onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                              disabled={order && order.status !== 'Pending Approval'}
                            />
                            {errors[`items[${index}].unitPrice`] && (
                              <p className="mt-1 text-xs text-red-600">{errors[`items[${index}].unitPrice`]}</p>
                            )}
                          </td>
                          <td className="px-3 py-2 text-right text-sm text-gray-900">
                            {formatCurrency(item.total)}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {(formData.items.length > 1 && (order ? order.status === 'Pending Approval' : true)) && (
                              <button
                                type="button"
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleRemoveItem(index)}
                              >
                                <FaTrash size={14} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      
                      {/* Add item button row */}
                      {(!order || order.status === 'Pending Approval') && (
                        <tr>
                          <td colSpan="5" className="px-3 py-2">
                            <button
                              type="button"
                              onClick={handleAddItem}
                              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900"
                            >
                              <FaPlus className="mr-1" size={12} /> Add Item
                            </button>
                          </td>
                        </tr>
                      )}
                      
                      {/* Total row */}
                      <tr className="bg-gray-50 font-medium">
                        <td colSpan="3" className="px-3 py-2 text-right text-sm">
                          Order Total:
                        </td>
                        <td className="px-3 py-2 text-right text-sm">
                          {formatCurrency(formData.totalAmount)}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-4">
                Fields marked with * are required
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                <FaSave className="mr-2" /> {order ? 'Update Order' : 'Create Order'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchaseOrderModal;
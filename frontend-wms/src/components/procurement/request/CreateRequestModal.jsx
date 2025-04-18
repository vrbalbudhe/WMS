import React, { useState } from 'react';
import { FaTimes, FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const CreateRequestModal = ({ departments, onSave, onClose }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    requestedBy: '',
    department: '',
    priority: 'Medium',
    notes: '',
    items: []
  });
  
  // State for current item being added
  const [currentItem, setCurrentItem] = useState({
    name: '',
    quantity: 1,
    estimatedCost: 0
  });
  
  // Calculate total amount
  const totalAmount = formData.items.reduce(
    (sum, item) => sum + (item.quantity * item.estimatedCost), 
    0
  );
  
  // Handle input changes for main form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle input changes for current item
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    // Convert to number for numeric fields
    const updatedValue = name === 'quantity' || name === 'estimatedCost' 
      ? parseFloat(value) || 0 
      : value;
      
    setCurrentItem({
      ...currentItem,
      [name]: updatedValue
    });
  };
  
  // Add current item to items list
  const handleAddItem = () => {
    if (!currentItem.name || currentItem.quantity < 1 || currentItem.estimatedCost <= 0) {
      return; // Validate item data
    }
    
    setFormData({
      ...formData,
      items: [...formData.items, { ...currentItem }]
    });
    
    // Reset current item
    setCurrentItem({
      name: '',
      quantity: 1,
      estimatedCost: 0
    });
  };
  
  // Remove item from items list
  const handleRemoveItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.requestedBy || !formData.department || formData.items.length === 0) {
      alert('Please fill in all required fields and add at least one item.');
      return;
    }
    
    // Prepare request data
    const requestData = {
      ...formData,
      status: 'Pending Approval',
      totalAmount: totalAmount
    };
    
    onSave(requestData);
  };
  
  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Purchase Request</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Requester */}
            <div>
              <label htmlFor="requestedBy" className="block text-sm font-medium text-gray-700 mb-1">
                Requested By *
              </label>
              <input
                type="text"
                id="requestedBy"
                name="requestedBy"
                value={formData.requestedBy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
                required
              />
            </div>
            
            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            
            {/* Notes */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional information about this request"
              ></textarea>
            </div>
          </div>
          
          {/* Items Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Request Items</h3>
            
            {/* Add Item Form */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    name="name"
                    value={currentItem.name}
                    onChange={handleItemChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Laptop, Office Chair"
                  />
                </div>
                
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={currentItem.quantity}
                    onChange={handleItemChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="estimatedCost" className="block text-sm font-medium text-gray-700 mb-1">
                    Est. Cost (per unit)
                  </label>
                  <input
                    type="number"
                    id="estimatedCost"
                    name="estimatedCost"
                    value={currentItem.estimatedCost}
                    onChange={handleItemChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="md:col-span-4 flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaPlus className="mr-2" /> Add Item
                  </button>
                </div>
              </div>
            </div>
            
            {/* Items List */}
            {formData.items.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit Cost
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(item.estimatedCost)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(item.quantity * item.estimatedCost)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                        Total Amount:
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(totalAmount)}
                      </td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500">No items added yet. Add items to create a request.</p>
              </div>
            )}
          </div>
        </form>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={formData.items.length === 0}
          >
            <FaSave className="mr-2" /> Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRequestModal;
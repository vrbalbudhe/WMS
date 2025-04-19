import React, { useState } from 'react';
import { FaTimes, FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const CreateShipmentModal = ({ carriers, onSave, onClose }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Outbound',
    destination: '',
    origin: '',
    status: 'Processing',
    carrier: '',
    trackingNumber: '',
    expectedDelivery: '',
    customer: '',
    notes: '',
    items: []
  });
  
  // State for item being added
  const [currentItem, setCurrentItem] = useState({
    id: '',
    name: '',
    quantity: 1,
    sku: ''
  });
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Handle item input changes
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prevItem => ({
      ...prevItem,
      [name]: name === 'quantity' ? (parseInt(value) || 0) : value
    }));
  };
  
  // Add item to shipment
  const handleAddItem = () => {
    if (!currentItem.name) return;
    
    // Generate a random ID if not provided
    const itemWithId = currentItem.id 
      ? currentItem 
      : { ...currentItem, id: `ITEM-${Math.floor(1000 + Math.random() * 9000)}` };
    
    setFormData(prevData => ({
      ...prevData,
      items: [...prevData.items, itemWithId]
    }));
    
    // Reset current item
    setCurrentItem({
      id: '',
      name: '',
      quantity: 1,
      sku: ''
    });
  };
  
  // Remove item from shipment
  const handleRemoveItem = (itemId) => {
    setFormData(prevData => ({
      ...prevData,
      items: prevData.items.filter(item => item.id !== itemId)
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate total items
    const totalItems = formData.items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Prepare shipment data
    const shipmentData = {
      ...formData,
      items: totalItems,
      lastUpdated: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().substring(0, 5)
    };
    
    onSave(shipmentData);
  };
  
  // Warehouse locations for dropdown
  const warehouseLocations = [
    'Warehouse A, New Jersey',
    'Warehouse B, Atlanta',
    'Warehouse C, Dallas',
    'Warehouse D, Seattle'
  ];
  
  // Common destinations for dropdown
  const commonDestinations = [
    'Main Store, New York',
    'North Branch, Boston',
    'South Branch, Miami',
    'East Branch, Philadelphia',
    'West Branch, Los Angeles'
  ];
  
  // Carriers list with fallback
  const carriersList = carriers && carriers.length > 0 
    ? carriers 
    : ['FastExpress', 'Global Logistics', 'Reliable Transport'];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create New Shipment</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment Details</h3>
              
              {/* Shipment Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipment Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Outbound">Outbound</option>
                  <option value="Inbound">Inbound</option>
                </select>
              </div>
              
              {/* Origin */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origin *
                </label>
                <select
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Origin</option>
                  {formData.type === 'Outbound' 
                    ? warehouseLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))
                    : [...commonDestinations, 'Other'].map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))
                  }
                </select>
              </div>
              
              {/* Destination */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination *
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Destination</option>
                  {formData.type === 'Outbound' 
                    ? [...commonDestinations, 'Other'].map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))
                    : warehouseLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))
                  }
                </select>
              </div>
              
              {/* Customer */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer/Department *
                </label>
                <input
                  type="text"
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Retail Division"
                />
              </div>
              
              {/* Notes */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any special instructions or notes"
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Details</h3>
              
              {/* Ship Date */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ship Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Expected Delivery */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Delivery *
                </label>
                <input
                  type="date"
                  name="expectedDelivery"
                  value={formData.expectedDelivery}
                  onChange={handleChange}
                  required
                  min={formData.date}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Carrier */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carrier *
                </label>
                <select
                  name="carrier"
                  value={formData.carrier}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Carrier</option>
                  {carriersList.map(carrier => (
                    <option key={carrier} value={carrier}>{carrier}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              
              {/* Tracking Number */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tracking Number
                </label>
                <input
                  type="text"
                  name="trackingNumber"
                  value={formData.trackingNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., FE-123456789"
                />
              </div>
            </div>
          </div>
          
          {/* Items Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment Items</h3>
            
            {/* Add Item Form */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentItem.name}
                    onChange={handleItemChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Office Chair"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={currentItem.sku}
                    onChange={handleItemChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., SKU-12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={currentItem.quantity}
                    onChange={handleItemChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaPlus className="mr-2" /> Add Item
                  </button>
                </div>
              </div>
            </div>
            
            {/* Items List */}
            {formData.items.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SKU
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.items.map(item => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.sku}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500">No items added yet. Add items to create a shipment.</p>
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
            <FaSave className="mr-2" /> Create Shipment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateShipmentModal;
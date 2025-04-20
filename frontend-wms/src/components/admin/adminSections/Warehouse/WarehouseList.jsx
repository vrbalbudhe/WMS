// Path: frontend-wms/src/components/admin/adminSections/Warehouse/WarehouseList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import WarehouseModal from './WarehouseModal';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [warehouseToDelete, setWarehouseToDelete] = useState(null);

  // Fetch warehouses on component mount
  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/warehouses');
      setWarehouses(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      setError('Failed to load warehouses. Please try again.');
      setLoading(false);
      setWarehouses([]);
    }
  };

  const handleCreateClick = () => {
    setCurrentWarehouse(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (warehouse) => {
    setCurrentWarehouse(warehouse);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (warehouse) => {
    setWarehouseToDelete(warehouse);
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/admin/${warehouseToDelete.id}`);
      setWarehouses(warehouses.filter(w => w.id !== warehouseToDelete.id));
      setIsDeleting(false);
      setWarehouseToDelete(null);
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      alert('Failed to delete warehouse. Please try again.');
      setIsDeleting(false);
    }
  };

  const handleModalClose = (refreshList = false) => {
    setIsModalOpen(false);
    if (refreshList) {
      fetchWarehouses();
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading warehouses...</div>;

  if (error) return <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center p-6 border-b">
        <h1 className="text-2xl font-semibold text-gray-800">Warehouse Management</h1>
        <button
          onClick={handleCreateClick}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Create Warehouse
        </button>
      </div>

      {warehouses.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No warehouses found. Click "Create Warehouse" to add one.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {warehouses.map((warehouse) => (
                <tr key={warehouse.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{warehouse.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {warehouse.city}, {warehouse.pincode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(warehouse.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(warehouse)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FaEdit className="inline-block" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(warehouse)}
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

      {/* Warehouse Create/Edit Modal */}
      {isModalOpen && (
        <WarehouseModal
          warehouse={currentWarehouse}
          onClose={handleModalClose}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleting && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete the warehouse "{warehouseToDelete?.name}"? This action cannot be undone.
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

export default WarehouseList;
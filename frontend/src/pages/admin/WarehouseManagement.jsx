// Path: frontend-wms/src/pages/admin/WarehouseManagement.jsx

import React from 'react';
import WarehouseList from '../../components/admin/adminSections/Warehouse/WarehouseList';

const WarehouseManagement = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Warehouse Management</h1>
      <WarehouseList />
    </div>
  );
};

export default WarehouseManagement;
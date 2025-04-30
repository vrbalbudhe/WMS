// Path: frontend-wms/src/pages/admin/WarehouseSettings.jsx

import React from 'react';
// import WarehouseFieldSettings from '../../components/admin/adminSections/Warehouse/WarehouseFieldSettings';

const WarehouseSettings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Warehouse Field Settings</h1>
      <p className="text-gray-600">
        Manage custom fields for warehouses. These fields will appear in the warehouse creation form.
      </p>
      <WarehouseFieldSettings />
    </div>
  );
};

export default WarehouseSettings;
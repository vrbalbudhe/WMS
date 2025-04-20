// Path: frontend-wms\src\pages\admin\WarehouseOfficerInfo.jsx
import { useState } from "react";
import { Warehouse, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import UserList from "../../../../frontend-wms/src/components/admin/adminSections/UserManagement/UserList";

export default function WarehouseOfficerInfo() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Warehouse Managers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage warehouse managers who oversee inventory and shipment operations
          </p>
        </div>
        <Link
          to="/admin/create-users"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle size={18} className="mr-2" />
          Add New Manager
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <UserList userType="warehouse_manager" />
        </div>
      </div>
    </div>
  );
}
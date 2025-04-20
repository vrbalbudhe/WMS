import React from "react";

function UserFilter({ filters, onFilterChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.searchTerm}
            onChange={(e) => onFilterChange("searchTerm", e.target.value)}
          />
        </div>

        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User Type
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.userType}
            onChange={(e) => onFilterChange("userType", e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="warehouse_manager">Warehouse Manager</option>
            <option value="admin">Admin</option>
            <option value="procurement_officer">Procurement Officer</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default UserFilter;

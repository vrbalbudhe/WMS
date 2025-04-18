import { useState } from "react";
import { Search, Filter, X, RefreshCcw } from "lucide-react";

export default function UserFilter() {
  const [filters, setFilters] = useState({
    searchQuery: "",
    userType: "",
    dateRange: {
      from: "",
      to: "",
    },
    status: "",
  });

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFilters((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      userType: "",
      dateRange: {
        from: "",
        to: "",
      },
      status: "",
    });
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    // Here you would typically call a function passed from props
    // to filter data in the parent component
    setIsFilterMenuOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="searchQuery"
            value={filters.searchQuery}
            onChange={handleInputChange}
            placeholder="Search by name, email or phone..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Filter Button */}
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            Filter Options
          </button>
        </div>

        {/* Clear Filters Button - Only show if filters are applied */}
        {(filters.userType ||
          filters.status ||
          filters.dateRange.from ||
          filters.dateRange.to ||
          filters.searchQuery) && (
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
          </div>
        )}

        {/* Refresh Button */}
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => console.log("Refresh data")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCcw className="h-4 w-4 mr-2 text-gray-500" />
            Refresh
          </button>
        </div>
      </div>

      {/* Expanded Filter Options */}
      {isFilterMenuOpen && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
          {/* User Type Filter */}
          <div>
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              value={filters.userType}
              onChange={handleInputChange}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">All Types</option>
              <option value="procurement_officer">Procurement Officer</option>
              <option value="warehouse_manager">Warehouse Manager</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label
              htmlFor="dateRange.from"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Created From
            </label>
            <input
              type="date"
              id="dateRange.from"
              name="dateRange.from"
              value={filters.dateRange.from}
              onChange={handleInputChange}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="dateRange.to"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Created To
            </label>
            <input
              type="date"
              id="dateRange.to"
              name="dateRange.to"
              value={filters.dateRange.to}
              onChange={handleInputChange}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending Verification</option>
            </select>
          </div>

          {/* Apply Filters Button */}
          <div className="md:col-span-3 mt-2 flex justify-end">
            <button
              type="button"
              onClick={applyFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

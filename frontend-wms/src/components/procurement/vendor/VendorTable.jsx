import React from 'react';
import { 
  FaSort, 
  FaSortUp, 
  FaSortDown, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaStar, 
  FaRegStar,
  FaBuilding
} from 'react-icons/fa';

const VendorTable = ({ 
  vendors, 
  sortField, 
  sortDirection, 
  onSort, 
  onView, 
  onEdit, 
  onDelete,
  onToggleFavorite 
}) => {
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className="text-gray-400" />;
    }
    return sortDirection === 'asc' ? <FaSortUp className="text-green-600" /> : <FaSortDown className="text-green-600" />;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Blacklisted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Card view for mobile screens
  const renderMobileCards = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-lg shadow overflow-hidden p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaBuilding className="text-gray-500" />
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{vendor.name}</div>
                  <div className="text-xs text-gray-500 truncate max-w-[200px]">{vendor.location}</div>
                </div>
              </div>
              <button 
                onClick={() => onToggleFavorite(vendor.id)}
                className="text-yellow-400 hover:text-yellow-500"
              >
                {vendor.favorite ? <FaStar size={18} /> : <FaRegStar size={18} />}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-2 mb-3 text-xs">
              <div>
                <span className="text-gray-500">Category:</span>
                <div className="truncate max-w-[120px]">{vendor.category}</div>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <div>
                  <span className={`px-1.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(vendor.status)}`}>
                    {vendor.status}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-gray-500">Total Spend:</span>
                <div>{formatCurrency(vendor.totalSpend)}</div>
              </div>
              <div>
                <span className="text-gray-500">Rating:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      {i < vendor.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => onView(vendor)} 
                className="text-blue-600 hover:text-blue-900"
                title="View details"
              >
                <FaEye size={16} />
              </button>
              <button 
                onClick={() => onEdit(vendor)} 
                className="text-indigo-600 hover:text-indigo-900"
                title="Edit vendor"
              >
                <FaEdit size={16} />
              </button>
              <button 
                onClick={() => onDelete(vendor.id)} 
                className="text-red-600 hover:text-red-900"
                title="Delete vendor"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Table columns definition with responsive properties
  const columns = [
    { label: "Vendor Name", field: "name", hideOnSm: false, hideOnMd: false, minWidth: true },
    { label: "Category", field: "category", hideOnSm: true, hideOnMd: false },
    { label: "Total Spend", field: "totalSpend", hideOnSm: false, hideOnMd: false },
    { label: "Status", field: "status", hideOnSm: false, hideOnMd: false },
    { label: "Rating", field: "rating", hideOnSm: true, hideOnMd: false }
  ];

  // Table view for larger screens
  const renderTable = () => {
    return (
      <div className="hidden md:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-3 w-10" />
                {columns.map(({ label, field, hideOnMd }) => (
                  <th
                    key={field}
                    onClick={() => onSort(field)}
                    className={`px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer ${
                      hideOnMd ? 'hidden lg:table-cell' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      {label} {getSortIcon(field)}
                    </div>
                  </th>
                ))}
                <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-2 py-3">
                    <button 
                      onClick={() => onToggleFavorite(vendor.id)}
                      className="text-yellow-400 hover:text-yellow-500"
                      title={vendor.favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      {vendor.favorite ? <FaStar size={18} /> : <FaRegStar size={18} />}
                    </button>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <FaBuilding className="text-gray-500" />
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-[140px]">{vendor.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[140px]">{vendor.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-500">
                    <div className="truncate max-w-[120px]">{vendor.category}</div>
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-500">{formatCurrency(vendor.totalSpend)}</td>
                  <td className="px-2 py-3">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-500">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          {i < vendor.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-3 text-sm text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => onView(vendor)} 
                        className="text-blue-600 hover:text-blue-900"
                        title="View details"
                      >
                        <FaEye size={16} />
                      </button>
                      <button 
                        onClick={() => onEdit(vendor)} 
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit vendor"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(vendor.id)} 
                        className="text-red-600 hover:text-red-900"
                        title="Delete vendor"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {vendors.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No vendors found. Try adjusting your search or filters.
        </div>
      ) : (
        <>
          {/* Render mobile cards view */}
          {renderMobileCards()}
          
          {/* Render table view for larger screens */}
          {renderTable()}
        </>
      )}
    </div>
  );
};

export default VendorTable;
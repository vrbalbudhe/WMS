import React from 'react';
import { 
  FaBuilding, 
  FaUserTie, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaFileContract, 
  FaDollarSign, 
  FaStar, 
  FaRegStar, 
  FaEdit, 
  FaFileAlt
} from 'react-icons/fa';

const VendorDetailsModal = ({ vendor, onClose, onEdit }) => {
  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Function to get status badge style
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
  
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <FaBuilding className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  {vendor.name}
                  {vendor.favorite && <FaStar className="text-yellow-400 ml-2" />}
                </h3>
                <div className="mt-4 divide-y space-y-4">
                  <div className="pb-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(vendor.status)}`}>
                        {vendor.status}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            {i < vendor.rating ? <FaStar size={16} /> : <FaRegStar size={16} />}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3 pb-3">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <FaUserTie className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Contact Person</p>
                          <p className="text-sm text-gray-600">{vendor.contactPerson}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaEnvelope className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-gray-600">{vendor.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaPhone className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-gray-600">{vendor.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3 pb-3">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Address</h4>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">{vendor.address}</p>
                        <p className="text-sm text-gray-600">{vendor.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3 pb-3">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Business Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <FaGlobe className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Website</p>
                          <p className="text-sm text-gray-600">{vendor.website}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaFileContract className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Contract End Date</p>
                          <p className="text-sm text-gray-600">{formatDate(vendor.contractEndDate)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaDollarSign className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Payment Terms</p>
                          <p className="text-sm text-gray-600">{vendor.paymentTerms}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaDollarSign className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Total Spend</p>
                          <p className="text-sm text-gray-600">{formatCurrency(vendor.totalSpend)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {vendor.notes && (
                    <div className="pt-3 pb-3">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                      <div className="flex items-start">
                        <FaFileAlt className="text-gray-400 mt-1 mr-2" />
                        <p className="text-sm text-gray-600">{vendor.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onEdit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <FaEdit className="mr-2" /> Edit Vendor
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsModal;
// Path: frontend-wms\src\components\admin\adminSections\UserManagement\UserList.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { 
    MoreHorizontal,
    Edit,
    Trash2,
    Shield,
    UserX,
    RefreshCw,
    Search,
    Filter,
    CheckCircle,
    XCircle,
    AlertCircle,
    User  // Add this import
  } from "lucide-react";
  import { Link } from "react-router-dom";
import EditUserModal from "./EditUserModal";
import ConfirmationModal from "./ConfirmationModal";

export default function UserList({ userType }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching users with params:", {
        userType: userType === "all" ? undefined : userType,
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: searchTerm || undefined,
        page: currentPage,
        limit: 10,
      });
      
      const response = await axios.get("http://localhost:8000/api/admin/users", {
        params: {
          userType: userType === "all" ? undefined : userType,
          status: statusFilter !== "all" ? statusFilter : undefined,
          search: searchTerm || undefined,
          page: currentPage,
          limit: 10,
        },
        withCredentials: true,
      });
  
      console.log("Users response:", response.data);
  
      if (response.data.success) {
        setUsers(response.data.users || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalUsers(response.data.totalUsers || 0);
      } else {
        setError(response.data.message || "Failed to load users");
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.response?.data?.message || "Error fetching users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userType, statusFilter, currentPage, refreshTrigger]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        fetchUsers();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const toggleActionMenu = (userId) => {
    setActionMenuOpen(actionMenuOpen === userId ? null : userId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getUserTypeLabel = (userType) => {
    switch (userType) {
      case "procurement_officer":
        return "Procurement Officer";
      case "warehouse_manager":
        return "Warehouse Manager";
      default:
        return userType;
    }
  };

  const getStatusBadge = (status, mustChangePassword) => {
    if (mustChangePassword) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1">
          <AlertCircle size={12} />
          Password Change Required
        </span>
      );
    }

    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle size={12} />
            Active
          </span>
        );
      case "inactive":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 flex items-center gap-1">
            <XCircle size={12} />
            Inactive
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 flex items-center gap-1">
            <AlertCircle size={12} />
            Pending Verification
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            {status || "Unknown"}
          </span>
        );
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
    setActionMenuOpen(null);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
    setActionMenuOpen(null);
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setShowResetModal(true);
    setActionMenuOpen(null);
  };

  const handleToggleUserStatus = async (user) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    
    try {
      const response = await axios.put(
        "http://localhost:8000/api/admin/users/update",
        {
          userId: user.id,
          status: newStatus
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        showNotification(
          `User ${user.name} ${newStatus === "active" ? "activated" : "deactivated"} successfully`,
          "success"
        );
        setRefreshTrigger(prev => prev + 1);
      } else {
        showNotification(response.data.message || `Failed to update user status`, "error");
      }
    } catch (error) {
      console.error(`Error updating user status:`, error);
      showNotification(error.response?.data?.message || `Error updating user status`, "error");
    }
    setActionMenuOpen(null);
  };

  const confirmDeleteUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/users/delete",
        { userId: selectedUser.id },
        { withCredentials: true }
      );

      if (response.data.success) {
        showNotification(`User ${selectedUser.name} deleted successfully`, "success");
        setRefreshTrigger(prev => prev + 1);
      } else {
        showNotification(response.data.message || "Failed to delete user", "error");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showNotification(error.response?.data?.message || "Error deleting user", "error");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const confirmResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/users/reset-password",
        { userId: selectedUser.id },
        { withCredentials: true }
      );

      if (response.data.success) {
        showNotification(`Password reset successfully. New password sent to ${selectedUser.email}`, "success");
      } else {
        showNotification(response.data.message || "Failed to reset password", "error");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      showNotification(error.response?.data?.message || "Error resetting password", "error");
    } finally {
      setShowResetModal(false);
    }
  };

  const handleUserUpdated = (updatedUser) => {
    showNotification(`User ${updatedUser.name} updated successfully`, "success");
    setRefreshTrigger(prev => prev + 1);
    setShowEditModal(false);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  if (loading && users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-10 flex justify-center items-center">
        <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
        <span className="ml-2 text-gray-600">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Notification */}
      {notification && (
        <div className={`p-4 ${
          notification.type === "success" ? "bg-green-50 text-green-700" : 
          notification.type === "error" ? "bg-red-50 text-red-700" : 
          "bg-blue-50 text-blue-700"
        } flex items-center justify-between`}>
          <div className="flex items-center">
            {notification.type === "success" ? <CheckCircle size={20} className="mr-2" /> : 
             notification.type === "error" ? <AlertCircle size={20} className="mr-2" /> : 
             <AlertCircle size={20} className="mr-2" />}
            {notification.message}
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={16} />
          </button>
        </div>
      )}
      
      {/* Header and Search/Filter */}
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {userType === "warehouse_manager" 
                ? "Warehouse Managers" 
                : userType === "procurement_officer"
                ? "Procurement Officers"
                : "All Users"}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage user accounts and permissions
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md text-sm appearance-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {users.length === 0 && !loading && !error ? (
  <div className="p-10 text-center">
    <div className="inline-block p-6 bg-gray-100 rounded-lg mb-4">
      <User size={40} className="text-gray-400 mx-auto" />
    </div>
    <p className="text-gray-500 mb-4">No users found matching your criteria.</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={() => {
          setStatusFilter("all");
          setSearchTerm("");
          setCurrentPage(1);
        }}
        className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
      >
        Clear Filters
      </button>
      <Link
        to="/admin/create-users"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create New User
      </Link>
    </div>
  </div>
) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role & Assignment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatar}
                              alt={user.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {getInitials(user.name)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.employeeId && (
                            <div className="text-xs text-gray-400">
                              ID: {user.employeeId}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getUserTypeLabel(user.userType)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.warehouse ? (
                          <span>Warehouse: {user.warehouse.name}</span>
                        ) : (
                          <span className="text-amber-500">No warehouse assigned</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.phone || "No phone number"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status, user.mustChangePassword)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium relative">
                      <button
                        onClick={() => toggleActionMenu(user.id)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>

                      {actionMenuOpen === user.id && (
                        <div className="absolute right-8 z-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                          >
                            <button
                              onClick={() => handleEditUser(user)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              role="menuitem"
                            >
                              <Edit className="mr-3 h-4 w-4 text-gray-500" />
                              Edit User
                            </button>
                            <button
                              onClick={() => handleResetPassword(user)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              role="menuitem"
                            >
                              <Shield className="mr-3 h-4 w-4 text-gray-500" />
                              Reset Password
                            </button>
                            <button
                              onClick={() => handleToggleUserStatus(user)}
                              className="flex items-center px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 w-full text-left"
                              role="menuitem"
                            >
                              <UserX className="mr-3 h-4 w-4 text-amber-500" />
                              {user.status === "active" ? "Deactivate" : "Activate"}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                              role="menuitem"
                            >
                              <Trash2 className="mr-3 h-4 w-4 text-red-500" />
                              Delete User
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * 10, totalUsers)}
                  </span> of{" "}
                  <span className="font-medium">{totalUsers}</span> users
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        currentPage === index + 1
                          ? "bg-blue-50 border-blue-500 text-blue-600 z-10"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      } text-sm font-medium`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUserUpdated}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          title="Delete User"
          message={`Are you sure you want to delete ${selectedUser.name}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          confirmButtonClass="bg-red-600 hover:bg-red-700"
          onConfirm={confirmDeleteUser}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Reset Password Confirmation Modal */}
      {showResetModal && (
        <ConfirmationModal
          title="Reset Password"
          message={`Are you sure you want to reset the password for ${selectedUser.name}? A new password will be generated and sent to their email.`}
          confirmText="Reset Password"
          cancelText="Cancel"
          confirmButtonClass="bg-blue-600 hover:bg-blue-700"
          onConfirm={confirmResetPassword}
          onCancel={() => setShowResetModal(false)}
        />
      )}
    </div>
  );
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md inline-flex items-center">
          <AlertCircle size={20} className="mr-2" />
          <span>{error}</span>
        </div>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Try Again
        </button>
        
        <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-md text-left">
          <p className="font-medium mb-2">Troubleshooting:</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Check if the backend server is running</li>
            <li>Verify that MongoDB connection is working</li>
            <li>Make sure you have created users in the system</li>
            <li>Try clearing filters and searching again</li>
          </ul>
        </div>
      </div>
    );
  }
}
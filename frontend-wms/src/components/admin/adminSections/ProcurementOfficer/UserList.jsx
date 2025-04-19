// frontend-wms\src\components\admin\adminSections\ProcurementOfficer\UserList.jsx (updated)
import { useState, useEffect } from "react";
import axios from "axios";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Shield,
  UserX,
  RefreshCw,
} from "lucide-react";

export default function UserList({ filters }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/admin/users", {
        params: {
          page: currentPage,
          limit: 5,
          search: filters?.searchTerm || "",
          status: filters?.status !== "all" ? filters?.status : "",
          userType: filters?.userType !== "all" ? filters?.userType : "",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
        setTotalUsers(response.data.totalUsers);
      } else {
        setError("Failed to load users");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filters]);

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
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
          Password Change Required
        </span>
      );
    }

    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Active
          </span>
        );
      case "inactive":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Inactive
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
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

  const handleEditUser = (userId) => {
    console.log("Edit user:", userId);
    setActionMenuOpen(null);
    // Implement edit functionality or navigation
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/admin/users/delete",
          { userId },
          { withCredentials: true }
        );

        if (response.data.success) {
          fetchUsers(); // Refresh the user list
        } else {
          alert(response.data.message || "Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert(error.response?.data?.message || "Error deleting user");
      }
    }
    setActionMenuOpen(null);
  };

  const handleResetPassword = async (userId) => {
    if (window.confirm("Reset password for this user? A new password will be generated and emailed to them.")) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/admin/users/reset-password",
          { userId },
          { withCredentials: true }
        );

        if (response.data.success) {
          alert("Password reset successfully. A new password has been sent to the user's email.");
        } else {
          alert(response.data.message || "Failed to reset password");
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        alert(error.response?.data?.message || "Error resetting password");
      }
    }
    setActionMenuOpen(null);
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const actionText = currentStatus === "active" ? "deactivate" : "activate";
    
    if (window.confirm(`Are you sure you want to ${actionText} this user?`)) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/admin/users/update-status",
          { userId, status: newStatus },
          { withCredentials: true }
        );

        if (response.data.success) {
          fetchUsers(); // Refresh the user list
        } else {
          alert(response.data.message || `Failed to ${actionText} user`);
        }
      } catch (error) {
        console.error(`Error ${actionText}ing user:`, error);
        alert(error.response?.data?.message || `Error ${actionText}ing user`);
      }
    }
    setActionMenuOpen(null);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading && users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-10 flex justify-center items-center">
        <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
        <span className="ml-2 text-gray-600">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Management
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          List of all warehouse management system users
        </p>
      </div>

      {users.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-500">No users found matching your criteria.</p>
        </div>
      ) : (
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
                  Role
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
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-500">
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
                        <span>No warehouse assigned</span>
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
                            onClick={() => handleEditUser(user.id)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            <Edit className="mr-3 h-4 w-4 text-gray-500" />
                            Edit User
                          </button>
                          <button
                            onClick={() => handleResetPassword(user.id)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            <Shield className="mr-3 h-4 w-4 text-gray-500" />
                            Reset Password
                          </button>
                          <button
                            onClick={() => handleToggleUserStatus(user.id, user.status)}
                            className="flex items-center px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 w-full text-left"
                            role="menuitem"
                          >
                            <UserX className="mr-3 h-4 w-4 text-amber-500" />
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
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
      )}

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
              Showing <span className="font-medium">{(currentPage - 1) * 5 + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(currentPage * 5, totalUsers)}
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
    </div>
  );
}
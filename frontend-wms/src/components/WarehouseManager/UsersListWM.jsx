import { useEffect, useRef, useState } from "react";

const USERS_PER_PAGE = 5;

export default function UserListWM({ filters }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/wm/all")
      .then((res) => res.json())
      .then((data) => {
        // Ensure we're accessing the correct property from the response
        const usersData = data?.GetAllUsr || data || [];
        // Add status field if not present in the data
        const processedUsers = usersData.map((user) => ({
          ...user,
          status:
            user.status || (user.mustChangePassword ? "inactive" : "active"),
        }));
        setUsers(processedUsers);
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  // Apply filters whenever users or filters change
  useEffect(() => {
    let result = [...users];

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          (user.name && user.name.toLowerCase().includes(searchLower)) ||
          (user.email && user.email.toLowerCase().includes(searchLower)) ||
          (user.phone && user.phone.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter((user) => user.status === filters.status);
    }

    // Apply user type filter
    if (filters.userType !== "all") {
      result = result.filter((user) => user.userType === filters.userType);
    }

    setFilteredUsers(result);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [users, filters]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
              mustChangePassword: user.status === "active", // Set mustChangePassword based on new status
            }
          : user
      )
    );
    setDropdownOpenId(null);
  };

  const deleteUser = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setDropdownOpenId(null);
    }
  };

  return (
    <div className="border rounded-lg shadow overflow-hidden">
      {/* Excel-style header */}
      <div className="bg-gray-100 border-b">
        <div className="grid grid-cols-6 text-sm font-medium text-gray-700">
          <div className="p-3 border-r">Name</div>
          <div className="p-3 border-r">Email</div>
          <div className="p-3 border-r">Phone</div>
          <div className="p-3 border-r">User Type</div>
          <div className="p-3 border-r">Status</div>
          <div className="p-3 text-center">Actions</div>
        </div>
      </div>

      {/* Table body */}
      <div className="bg-white">
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user, index) => (
            <div
              key={user.id}
              className={`grid grid-cols-6 text-sm ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50 border-b`}
            >
              <div className="p-3 border-r truncate">{user.name}</div>
              <div className="p-3 border-r truncate">{user.email}</div>
              <div className="p-3 border-r truncate">{user.phone || "N/A"}</div>
              <div className="p-3 border-r truncate capitalize">
                {user.userType?.replace(/_/g, " ") || "N/A"}
              </div>
              <div className="p-3 border-r">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status?.toUpperCase()}
                </span>
                {user.mustChangePassword && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Reset Pwd
                  </span>
                )}
              </div>
              <div
                className="p-3 flex justify-center items-center relative"
                ref={dropdownRef}
              >
                <button
                  className="p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setDropdownOpenId(user.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="5" cy="12" r="2" fill="currentColor" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                    <circle cx="19" cy="12" r="2" fill="currentColor" />
                  </svg>
                </button>
                {dropdownOpenId === user.id && (
                  <div className="absolute right-0 top-full z-10 mt-1 w-40 bg-white shadow-lg border rounded-md">
                    <button
                      className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center"
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.status === "active" ? (
                        <>
                          <svg
                            className="w-4 h-4 mr-2 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          Set Inactive
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 mr-2 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          Set Active
                        </>
                      )}
                    </button>
                    <button
                      className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center text-red-500"
                      onClick={() => deleteUser(user.id)}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 col-span-6">
            {users.length > 0
              ? "No users match the current filters"
              : "No users found"}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * USERS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 text-sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="flex items-center text-sm">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 text-sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

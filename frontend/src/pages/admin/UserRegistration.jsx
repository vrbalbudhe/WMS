// frontend-wms\src\pages\admin\UserRegistration.jsx (updated)
import { useState, useEffect } from "react";
import { User, Mail, Phone, Lock, Building, Send, Briefcase, Tag } from "lucide-react";
import axios from "axios";

export default function UserRegistration() {
  const [warehouses, setWarehouses] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
    employeeId: "",
    warehouseId: "",
    userType: "procurement_officer",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  // Fetch warehouses for dropdown
  // In the useEffect that fetches warehouses:
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/warehouses",  // This is your getAllWarehouses endpoint
          { withCredentials: true }
        );
        console.log("Unexpected warehouse data format:", response?.data?.data);
        setWarehouses(response?.data?.data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  const generateRandomPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setGeneratedPassword(password);
    setFormData(prev => ({
      ...prev,
      password,
      confirmPassword: password
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Phone validation (optional but validate format if provided)
    if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    // Warehouse validation
    if (!formData.warehouseId) {
      newErrors.warehouseId = "Warehouse is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formErrors = validateForm();
    setErrors(formErrors);
  
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
  
      try {
        console.log("Sending user data:", formData);
        
        // Create a clean version of the data (removing confirmPassword)
        const dataToSend = {
          email: formData.email,
          name: formData.name,
          password: formData.password,
          phone: formData.phone || null, // Ensure phone is null if empty
          employeeId: formData.employeeId || null,
          warehouseId: formData.warehouseId || null,
          userType: formData.userType
        };
  
        // Register the user
        const registerResponse = await axios.post(
          "http://localhost:8000/api/admin/users/register",
          dataToSend,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
  
        console.log("Registration response:", registerResponse.data);
  
        if (!registerResponse.data.success) {
          throw new Error(registerResponse.data.message || "Failed to register user.");
        }
  
        // Send credentials email
        const sendCredsResponse = await axios.post(
          "http://localhost:8000/api/admin/users/send-credentials",
          { 
            email: formData.email,
            password: formData.password
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
  
        if (!sendCredsResponse.data.success) {
          // Attempt to delete the user if email sending fails
          await axios.post(
            "http://localhost:8000/api/admin/users/delete",
            { email: formData.email },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
  
          throw new Error(
            sendCredsResponse.data.message || "Failed to send credentials. User registration rolled back."
          );
        }
  
        setSuccessMessage(
          `User registered successfully! Credentials email sent to ${formData.email}`
        );
  
        // Reset form
        setFormData({
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
          phone: "",
          employeeId: "",
          warehouseId: "",
          userType: "procurement_officer",
        });
        setGeneratedPassword("");
      } catch (error) {
        console.error("Registration process error:", error);
        console.error("Error response data:", error.response?.data);
        
        setErrors({ 
          submit: error.response?.data?.error || error.response?.data?.message || error.message || "Registration failed. Please try again." 
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          User Registration
        </h2>
        <User className="text-blue-600" size={24} />
      </div>

      {successMessage && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
          <Send size={20} className="mr-2" />
          {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Field */}
          <div className="col-span-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="flex items-center">
              <span className="flex items-center justify-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-md p-2">
                <Mail size={18} className="text-gray-500" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 block w-full rounded-r-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                placeholder="user@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Name Field */}
          <div className="col-span-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="flex items-center">
              <span className="flex items-center justify-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-md p-2">
                <User size={18} className="text-gray-500" />
              </span>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 block w-full rounded-r-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Employee ID Field */}
          <div className="col-span-2 md:col-span-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="employeeId"
            >
              Employee ID
            </label>
            <div className="flex items-center">
              <span className="flex items-center justify-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-md p-2">
                <Tag size={18} className="text-gray-500" />
              </span>
              <input
                id="employeeId"
                name="employeeId"
                type="text"
                value={formData.employeeId}
                onChange={handleChange}
                className="flex-1 block w-full rounded-r-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                placeholder="EMP12345"
              />
            </div>
            {errors.employeeId && (
              <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="col-span-2 md:col-span-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <div className="flex items-center">
              <span className="flex items-center justify-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-md p-2">
                <Phone size={18} className="text-gray-500" />
              </span>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 block w-full rounded-r-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Warehouse Selection */}
          <div className="col-span-2 md:col-span-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="warehouseId"
            >
              Assigned Warehouse
            </label>
            <div className="flex items-center">
              <span className="flex items-center justify-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-md p-2">
                <Building size={18} className="text-gray-500" />
              </span>
              <select
                id="warehouseId"
                name="warehouseId"
                value={formData.warehouseId}
                onChange={handleChange}
                className="flex-1 block w-full rounded-r-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              >
                <option value="">Select a warehouse</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.warehouseId && (
              <p className="mt-1 text-sm text-red-600">{errors.warehouseId}</p>
            )}
          </div>

          {/* User Type Selection */}
          <div className="col-span-2 md:col-span-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="userType"
            >
              User Type
            </label>
            <div className="flex items-center">
              <span className="flex items-center justify-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-md p-2">
                <Briefcase size={18} className="text-gray-500" />
              </span>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="flex-1 block w-full rounded-r-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              >
                <option value="procurement_officer">Procurement Officer</option>
                <option value="warehouse_manager">Warehouse Manager</option>
              </select>
            </div>
          </div>

          {/* Password Field */}
          <div className="col-span-2 md:col-span-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center">
              <span className="flex items-center justify-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-md p-2">
                <Lock size={18} className="text-gray-500" />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 block w-full rounded-r-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="col-span-2 md:col-span-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="flex items-center">
              <span className="flex items-center justify-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-md p-2">
                <Lock size={18} className="text-gray-500" />
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="flex-1 block w-full rounded-r-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Password Generator Button */}
          <div className="col-span-2 mt-2">
            <button
              type="button"
              onClick={generateRandomPassword}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Lock className="mr-2 h-4 w-4" />
              Generate Secure Password
            </button>
            {generatedPassword && (
              <div className="mt-2 p-2 bg-gray-100 rounded-md">
                <p className="text-sm font-medium text-gray-800">Generated Password: <span className="font-mono">{generatedPassword}</span></p>
                <p className="text-xs text-gray-500 mt-1">This password will be emailed to the user.</p>
              </div>
            )}
          </div>

          {/* Email Verification Notice */}
          <div className="col-span-2 mt-2">
            <div className="text-sm text-gray-500">
              <p>After registration, login credentials will be sent to the provided email address.</p>
              <p>The user will be required to change their password upon first login.</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"}`}
            >
              {isSubmitting ? "Creating User..." : "Create User & Send Email"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
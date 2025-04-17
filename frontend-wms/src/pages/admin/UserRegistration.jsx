import { useState } from "react";
import { User, Mail, Phone, Lock, Camera, Send } from "lucide-react";

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
    userType: "procurement_officer",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
        const registerResponse = await fetch(
          "http://localhost:8000/api/admin/oul/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
          }
        );
        console.log(registerResponse);

        if (!registerResponse.ok) {
          throw new Error("Failed to register user.");
        }

        const sendCredsResponse = await fetch(
          "http://localhost:8000/api/admin/oul/send-credintials",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email: formData?.email }),
          }
        );

        if (!sendCredsResponse.ok) {
          await fetch("http://localhost:8000/api/admin/oul/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email: formData?.email }),
          });

          throw new Error(
            "Failed to send credentials. User registration rolled back."
          );
        }

        setSuccessMessage(
          `User registered successfully! Verification email sent to ${formData.email}`
        );

        setFormData({
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
          phone: "",
          userType: "procurement_officer",
        });
      } catch (error) {
        console.error("Registration process error:", error);
        setErrors({ submit: error.message });
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

          {/* Password Field */}
          <div>
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
          <div>
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

          {/* Phone Field */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="phone"
            >
              Phone Number (optional)
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

          {/* User Type Selection */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="userType"
            >
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            >
              <option value="procurement_officer">Procurement Officer</option>
              <option value="warehouse_manager">Warehouse Manager</option>
            </select>
          </div>

          {/* Email Verification Notice */}
          <div className="col-span-2 mt-2">
            <div className="text-sm text-gray-500">
              After registration, a confirmation link will be sent to the
              provided email address. User will be required to change their
              password upon first login.
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

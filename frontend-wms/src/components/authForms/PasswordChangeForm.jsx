// frontend-wms\src\components\authForms\PasswordChangeForm.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Eye, EyeOff, AlertCircle, Check } from "lucide-react";
import axios from "axios";

const PasswordChangeForm = ({ onSuccess }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); // Add this line
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: "Password is too weak",
    });

    const { refreshLoginContext } = useContext(AuthContext);

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const checkPasswordStrength = (password) => {
        // Simple password strength checker
        let score = 0;
        let message = "";

        if (password.length >= 8) score += 1;
        if (password.match(/[A-Z]/)) score += 1;
        if (password.match(/[a-z]/)) score += 1;
        if (password.match(/[0-9]/)) score += 1;
        if (password.match(/[^A-Za-z0-9]/)) score += 1;

        switch (score) {
            case 0:
            case 1:
                message = "Password is too weak";
                break;
            case 2:
                message = "Password is weak";
                break;
            case 3:
                message = "Password is medium";
                break;
            case 4:
                message = "Password is strong";
                break;
            case 5:
                message = "Password is very strong";
                break;
            default:
                message = "Password is too weak";
        }

        setPasswordStrength({ score, message });
        return score;
    };

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
        checkPasswordStrength(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate inputs
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        if (checkPasswordStrength(newPassword) < 3) {
            setError("Please use a stronger password");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/change-password",
                {
                    currentPassword,
                    newPassword,
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                // Show success message
                setSuccessMessage("Password changed successfully!");

                // Wait a moment to show the success message
                setTimeout(() => {
                    // Update auth context with new user info
                    refreshLoginContext();

                    // Call the onSuccess callback if provided
                    if (onSuccess) onSuccess();
                }, 1500);
            } else {
                setError(response.data.message || "Failed to change password");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Error changing password");
        } finally {
            setLoading(false);
        }
    };

    const getStrengthBarColor = () => {
        switch (passwordStrength.score) {
            case 0:
            case 1:
                return "bg-red-500";
            case 2:
                return "bg-yellow-500";
            case 3:
                return "bg-blue-500";
            case 4:
            case 5:
                return "bg-green-500";
            default:
                return "bg-gray-300";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Change Your Password</h2>

            {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
                    <AlertCircle size={18} className="mr-2" />
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
                    <Check size={18} className="mr-2" />
                    {successMessage}
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            id="currentPassword"
                            type={showPasswords.current ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your current password"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility("current")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                        >
                            {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            id="newPassword"
                            type={showPasswords.new ? "text" : "password"}
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a new password"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility("new")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                        >
                            {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Password strength indicator */}
                    {newPassword && (
                        <div className="mt-2">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium text-gray-700">Password strength:</span>
                                <span className={`text-xs ${passwordStrength.score >= 3 ? 'text-green-600' : 'text-amber-600'}`}>
                                    {passwordStrength.message}
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${getStrengthBarColor()}`}
                                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                ></div>
                            </div>

                            <ul className="mt-2 space-y-1">
                                <li className="text-xs flex items-center">
                                    <span className={`mr-1 ${newPassword.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                                        {newPassword.length >= 8 ? <Check size={12} /> : '•'}
                                    </span>
                                    At least 8 characters
                                </li>
                                <li className="text-xs flex items-center">
                                    <span className={`mr-1 ${newPassword.match(/[A-Z]/) ? 'text-green-500' : 'text-gray-400'}`}>
                                        {newPassword.match(/[A-Z]/) ? <Check size={12} /> : '•'}
                                    </span>
                                    Uppercase letter
                                </li>
                                <li className="text-xs flex items-center">
                                    <span className={`mr-1 ${newPassword.match(/[a-z]/) ? 'text-green-500' : 'text-gray-400'}`}>
                                        {newPassword.match(/[a-z]/) ? <Check size={12} /> : '•'}
                                    </span>
                                    Lowercase letter
                                </li>
                                <li className="text-xs flex items-center">
                                    <span className={`mr-1 ${newPassword.match(/[0-9]/) ? 'text-green-500' : 'text-gray-400'}`}>
                                        {newPassword.match(/[0-9]/) ? <Check size={12} /> : '•'}
                                    </span>
                                    Number
                                </li>
                                <li className="text-xs flex items-center">
                                    <span className={`mr-1 ${newPassword.match(/[^A-Za-z0-9]/) ? 'text-green-500' : 'text-gray-400'}`}>
                                        {newPassword.match(/[^A-Za-z0-9]/) ? <Check size={12} /> : '•'}
                                    </span>
                                    Special character
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={showPasswords.confirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm your new password"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility("confirm")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                        >
                            {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        }`}
                >
                    {loading ? "Changing Password..." : "Change Password"}
                </button>
            </form>
        </div>
    );
};

export default PasswordChangeForm;
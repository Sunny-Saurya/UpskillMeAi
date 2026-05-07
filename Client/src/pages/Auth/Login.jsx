import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuMail, LuLock, LuArrowRight } from 'react-icons/lu';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import toast from 'react-hot-toast';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      toast.error("Invalid email address");
      return;
    }
    if (!password) {
      setError("Password cannot be empty.");
      toast.error("Password is required");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      toast.error("Password too short");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email.trim(),
        password: password.trim()
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        setError("Login failed: Invalid response from server.");
        toast.error("Login failed");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
        toast.error("Login error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full md:max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <h3 className="text-xl font-bold text-gray-900">
            Welcome Back
          </h3>
          <p className="text-xs text-gray-600 mt-0.5">
            Login to continue your interview prep journey
          </p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-3">
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <LuMail className="absolute left-3 top-3.5 text-red-600" size={20} />
              <input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="sunny@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <LuLock className="absolute left-3 top-3.5 text-red-600" size={20} />
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Min 8 Characters"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
              />
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-2.5"
            >
              {error}
            </motion.p>
          )}

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-2 text-sm rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? "Logging in..." : (
              <>
                LOGIN
                <LuArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        {/* Signup Link */}
        <p className="text-xs text-gray-700 mt-4 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => setCurrentPage("signup")}
            className="text-red-600 font-semibold hover:text-red-700 transition"
          >
            Sign Up
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuMail, LuLock, LuUser, LuArrowRight } from "react-icons/lu";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { getInitials } from "../../utils/helper";
import toast from "react-hot-toast";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Full name cannot be empty.");
      toast.error("Name is required");
      return;
    }
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

    setError(null);
    setIsLoading(true);

    try {
      let profileImageUrl = "";

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        toast.success("Account created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
        toast.error("Signup failed");
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
            Create Account
          </h3>
          <p className="text-xs text-gray-600 mt-0.5">
            Join us and start your interview prep journey
          </p>
        </motion.div>

        <form onSubmit={handleSignUp} className="space-y-3">
          {/* Full Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <LuUser className="absolute left-3 top-3.5 text-red-600" size={20} />
              <input
                type="text"
                placeholder="Sunny Kumar"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
              />
            </div>
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <LuMail className="absolute left-3 top-3.5 text-red-600" size={20} />
              <input
                type="email"
                placeholder="sunny@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Min 8 Characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Signup Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-2 text-sm rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? "Creating account..." : (
              <>
                SIGN UP
                <LuArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="text-xs text-gray-700 mt-4 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setCurrentPage("login")}
            className="text-red-600 font-semibold hover:text-red-700 transition"
          >
            Login
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;

import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { LuMail, LuPhone, LuMapPin, LuCalendar, LuPencil, LuSave } from "react-icons/lu";
import { motion } from "framer-motion";
import { getInitials } from "../utils/helper";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the profile
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <DashboardLayout>
      <div className="px-8 py-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Profile Card */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="flex justify-center mb-6">
                {user?.profileImageUrl ? (
                  <img 
                    src={user.profileImageUrl} 
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-red-600 shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-orange-600 text-white font-bold flex items-center justify-center text-4xl shadow-lg">
                    {getInitials(user?.name || "")}
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {user?.name || "User"}
              </h2>
              <p className="text-gray-600 text-sm mb-6">{user?.email}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {isEditing ? (
                  <>
                    <LuSave size={18} />
                    Done Editing
                  </>
                ) : (
                  <>
                    <LuPencil size={18} />
                    Edit Profile
                  </>
                )}
              </motion.button>
            </div>

            {/* Stats Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-6 mt-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Sessions</span>
                  <span className="text-2xl font-bold text-orange-600">12</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Questions Solved</span>
                  <span className="text-2xl font-bold text-orange-600">145</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pinned Questions</span>
                  <span className="text-2xl font-bold text-orange-600">23</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Edit Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Account Information
              </h3>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      isEditing
                        ? "bg-white cursor-text"
                        : "bg-gray-50 cursor-not-allowed text-gray-600"
                    }`}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <LuMail size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      isEditing
                        ? "bg-white cursor-text"
                        : "bg-gray-50 cursor-not-allowed text-gray-600"
                    }`}
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <LuPhone size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Add your phone number"
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      isEditing
                        ? "bg-white cursor-text"
                        : "bg-gray-50 cursor-not-allowed text-gray-600"
                    }`}
                  />
                </div>

                {/* Location Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <LuMapPin size={16} />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Add your location"
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      isEditing
                        ? "bg-white cursor-text"
                        : "bg-gray-50 cursor-not-allowed text-gray-600"
                    }`}
                  />
                </div>

                {/* Member Since */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <LuCalendar size={16} />
                    Member Since
                  </label>
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 flex items-center">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 flex gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transition-all"
                  >
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

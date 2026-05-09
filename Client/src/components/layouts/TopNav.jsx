import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { LuBell, LuSearch, LuMenu } from "react-icons/lu";
import { getInitials } from "../../utils/helper.js";
import { motion } from "framer-motion";

const TopNav = ({ onMenuClick }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex justify-between items-center gap-4">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden flex-shrink-0 text-gray-600 hover:text-red-600 transition-colors"
      >
        <LuMenu className="text-2xl" />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses, interviews..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Notification Bell */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="relative text-gray-600 hover:text-red-600 transition-colors flex-shrink-0"
        >
          <LuBell className="text-xl" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </motion.button>

        {/* User Avatar */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-gray-800">{user?.name || "User"}</div>
            <div className="text-xs text-gray-500">Active now</div>
          </div>
          {user?.profileImageUrl ? (
            <img 
              src={user.profileImageUrl} 
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-red-600 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-600 text-white font-semibold flex items-center justify-center uppercase text-sm flex-shrink-0">
              {getInitials(user?.name || "")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;

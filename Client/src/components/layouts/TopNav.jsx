import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { LuBell, LuSearch } from "react-icons/lu";
import { getInitials } from "../../utils/helper.js";
import { motion } from "framer-motion";

const TopNav = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses, interviews..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 ml-8">
        {/* Notification Bell */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="relative text-gray-600 hover:text-orange-600 transition-colors"
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
          <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-semibold flex items-center justify-center uppercase text-sm">
            {getInitials(user?.name || "")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;

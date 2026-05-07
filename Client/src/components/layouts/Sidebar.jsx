import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import { LuSparkles, LuLayoutDashboard, LuVideo, LuBook, LuUser, LuLogOut } from "react-icons/lu";
import { motion } from "framer-motion";
import { getInitials } from "../../utils/helper.js";

const Sidebar = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LuLayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: LuVideo, label: "Interviews", path: "/interviews" },
    { icon: LuBook, label: "Learn", path: "/learn" },
    { icon: LuUser, label: "Profile", path: "/profile" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
            <LuSparkles className="text-white text-lg" />
          </div>
          <div>
            <div className="text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">UpskillMe</div>
            <div className="text-xs text-gray-500">AI Interview Prep</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <motion.button
              key={index}
              onClick={() => navigate(item.path)}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                active
                  ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="text-lg" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      {user && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-600 text-white font-semibold flex items-center justify-center uppercase text-sm">
              {getInitials(user?.name || "")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800 truncate">
                {user?.name || "User"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user?.email || "email@example.com"}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-medium py-2 rounded-lg hover:bg-red-100 transition-colors"
          >
            <LuLogOut className="text-lg" />
            Logout
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

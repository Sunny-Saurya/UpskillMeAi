import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { motion } from "framer-motion";
// import { LuLoader2 } from "react-icons/lu";
import { FiAlertCircle } from "react-icons/fi";


const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-64 min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Top Navigation */}
        {user && <TopNav />}
        
        <div className="flex-1">
        {user === undefined ? (
          // Loading State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="text-amber-500 mb-4"
            >
              {/* <LuLoader2 className="text-4xl" /> */}
            </motion.div>
            <p className="text-lg text-gray-600 font-medium">
              Loading your dashboard...
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Getting everything ready for you
            </p>
          </motion.div>
        ) : user ? (
          // Authenticated Content
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        ) : (
          // Unauthenticated State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FiAlertCircle className="text-2xl text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Access Restricted
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Please login to access the dashboard features and your interview
              sessions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium px-6 py-2.5 rounded-lg shadow hover:shadow-md transition-all"
            >
              Go to Login Page
            </motion.button>
          </motion.div>
        )}
        </div>
      </main>

      {/* Footer */}
      <footer className="ml-64 bg-white border-t border-gray-200 py-4">
        <div className="px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} UpskillMe AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;

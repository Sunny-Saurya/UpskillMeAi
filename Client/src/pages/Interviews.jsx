import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuPlus, LuVideo, LuArrowRight } from "react-icons/lu";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layouts/DashboardLayout";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import Modal from "../components/Modal";
import CreateSessionForm from "./Home/CreateSessionForm";
import SummaryCard from "../components/Cards/SummaryCard";
import { CARD_BG } from "../utils/data";

const Interviews = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      const sessionList = Array.isArray(response.data?.sessions)
        ? response.data.sessions
        : [];
      setSessions(sessionList);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      toast.error("Failed to fetch interviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleDeleteSession = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(id));
      setSessions(sessions.filter((s) => s._id !== id));
      toast.success("Interview deleted");
    } catch (error) {
      toast.error("Failed to delete interview");
    }
  };

  const handleSessionCreated = () => {
    setOpenCreateModal(false);
    fetchSessions();
  };

  return (
    <DashboardLayout>
      <div className="px-4 md:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <LuVideo className="text-orange-600" />
            Interview Sessions
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your interview practice sessions
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpenCreateModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <LuPlus className="text-lg" />
            Create Interview
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/resume-sync")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <LuArrowRight className="text-lg" />
            Resume-Based Interview
          </motion.button>
        </div>

        {/* Sessions Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg h-48 animate-pulse"
              />
            ))}
          </div>
        ) : sessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session, index) => (
              <motion.div
                key={session._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/interview-prep/${session._id}`)}
                className="cursor-pointer"
              >
                <SummaryCard
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={session.role}
                  topicsToFocus={session.topicsToFocus}
                  experience={session.experience}
                  questions={session.questions?.length || 0}
                  lastUpdated={session.updatedAt}
                  onDelete={() => handleDeleteSession(session._id)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <LuVideo className="text-4xl text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium text-lg">No interviews yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Create your first interview session to get started
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenCreateModal(true)}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <LuPlus className="text-lg" />
              Create Your First Interview
            </motion.button>
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          title="Create New Interview Session"
        >
          <CreateSessionForm onSuccess={handleSessionCreated} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Interviews;

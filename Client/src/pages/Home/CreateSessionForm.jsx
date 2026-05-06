import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuBriefcase, LuTrendingUp, LuBookmark, LuFileText, LuSparkles } from 'react-icons/lu';
import toast from 'react-hot-toast';

import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
  const [formData, setFormData] = React.useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: '',
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const {
      role,
      experience,
      topicsToFocus,
      description,
    } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      toast.error("Please fill all required fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // ============================
      // Generate AI Questions
      // ============================
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data.questions;

      // ============================
      // Create Session
      // ============================
      const response = await axiosInstance.post(
        API_PATHS.SESSION.CREATE,
        {
          ...formData,
          questions: generatedQuestions,
        }
      );

      if (response.data?.session?._id) {
        toast.success("Session created successfully!");
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to create session. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-[90vw] md:w-[40vw]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center">
              <LuSparkles className="text-orange-600" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Create Interview Session
              </h3>
              <p className="text-sm text-gray-600 mt-0.5">
                AI-powered interview preparation
              </p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleCreateSession} className="space-y-4">
          {/* Role Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <LuBriefcase className="absolute left-3 top-3.5 text-orange-500" size={20} />
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                placeholder="e.g. Frontend Engineer, Product Manager"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
          </motion.div>

          {/* Experience Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <LuTrendingUp className="absolute left-3 top-3.5 text-orange-500" size={20} />
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                placeholder="e.g. 2, 5, 10"
                min="0"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
          </motion.div>

          {/* Topics to Focus Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topics to Focus <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <LuBookmark className="absolute left-3 top-3.5 text-orange-500" size={20} />
              <input
                type="text"
                value={formData.topicsToFocus}
                onChange={(e) => handleChange('topicsToFocus', e.target.value)}
                placeholder="e.g. React, Node.js, System Design"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
          </motion.div>

          {/* Description Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <div className="relative">
              <LuFileText className="absolute left-3 top-3.5 text-orange-500" size={20} />
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Any specific areas or companies you're targeting?"
                rows="3"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none"
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

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <SpinnerLoader />
                Creating session...
              </>
            ) : (
              <>
                Start Interview Session
                <LuSparkles size={18} />
              </>
            )}
          </motion.button>
        </form>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-6 p-3.5 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <p className="text-xs text-blue-700">
            <strong>💡 Pro Tip:</strong> Our AI will generate 10 tailored questions based on your inputs to help you ace your interview!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreateSessionForm;

import React from 'react';
import { motion } from 'framer-motion';

const RoleInfoHeader = ({ role, topicsToFocus, experience, questions, description, lastUpdated }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-r from-gray-50 to-white border-b border-gray-200"
    >
      {/* Animated Background Blobs */}
      <div className="absolute top-0 right-0 w-[40vw] md:w-[30vw] h-[250px] z-0">
        <div className="relative w-full h-full">
          <div className="absolute w-32 h-32 bg-orange-300 rounded-full blur-3xl opacity-30" />
          <div className="absolute w-32 h-32 bg-orange-400 rounded-full blur-3xl opacity-25 left-12 top-6" />
          <div className="absolute w-28 h-28 bg-orange-200 rounded-full blur-2xl opacity-20 left-6 top-16" />
        </div>
      </div>

      <div className="relative z-10 px-8 py-8">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {role}
          </h1>
          <p className="text-gray-600 text-sm">
            {topicsToFocus || description}
          </p>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="text-xs font-semibold text-white bg-black px-4 py-2 rounded-full">
            Experience: {experience} Year{experience !== 1 ? 's' : ''}
          </span>
          <span className="text-xs font-semibold text-white bg-black px-4 py-2 rounded-full">
            Questions: {questions}
          </span>
          <span className="text-xs font-semibold text-white bg-black px-4 py-2 rounded-full">
            Last Updated: {lastUpdated || 'N/A'}
          </span>
        </motion.div>

        {description && topicsToFocus !== description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-gray-700 max-w-3xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default RoleInfoHeader;

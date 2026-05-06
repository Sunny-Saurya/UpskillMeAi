import React from 'react';
import { motion } from 'framer-motion';

const SpinnerLoader = ({ text = "AI is generating your questions" }) => {
  return (
    <motion.div
      role="status"
      className="flex flex-col items-center justify-center gap-2 p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Gradient Spinner */}
      <div className="relative w-12 h-12">
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Middle Ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-orange-500 border-l-orange-300"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
        </motion.div>
      </div>

      {/* Loading Text */}
      {text && (
        <motion.p
          className="text-xs font-medium text-gray-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {text}
        </motion.p>
      )}

      {/* Animated Dots */}
      <motion.div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-orange-500 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SpinnerLoader;

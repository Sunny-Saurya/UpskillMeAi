import React, { useEffect, useRef, useState } from 'react';
import {
  LuChevronDown,
  LuPin,
  LuPinOff,
  LuSparkles,
} from 'react-icons/lu';
import { motion } from 'framer-motion';
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview';

const QuestionCard = ({
  question,
  answer,
  isPinned,
  onLearnMore,
  onTogglePin,
  isSidebarOpen = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + 16);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Question Header */}
      <div
        onClick={toggleExpand}
        className="flex items-center justify-between gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 flex gap-3 items-start">
          <span className="text-base font-bold text-gray-400 pt-0.5 flex-shrink-0">Q</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-gray-800 leading-snug break-words">
              {question}
            </h3>
          </div>
        </div>

        {/* Right Section - Action Buttons and Chevron */}
        <div className="flex-shrink-0 flex items-center gap-3 ml-4">
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors border border-orange-200 hover:border-orange-300"
            >
              {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
              <span className="hidden sm:inline">Pin</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
                onLearnMore();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors border border-orange-200 hover:border-orange-300"
            >
              <LuSparkles size={14} />
              <span className="hidden sm:inline">Learn More</span>
            </motion.button>
          </motion.div>

          {/* Chevron */}
          <motion.button
            onClick={toggleExpand}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
          >
            <LuChevronDown
              size={18}
              className={`transition-transform duration-300 text-gray-600 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </motion.button>
        </div>
      </div>

      {/* Answer Section */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div
          ref={contentRef}
          className="px-5 pb-5 border-t border-gray-200 bg-gradient-to-br from-orange-50 to-white"
        >
          <div className="mt-4">
            <p className="text-xs font-semibold text-orange-700 uppercase mb-3 tracking-wide flex items-center gap-1.5">
              <LuSparkles size={14} />
              Answer
            </p>
            <div className="text-sm text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-orange-100 shadow-sm">
              {answer || (
                <span className="text-gray-500 italic">No answer available. Click "Learn More" to get AI-generated explanation.</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionCard;

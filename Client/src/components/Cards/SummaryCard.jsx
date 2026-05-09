import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-2 md:p-3 shadow-sm hover:shadow-xl transition-shadow duration-200 cursor-pointer group relative"
      onClick={onSelect}
    >
      <div
        className="rounded-xl p-3 md:p-4 relative"
        style={{
          backgroundColor: colors?.bgColor || "#fef3c7", // fallback to light amber
        }}
      >
        <div className="flex items-start gap-2 md:gap-4">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-white text-amber-700 font-semibold rounded-md flex items-center justify-center text-sm md:text-lg shadow flex-shrink-0">
            {getInitials(role)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base md:text-lg font-semibold text-amber-700 truncate">{role}</h2>
            <p className="text-xs text-gray-800 mt-1 truncate">{topicsToFocus}</p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          className="hidden group-hover:block absolute top-2 md:top-3 right-2 md:right-3 text-amber-700 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Footer Info */}
      <div className="px-2 pb-2 mt-3 md:mt-4 space-y-1 md:space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full">
            Experience: {experience} {experience === "1" ? "Year" : "Years"}
          </span>
          <span className="text-[11px] font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full">
            Questions: {questions || "N/A"}
          </span>
          <span className="text-[11px] font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full">
            Last Updated: {lastUpdated || "N/A"}
          </span>
        </div>
        <p className="text-[13px] text-gray-700 leading-snug">
          {description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuUpload, LuFileText, LuCheck, LuX, LuSparkles } from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [extractedSkills, setExtractedSkills] = useState([]);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.type.includes("word")) {
        setFile(selectedFile);
      } else {
        toast.error("Please upload a PDF or Word document");
      }
    }
  };

  const handleUploadResume = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axiosInstance.post("/api/auth/parse-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setResumeData(response.data.parsedData);
        setExtractedSkills(response.data.skills);
        toast.success("Resume parsed successfully!");
      }
    } catch (error) {
      console.error("Error parsing resume:", error);
      toast.error(error.response?.data?.message || "Failed to parse resume");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartInterviewWithResume = () => {
    if (!resumeData) {
      toast.error("Please upload and parse resume first");
      return;
    }

    // Navigate to interview creation with resume data
    navigate("/interviews/create", {
      state: {
        resumeData,
        skills: extractedSkills,
      },
    });
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
            <LuSparkles className="text-orange-600" />
            Resume-AI Interview Sync
          </h1>
          <p className="text-gray-600 mt-2">
            Upload your resume to get personalized interview questions based on your experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-dashed border-orange-300 hover:border-orange-500 transition-colors">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <LuUpload className="text-3xl text-orange-600" />
                </div>

                <p className="text-sm font-medium text-gray-700 mb-4 text-center">
                  Upload your resume (PDF or Word)
                </p>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="resume-input"
                />

                <label
                  htmlFor="resume-input"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg cursor-pointer hover:bg-orange-700 transition-colors font-medium text-sm mb-3"
                >
                  Choose File
                </label>

                {file && (
                  <div className="w-full mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LuFileText className="text-green-600" />
                      <span className="text-xs text-green-700 font-medium truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <LuX className="text-lg" />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleUploadResume}
                  disabled={!file || isLoading}
                  className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  {isLoading ? "Parsing..." : "Parse Resume"}
                </button>
              </div>
            </div>

            {/* Steps */}
            <div className="mt-8 space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm">How it works:</h3>
              {["Upload your resume", "AI extracts your skills", "Get personalized questions", "Practice with confidence"].map(
                (step, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-600">{step}</p>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {resumeData ? (
              <div className="space-y-6">
                {/* Extracted Data */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
                  <div className="flex items-center gap-2 mb-4">
                    <LuCheck className="text-green-600 text-2xl" />
                    <h2 className="text-lg font-semibold text-gray-900">Resume Analyzed Successfully</h2>
                  </div>

                  {resumeData.name && (
                    <div className="mb-4">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                      <p className="text-gray-900 font-medium">{resumeData.name}</p>
                    </div>
                  )}

                  {resumeData.totalExperience && (
                    <div className="mb-4">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Total Experience</label>
                      <p className="text-gray-900 font-medium">{resumeData.totalExperience}</p>
                    </div>
                  )}

                  {resumeData.summary && (
                    <div className="mb-4">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Professional Summary</label>
                      <p className="text-gray-700 text-sm mt-1">{resumeData.summary}</p>
                    </div>
                  )}
                </div>

                {/* Skills */}
                {extractedSkills.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Extracted Skills ({extractedSkills.length})
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {extractedSkills.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 font-medium text-sm rounded-full border border-orange-200 hover:shadow-md transition-shadow"
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartInterviewWithResume}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <LuSparkles className="text-lg" />
                  Start Interview with Resume Sync
                </motion.button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center text-center h-full">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <LuFileText className="text-4xl text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">
                  Upload and parse your resume to get started
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Your resume will be analyzed to extract skills and experience
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeUpload;

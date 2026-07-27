import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuUpload,
  LuFileText,
  LuCheck,
  LuX,
  LuSparkles,
  LuChevronRight,
  LuBriefcase,
  LuAward,
  LuBuilding,
  LuUser,
  LuClock,
  LuBookOpen,
  LuArrowLeft,
  LuSave,
  LuLoader,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

// ===============================
// Step indicator
// ===============================
const STEPS = [
  { id: 1, label: "Upload Resume", icon: LuUpload },
  { id: 2, label: "Review Skills", icon: LuSparkles },
  { id: 3, label: "Interview Q&A", icon: LuBookOpen },
];

const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center gap-2 mb-8">
    {STEPS.map((step, index) => {
      const Icon = step.icon;
      const isActive = currentStep === step.id;
      const isCompleted = currentStep > step.id;
      return (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                isCompleted
                  ? "bg-green-500 text-white shadow-lg shadow-green-200"
                  : isActive
                  ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200 scale-110"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {isCompleted ? <LuCheck className="text-lg" /> : <Icon className="text-lg" />}
            </div>
            <span
              className={`text-sm font-medium hidden md:block transition-colors ${
                isActive ? "text-orange-600" : isCompleted ? "text-green-600" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`w-12 h-0.5 rounded transition-colors duration-500 ${
                isCompleted ? "bg-green-400" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ===============================
// Question Card Component
// ===============================
const ResumeQuestionCard = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 120 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 font-medium text-[15px] leading-relaxed">{question}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          className="text-gray-400 flex-shrink-0 mt-1"
        >
          <LuChevronRight className="text-lg" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <LuCheck className="text-green-600 text-sm" />
                  <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">
                    Sample Answer
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ===============================
// Main Component
// ===============================
const ResumeUpload = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [resumeData, setResumeData] = useState(null);
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // ---- Step 1: File Upload & Parse ----
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp"
      ];
      const ext = selectedFile.name.split(".").pop().toLowerCase();
      if (validTypes.includes(selectedFile.type) || ["pdf", "doc", "docx", "txt", "png", "jpg", "jpeg", "webp"].includes(ext)) {
        setFile(selectedFile);
      } else {
        toast.error("Please upload a PDF, Image (PNG/JPG), DOC, DOCX, or TXT file");
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const ext = droppedFile.name.split(".").pop().toLowerCase();
      if (["pdf", "doc", "docx", "txt", "png", "jpg", "jpeg", "webp"].includes(ext)) {
        setFile(droppedFile);
      } else {
        toast.error("Please drop a PDF, Image (PNG/JPG), DOC, DOCX, or TXT file");
      }
    }
  };

  const handleUploadResume = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Reading your resume file...");

    try {
      // Read file as base64 in the browser — no file upload needed!
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

      setLoadingMessage("Gemini AI is analyzing your resume...");

      const mimeType = file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/png');

      // Send as regular JSON — no FormData, no multer, no Content-Type issues
      const response = await axiosInstance.post(API_PATHS.AUTH.PARSE_RESUME, {
        fileData: base64Data,
        fileName: file.name,
        mimeType: mimeType,
      }, {
        timeout: 120000,
      });

      if (response.data.success) {
        setResumeData(response.data.parsedData);
        setExtractedSkills(response.data.skills);
        setSelectedSkills(response.data.skills); // Select all by default
        setCurrentStep(2);
        toast.success(`Resume parsed! Found ${response.data.skills.length} skills`);
      }
    } catch (error) {
      console.error("Error parsing resume:", error);
      toast.error(error.response?.data?.message || "Failed to parse resume. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  // ---- Step 2: Skill Selection ----
  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const selectAllSkills = () => setSelectedSkills([...extractedSkills]);
  const deselectAllSkills = () => setSelectedSkills([]);

  // ---- Step 2 → Step 3: Generate Questions ----
  const handleGenerateQuestions = async () => {
    if (selectedSkills.length === 0) {
      toast.error("Please select at least one skill");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Generating personalized interview questions...");

    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_RESUME_QUESTIONS, {
        resumeData,
        skills: selectedSkills,
        numberOfQuestions: 10,
      });

      if (response.data.success) {
        setQuestions(response.data.questions);
        setCurrentStep(3);
        toast.success(`Generated ${response.data.questions.length} personalized questions!`);
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error(error.response?.data?.message || "Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  // ---- Step 3: Save as Session ----
  const handleSaveAsSession = async () => {
    if (questions.length === 0) return;

    setIsSaving(true);
    try {
      const topRole = resumeData.roles?.[0] || "Interview Candidate";
      const sessionPayload = {
        role: topRole,
        experience: resumeData.totalExperience || "Unknown",
        topicsToFocus: selectedSkills.slice(0, 10).join(", "),
        description: `Resume-based interview for ${resumeData.name}. Skills: ${selectedSkills.join(", ")}`,
        questions: questions.map((q) => ({
          question: q.question,
          answer: q.answer,
        })),
        interviewType: "general",
      };

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, sessionPayload);

      if (response.data?.session?._id) {
        toast.success("Interview session saved! Redirecting...");
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      console.error("Error saving session:", error);
      toast.error("Failed to save session. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // ---- Step reset ----
  const handleStartOver = () => {
    setCurrentStep(1);
    setFile(null);
    setResumeData(null);
    setExtractedSkills([]);
    setSelectedSkills([]);
    setQuestions([]);
  };

  return (
    <DashboardLayout>
      <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <LuSparkles className="text-white text-xl" />
            </div>
            Resume-AI Interview Sync
          </h1>
          <p className="text-gray-500 mt-2 ml-[52px]">
            Upload your resume → AI extracts skills → Get personalized questions
          </p>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <LuLoader className="text-white text-2xl animate-spin" />
                </div>
                <p className="text-gray-800 font-semibold text-center">{loadingMessage}</p>
                <p className="text-gray-500 text-sm text-center">
                  This may take 15-30 seconds...
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 25, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================== STEP 1: Upload ===================== */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          >
            {/* Upload Card */}
            <div className="lg:col-span-3">
              <div
                className={`bg-white rounded-2xl shadow-lg p-8 border-2 border-dashed transition-all duration-300 ${
                  file
                    ? "border-green-400 bg-green-50/30"
                    : "border-orange-300 hover:border-orange-500"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                      file ? "bg-green-100" : "bg-orange-100"
                    }`}
                  >
                    {file ? (
                      <LuCheck className="text-4xl text-green-600" />
                    ) : (
                      <LuUpload className="text-4xl text-orange-600" />
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {file ? "File Selected!" : "Drop your resume here"}
                  </h2>
                  <p className="text-gray-500 text-sm mb-6 max-w-xs">
                    {file
                      ? "Click 'Parse Resume' to extract your skills and experience"
                      : "Supports PDF, PNG, JPG, JPEG, DOCX, and TXT files (max 10MB)"}
                  </p>

                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="resume-input"
                  />

                  {!file ? (
                    <label
                      htmlFor="resume-input"
                      className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl cursor-pointer hover:shadow-lg transition-all font-semibold text-sm"
                    >
                      Choose File
                    </label>
                  ) : (
                    <div className="w-full space-y-4">
                      <div className="p-4 bg-white border border-green-200 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <LuFileText className="text-orange-600 text-xl" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setFile(null)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LuX className="text-gray-400 hover:text-red-500 text-lg" />
                        </button>
                      </div>

                      <button
                        onClick={handleUploadResume}
                        className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
                      >
                        <LuSparkles className="text-lg" />
                        Parse Resume with AI
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* How it works sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl">
                <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                  <LuSparkles className="text-orange-400" />
                  How it works
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      icon: LuUpload,
                      title: "Upload Resume",
                      desc: "Upload your PDF, DOC, or DOCX resume file",
                    },
                    {
                      icon: LuSparkles,
                      title: "AI Extraction",
                      desc: "AI reads and extracts your skills, roles, and achievements",
                    },
                    {
                      icon: LuBookOpen,
                      title: "Personalized Questions",
                      desc: "Get interview questions tailored to YOUR experience",
                    },
                    {
                      icon: LuSave,
                      title: "Save & Practice",
                      desc: "Save as a session and practice with AI-powered answers",
                    },
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <step.icon className="text-orange-400 text-lg" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{step.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===================== STEP 2: Review Skills ===================== */}
        {currentStep === 2 && resumeData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <LuUser className="text-white text-2xl" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{resumeData.name}</h2>
                  {resumeData.summary && (
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                      {resumeData.summary}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  <LuCheck className="text-sm" />
                  Parsed
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {resumeData.totalExperience && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <LuClock className="text-blue-600 text-lg" />
                    <div>
                      <p className="text-xs text-blue-600 font-semibold">Experience</p>
                      <p className="text-sm font-bold text-gray-900">{resumeData.totalExperience}</p>
                    </div>
                  </div>
                )}
                {resumeData.roles?.length > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <LuBriefcase className="text-purple-600 text-lg" />
                    <div>
                      <p className="text-xs text-purple-600 font-semibold">Roles</p>
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {resumeData.roles.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </div>
                )}
                {resumeData.companies?.length > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                    <LuBuilding className="text-amber-600 text-lg" />
                    <div>
                      <p className="text-xs text-amber-600 font-semibold">Companies</p>
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {resumeData.companies.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {resumeData.keyAchievements?.length > 0 && (
                <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <LuAward className="text-orange-600" />
                    <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
                      Key Achievements
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {resumeData.keyAchievements.slice(0, 4).map((achievement, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Skill Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Select Skills for Questions
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedSkills.length} of {extractedSkills.length} skills selected
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllSkills}
                    className="px-3 py-1.5 text-xs font-medium bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition"
                  >
                    Select All
                  </button>
                  <button
                    onClick={deselectAllSkills}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {extractedSkills.map((skill, index) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                        isSelected
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-md"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {isSelected && <LuCheck className="inline mr-1 text-xs" />}
                      {skill}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleStartOver}
                className="flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium text-sm"
              >
                <LuArrowLeft className="text-lg" />
                Start Over
              </button>

              <button
                onClick={handleGenerateQuestions}
                disabled={selectedSkills.length === 0}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LuSparkles className="text-lg" />
                Generate {selectedSkills.length > 0
                  ? `Questions (${selectedSkills.length} skills)`
                  : "Questions"}
                <LuChevronRight className="text-lg" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ===================== STEP 3: Questions ===================== */}
        {currentStep === 3 && questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header info */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {questions.length} Personalized Questions
                  </h2>
                  <p className="text-orange-100 text-sm mt-1">
                    Based on {resumeData?.name}'s resume • {selectedSkills.length} skills analyzed
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm text-sm font-semibold">
                    <LuSparkles className="inline mr-1" />
                    AI Generated
                  </div>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {questions.map((q, index) => (
                <ResumeQuestionCard
                  key={index}
                  question={q.question}
                  answer={q.answer}
                  index={index}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium text-sm"
                >
                  <LuArrowLeft className="text-lg" />
                  Back to Skills
                </button>
                <button
                  onClick={handleStartOver}
                  className="flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium text-sm"
                >
                  Start Over
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveAsSession}
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <LuLoader className="text-lg animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <LuSave className="text-lg" />
                    Save & Start Practicing
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResumeUpload;

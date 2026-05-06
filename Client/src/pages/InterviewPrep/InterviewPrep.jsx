import React from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { LuCircleAlert, LuListCollapse, LuSparkles } from "react-icons/lu";

import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";
import Drawer from "../../components/Drawer";
import AIResponsePreview from "./components/AIResponsePreview";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuMessageCircle } from "react-icons/lu";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = React.useState(null);
  const [isUpdateLoader, setIsUpdateLoader] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = React.useState(false);
  const [explanation, setExplanation] = React.useState(null);

  const fetchSessionDetailsById = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data?.session) {
        setSessionData(response.data.session);
      } else {
        toast.error("Invalid session response.");
        setErrorMsg("Invalid session data.");
      }
    } catch (error) {
      console.error("Error fetching session details:", error);
      toast.error("Error fetching session details.");
      setErrorMsg("Failed to load session.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data) {
        setExplanation(response.data);
        toast.success("Explanation generated successfully.");
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg(error.message || "Failed to generate explanation.");
      toast.error(error.message || "Failed to generate explanation.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      if (response.data?.success) {
        toast.success("Question pin status updated.");
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error toggling pin:", error);
      toast.error("Error toggling pin status.");
    }
    setOpenLearnMoreDrawer(false);
  };

  const uploadMoreQuestion = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.UPLOAD_MORE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        { sessionId, questions: generatedQuestions }
      );

      if (response.data) {
        toast.success("More questions uploaded successfully.");
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error uploading more questions:", error);
      toast.error("Failed to upload more questions.");
    } finally {
      setIsUpdateLoader(false);
    }
  };

  React.useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    } else {
      toast.error("Session ID is missing.");
      setErrorMsg("Session ID is missing.");
    }
  }, [sessionId]);

  return (
    <DashboardLayout>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <SpinnerLoader />
        </div>
      ) : (
        <>
          <RoleInfoHeader
            role={sessionData?.role || ""}
            topicsToFocus={sessionData?.topicsToFocus || ""}
            experience={sessionData?.experience || 0}
            questions={sessionData?.questions?.length || 0}
            description={sessionData?.description || ""}
            lastUpdated={
              sessionData?.updatedAt
                ? moment(sessionData?.updatedAt).format("MMM DD, YYYY")
                : "N/A"
            }
          />

          <div className="px-8 py-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Interview Q & A
              </h2>
              <div className="flex items-center gap-2 text-xs text-orange-600 font-semibold bg-orange-100 px-4 py-2 rounded-full border border-orange-200">
                <LuSparkles className="text-base" />
                AI-Powered
              </div>
            </motion.div>

            <div className="grid grid-cols-12 gap-6">
              <div className={`col-span-12 ${openLearnMoreDrawer ? "lg:col-span-8" : ""}`}>
                <AnimatePresence>
                  {sessionData?.questions?.length > 0 ? (
                    <div className="space-y-4">
                      {sessionData.questions.map((data, index) => (
                        <motion.div
                          key={data._id || index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ 
                            duration: 0.4,
                            type: "spring",
                            stiffness: 100,
                            delay: index * 0.1,
                            damping: 15
                          }}
                          layout
                          layoutId={`question-${data._id || index}`}
                        >
                          <QuestionCard
                            question={data?.question}
                            answer={data?.answer}
                            isPinned={data?.isPinned}
                            onLearnMore={() => generateConceptExplanation(data.question)}
                            onTogglePin={() => toggleQuestionPinStatus(data._id)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100"
                    >
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LuSparkles className="text-2xl text-orange-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        No Questions Yet
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Start by adding questions to this interview session
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {sessionData?.questions?.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center mt-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading || isUpdateLoader}
                      onClick={uploadMoreQuestion}
                      className={`flex items-center px-6 py-3 rounded-full border transition-all duration-300
                        ${isUpdateLoader ? 
                          "bg-gray-100 border-gray-300" : 
                          "bg-white hover:bg-gray-50 border-gray-200 shadow hover:shadow-md"}
                        disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isUpdateLoader ? (
                        <SpinnerLoader size={20} />
                      ) : (
                        <>
                          <LuListCollapse className="text-xl text-orange-600" />
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            Generate More Questions
                          </span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {openLearnMoreDrawer && (
              <motion.div
                initial={{ opacity: 0, x: 400 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 400 }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed inset-0 lg:col-span-4 lg:static bg-white lg:bg-white shadow-2xl lg:shadow-lg rounded-t-2xl lg:rounded-lg z-40 lg:z-0 overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-center justify-between border-b border-orange-600">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <LuSparkles className="text-xl" />
                    Question Explanation
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpenLearnMoreDrawer(false)}
                    className="text-white hover:bg-orange-700 p-2 rounded-lg transition"
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 text-sm text-red-600 p-4 bg-red-50 rounded-lg mb-4 border border-red-200"
                    >
                      <LuCircleAlert className="text-lg flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <SpinnerLoader text="Generating explanation..." />
                    </div>
                  ) : explanation ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <AIResponsePreview content={explanation.explanation} />
                    </motion.div>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
      <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => toast("This feature is coming soon 🚧")}
  className="fixed bottom-8 right-8 z-20 w-14 h-14 rounded-full bg-orange-600 text-white shadow-xl flex items-center justify-center"
>
  <LuMessageCircle className="text-2xl" />
</motion.button>
    </DashboardLayout>
  );
};

export default InterviewPrep;
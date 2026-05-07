import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuSparkles, LuArrowRight, LuChevronDown, LuStar } from "react-icons/lu";
import { FiTarget, FiMessageCircle, FiTrendingUp, FiZap } from "react-icons/fi";

import HERO_IMG from "../assets/Hero_Image.png";
import { UserContext } from '../context/userContext';
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { APP_FEATURES } from "../utils/data";
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import { AnimatedTestimonialsDemo } from '../components/Testimonial';
import CompactFooter from '../components/Footer';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [isHovered, setIsHovered] = useState(false);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FFFCEF] to-amber-50 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 overflow-hidden pointer-events-none"
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              transition: {
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="absolute w-64 h-64 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full opacity-20 blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mr-3">
              <LuSparkles className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">
              UpskillMe AI
            </span>
          </motion.div>

          {/* Navigation Menu */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#features" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Pricing
            </a>
            <div className="flex items-center gap-1 text-gray-700 hover:text-orange-600 font-medium transition-colors cursor-pointer">
              Resources
              <LuChevronDown className="text-sm" />
            </div>
          </motion.nav>

          {user ? (
            <ProfileInfoCard />
          ) : (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => setOpenAuthModal(true)}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 bg-black text-sm font-semibold text-white px-6 py-2.5 rounded-full group-hover:bg-transparent transition-all duration-300 flex items-center">
                Login / Sign Up
                <LuArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          )}
        </header>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center mb-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-xs font-semibold bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full border border-orange-200 shadow-sm"
              >
                <LuSparkles className="text-base" />
                AI Powered Interview
              </motion.div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="block">Ace Your Next</span>
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "radial-gradient(circle, #FF9324 0%, #FCD760 100%)",
                  backgroundSize: "200% 200%",
                  animation: "text-shine 3s linear infinite"
                }}
              >
                Technical Interview
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Get role-specific interview questions, AI-powered feedback, and personalized coaching to
              transform your interview skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCTA}
                className="relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 bg-black text-white font-semibold px-8 py-3.5 rounded-full group-hover:bg-transparent transition-all duration-300 flex items-center">
                  Get Started Free
                  <LuArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-gray-800 font-semibold px-8 py-3.5 rounded-full border border-gray-200 hover:border-amber-300 transition-all duration-300 flex items-center shadow-sm"
              >
                See How It Works
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-white"></div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-amber-700">5000+</span> professionals boosted their careers
              </div>
            </motion.div>
          </motion.div>

          {/* Right Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="relative"
            >
              {/* Glow effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-300 to-orange-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-300 to-orange-500 rounded-3xl opacity-10 blur-lg"></div>

              {/* Preview Card */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 z-10">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white">
                        <LuSparkles className="text-lg" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Interview Prep AI</h3>
                        <p className="text-xs text-gray-500">Frontend Developer</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Logged</p>
                      <p className="text-sm font-semibold text-gray-800">Mike William</p>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-32 border-r border-gray-100 p-4 space-y-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-100 text-orange-700 text-sm font-medium cursor-pointer">
                      <FiTarget className="text-lg" />
                      <span className="hidden sm:inline">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer transition-colors">
                      <FiMessageCircle className="text-lg" />
                      <span className="hidden sm:inline">Interviews</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer transition-colors">
                      <LuSparkles className="text-lg" />
                      <span className="hidden sm:inline">AI Feedback</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer transition-colors">
                      <FiTrendingUp className="text-lg" />
                      <span className="hidden sm:inline">Resources</span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-6">
                    {/* Role Info */}
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-1">Frontend Developer</h4>
                      <div className="flex gap-2 flex-wrap">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">React.js - DOM Manipulation - CSS Flexbox</span>
                      </div>
                      <div className="flex gap-2 mt-2 text-xs text-gray-500">
                        <span>Experience: 2 years</span>
                        <span>•</span>
                        <span>Location: USA</span>
                        <span>•</span>
                        <span>Applied: 100-300 jobs</span>
                      </div>
                    </div>

                    {/* Questions List */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-800 mb-3 text-sm">Interview Q & A</h5>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {[
                          "What is JSX? Explain its role in React?",
                          "What is React.js and what are its main advantages?",
                          "Explain the difference between 'props' and 'state' in React",
                          "How does the virtual DOM work in React and why is it important?",
                          "Describe the lifecycle methods of a React component",
                          "What is the concept of event handling in React?",
                          "How would you handle DOM manipulation in React? Why is it generally discouraged?"
                        ].map((question, idx) => (
                          <div key={idx} className="text-xs text-gray-700 flex gap-2">
                            <span className="text-gray-400 font-medium">{idx + 1}</span>
                            <span className="text-gray-600">{question}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-2 text-sm">AI Feedback</h5>
                          <p className="text-xs text-green-700 bg-green-50 p-2 rounded">Great Answer</p>
                          <p className="text-xs text-gray-600 mt-2">You explained JSX clearly with a good example. Consider adding how it improves readability and helps prevent injection attacks.</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Score</p>
                          <p className="text-2xl font-bold text-green-600">8.5<span className="text-sm">/10</span></p>
                          <a href="#" className="text-xs text-blue-600 hover:text-blue-700 mt-2 inline-block">View Detailed Feedback</a>
                        </div>
                      </div>
                    </div>

                    {/* Related Resources */}
                    <div className="border-t border-gray-100 mt-4 pt-4">
                      <h5 className="font-semibold text-gray-800 mb-2 text-sm">Related Resources</h5>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600 flex items-center gap-2">
                          📄 <span>CSS Flexbox: A Beginner's Guide</span>
                        </p>
                        <p className="text-xs text-gray-600 flex items-center gap-2">
                          📄 <span>React Interview Cheat Sheet</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transform Your Interview Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides everything you need to go from nervous to confident.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center">
                  <FiTarget className="text-orange-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Role-Specific Preparation</h3>
              <p className="text-gray-600 text-sm">Practice questions tailored to your job role, tech stack, and experience level.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                  <FiMessageCircle className="text-blue-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Powered Feedback</h3>
              <p className="text-gray-600 text-sm">Get instant, detailed feedback and improve your answers in real-time.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center">
                  <FiTrendingUp className="text-red-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Track Your Progress</h3>
              <p className="text-gray-600 text-sm">Monitor your performance and identify areas to focus on for improvement.</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full flex items-center justify-center">
                  <FiZap className="text-yellow-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Build Confidence</h3>
              <p className="text-gray-600 text-sm">Practice smarter, not harder and walk into interviews with confidence.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedTestimonialsDemo />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-amber-600 mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who landed their dream jobs with our AI coach
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCTA}
              className="bg-black text-white font-semibold px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg flex items-center mx-auto"
            >
              Start Free Trial <LuArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}

      <CompactFooter />

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" ? (
          <Login setCurrentPage={setCurrentPage} />
        ) : (
          <SignUp setCurrentPage={setCurrentPage} />
        )}
      </Modal>
    </div>
  );
};

export default LandingPage;
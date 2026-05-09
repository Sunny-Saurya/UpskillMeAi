import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuSparkles, LuArrowRight, LuChevronDown, LuBell } from "react-icons/lu";
import { FiTarget, FiMessageCircle, FiTrendingUp, FiZap, FiAlertCircle } from "react-icons/fi";

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
    <div className="w-full bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-900 rounded flex items-center justify-center">
              <LuSparkles className="text-white text-sm" />
            </div>
            <span className="font-bold text-gray-900">UpskillMe AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <ProfileInfoCard />
            ) : (
              <>
                <button onClick={() => setOpenAuthModal(true)} className="text-gray-600 hover:text-gray-900 text-sm font-medium">Login</button>
                <motion.button
                  onClick={handleCTA}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  Start Free Trial
                  <LuArrowRight className="text-sm" />
                </motion.button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center max-w-3xl mx-auto">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium"
          >
            <LuBell className="w-4 h-4" />
            AI-Powered Interview Coach
            <span className="ml-1">For Everyone</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Ace Your Next Technical Interview
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Get role-specific interview questions, AI-powered feedback, and personalized coaching to transform your interview skills.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={handleCTA}
            className="bg-red-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2 mb-4"
          >
            <LuArrowRight className="w-4 h-4" />
            Start Your Free Trial
          </motion.button>

          {/* Trial Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-gray-500"
          >
            7 day free trial. No credit card required.
          </motion.p>

          {/* Product Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16"
          >
            <div className="relative">
              {/* Glow background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-red-200 via-orange-200 to-yellow-200 rounded-2xl opacity-20 blur-2xl"></div>
              
              {/* Main preview container */}
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xl">
                {/* Top bar */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-400 text-sm">UpskillMe AI - Interview Prep</span>
                  <div className="w-16"></div>
                </div>

                {/* Content grid */}
                <div className="grid md:grid-cols-3 gap-6 p-8">
                  {/* Left side - Features */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Your Progress</h3>
                      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Interview Readiness</span>
                            <span className="text-sm font-bold text-red-600">78%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" style={{width: '78%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Questions Practiced</span>
                            <span className="text-sm font-bold text-green-600">42/50</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '84%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature cards */}
                    <div className="grid gap-3">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                            <FiTarget className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">Role-Specific</h4>
                            <p className="text-xs text-gray-600">Tailored to Frontend Dev</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center flex-shrink-0">
                            <LuSparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">AI Feedback</h4>
                            <p className="text-xs text-gray-600">Real-time coaching</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center flex-shrink-0">
                            <FiTrendingUp className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">Track Progress</h4>
                            <p className="text-xs text-gray-600">Detailed analytics</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Interview Q&A */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Latest Question</h3>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                      <div>
                        <div className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">React.js</div>
                        <h4 className="font-bold text-gray-900 text-lg mb-3">Explain the Virtual DOM and its benefits in React</h4>
                        <p className="text-sm text-gray-600 mb-4">The Virtual DOM is a programming concept that keeps an in-memory representation of the real DOM...</p>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-700">Your Answer Score</span>
                          <span className="text-2xl font-bold text-green-600">8.5/10</span>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-xs text-green-700">✓ Great explanation with good examples. Consider mentioning reconciliation algorithm for more depth.</p>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium py-2 rounded-lg hover:shadow-lg transition-all"
                      >
                        View Detailed Feedback →
                      </motion.button>
                    </div>
                  </div>

                  {/* Right side - Analytics Dashboard */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Performance Analytics</h3>
                    <div className="space-y-4">
                      {/* Performance Chart */}
                      <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 p-6">
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-4">Weekly Performance</h4>
                          <div className="flex items-end justify-between gap-2 h-24">
                            <div className="flex-1 bg-gradient-to-t from-red-400 to-red-300 rounded-t-lg" style={{height: '60%'}} title="Mon"></div>
                            <div className="flex-1 bg-gradient-to-t from-red-300 to-red-200 rounded-t-lg" style={{height: '45%'}} title="Tue"></div>
                            <div className="flex-1 bg-gradient-to-t from-orange-400 to-orange-300 rounded-t-lg" style={{height: '75%'}} title="Wed"></div>
                            <div className="flex-1 bg-gradient-to-t from-orange-300 to-orange-200 rounded-t-lg" style={{height: '55%'}} title="Thu"></div>
                            <div className="flex-1 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg" style={{height: '85%'}} title="Fri"></div>
                            <div className="flex-1 bg-gradient-to-t from-green-400 to-green-300 rounded-t-lg" style={{height: '90%'}} title="Sat"></div>
                            <div className="flex-1 bg-gradient-to-t from-green-300 to-green-200 rounded-t-lg" style={{height: '70%'}} title="Sun"></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 p-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Achievements Unlocked</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <span className="text-2xl mb-1">🏆</span>
                            <p className="text-xs font-semibold text-gray-700">5-Day Streak</p>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="text-2xl mb-1">⚡</span>
                            <p className="text-xs font-semibold text-gray-700">50 Questions</p>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="text-2xl mb-1">🎯</span>
                            <p className="text-xs font-semibold text-gray-700">Perfect Score</p>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg border border-green-200">
                            <span className="text-2xl mb-1">🚀</span>
                            <p className="text-xs font-semibold text-gray-700">Interview Ready</p>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-lg border border-red-200 p-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-2">Average Score</p>
                          <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">8.7/10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats footer */}
                <div className="bg-gray-50 border-t border-gray-200 px-8 py-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">1,250+</div>
                    <p className="text-xs text-gray-600">Questions</p>
                  </div>
                  <div className="text-center border-l border-r border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">5,000+</div>
                    <p className="text-xs text-gray-600">Users</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">4.9★</div>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-sm font-semibold text-gray-600 mb-8 tracking-wide">TRUSTED BY PROFESSIONALS FROM</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {['Google', 'Microsoft', 'Amazon', 'Netflix', 'Meta'].map((company) => (
              <div key={company} className="text-gray-400 font-semibold">{company}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-red-600 text-sm font-semibold mb-4 tracking-wide">THE CHALLENGE</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Interview preparation without guidance is stressful.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Lack of Practice', description: 'Most candidates practice without real feedback, making it hard to identify improvement areas.' },
              { title: 'Generic Resources', description: 'Generic interview guides don\'t address your specific role and tech stack requirements.' },
              { title: 'Low Confidence', description: 'Without proper preparation, candidates enter interviews nervous and unprepared.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAlertCircle className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-red-600 text-sm font-semibold mb-4 tracking-wide">OUR SOLUTION</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Master Interviews with AI-Powered Coaching
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              UpskillMe AI provides personalized interview preparation with role-specific questions, real-time feedback, and AI coaching to help you land your dream job.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Role-Specific Questions', description: 'Practice with real interview questions tailored to your job role, tech stack, and experience level.' },
              { title: 'AI-Powered Feedback', description: 'Get instant, detailed feedback on your answers with suggestions for improvement in real-time.' },
              { title: 'Track Progress', description: 'Monitor your performance over time and identify areas to focus on for maximum improvement.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg border border-gray-200"
              >
                <h3 className="text-red-600 font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-red-600 text-sm font-semibold mb-4 tracking-wide">HOW IT WORKS</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Just 3 steps to ace your interview
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side - Steps */}
            <div className="space-y-12">
              {[
                { num: '1', title: 'Select Your Role', desc: 'Choose your target job role, experience level, and tech stack to get personalized questions.' },
                { num: '2', title: 'Practice with AI', desc: 'Answer interview questions and receive real-time AI-powered feedback and coaching.' },
                { num: '3', title: 'Ace Your Interview', desc: 'Build confidence with targeted practice and land your dream job.' }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex gap-8 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">{step.num}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right side - Visual Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="hidden md:flex justify-center items-center"
            >
              <div className="relative w-full max-w-sm h-96">
                {/* Background gradient circles */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl opacity-50"></div>
                
                {/* Main content box */}
                <div className="absolute inset-6 bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between">
                  {/* Top section */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">✓</div>
                      <span className="text-sm font-semibold text-gray-700">Interview Ready</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-red-600 to-orange-600 rounded-full"></div>
                    </div>
                  </div>

                  {/* Middle section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <p className="text-xs text-gray-600">Questions: <span className="font-semibold">42/50</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <p className="text-xs text-gray-600">Score: <span className="font-semibold">8.5/10</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <p className="text-xs text-gray-600">Sessions: <span className="font-semibold">12</span></p>
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">Ready!</div>
                    <p className="text-xs text-gray-500">You're interview ready</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-red-600 text-sm font-semibold mb-4 tracking-wide">SUCCESS STORIES</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Join thousands of successful candidates
            </h2>
          </motion.div>

          <AnimatedTestimonialsDemo />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-red-50">
        <div className="container mx-auto text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-red-600 text-sm font-semibold mb-4 tracking-wide">READY TO GET STARTED?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Start your free interview prep today.
            </h2>
            <motion.button
              onClick={handleCTA}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
            >
              Get started for free
              <LuArrowRight className="w-4 h-4" />
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
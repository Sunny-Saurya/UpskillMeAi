const express = require("express");
const { parseResume, generateResumeBasedQuestions } = require("../controllers/resumeController");
const { protect } = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Protected routes
router.post("/parse-resume", protect, uploadMiddleware.single("resume"), parseResume);
router.post("/generate-resume-questions", protect, generateResumeBasedQuestions);

module.exports = router;

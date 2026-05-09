const express = require("express");
const { parseResume, generateResumeBasedQuestions } = require("../controllers/resumeController");
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Protected routes
router.post("/parse-resume", authMiddleware, uploadMiddleware.single("resume"), parseResume);
router.post("/generate-resume-questions", authMiddleware, generateResumeBasedQuestions);

module.exports = router;

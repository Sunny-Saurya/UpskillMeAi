const express = require("express");
const { parseResume, generateResumeBasedQuestions } = require("../controllers/resumeController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// No multer needed — file is sent as base64 in JSON body
router.post("/parse-resume", protect, parseResume);
router.post("/generate-resume-questions", protect, generateResumeBasedQuestions);

module.exports = router;

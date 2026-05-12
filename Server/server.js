require("dotenv").config();

// === Startup Environment Check ===
console.log("=== Environment Variable Check ===");
console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY ? `SET (${process.env.OPENROUTER_API_KEY.substring(0, 10)}...)` : "NOT SET");
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "SET" : "NOT SET");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "SET" : "NOT SET");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "SET" : "NOT SET");
console.log("NODE_ENV:", process.env.NODE_ENV || "not set");
console.log("=================================");
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const questionRoutes = require("./routes/questionRoutes");

const { protect } = require("./middlewares/authMiddleware");

const { generateInterviewQuestions, generateConceptExplanation, generateMoreQuestions, generateCompanySpecificQuestions } = require("./controllers/aiController");
const app = express();

// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", resumeRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

// Smart routing: check if company-specific or general questions
app.post("/api/ai/generate-questions", protect, (req, res) => {
  if (req.body.isCompanySpecific || req.body.company) {
    generateCompanySpecificQuestions(req, res);
  } else {
    generateInterviewQuestions(req, res);
  }
});

app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);
app.use("/api/ai/upload-more-questions", protect, generateMoreQuestions);

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the UpSkillMe AI Backend!");
});

// === Health Check / Diagnostic Endpoint ===
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        env: {
            OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ? `SET (starts with ${process.env.OPENROUTER_API_KEY.substring(0, 8)}...)` : "NOT SET ❌",
            MONGODB_URI: process.env.MONGODB_URI ? `SET (starts with ${process.env.MONGODB_URI.substring(0, 8)}...)` : "NOT SET ❌",
            JWT_SECRET: process.env.JWT_SECRET ? `SET (starts with ${process.env.JWT_SECRET.substring(0, 8)}...)` : "NOT SET ❌",
            NODE_ENV: process.env.NODE_ENV || "not set",
        },
    });
});

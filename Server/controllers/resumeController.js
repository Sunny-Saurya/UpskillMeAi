const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// ===============================
// Parse Resume and Extract Skills
// ===============================
const parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;

    // Read the file
    let fileContent = "";
    if (fileName.endsWith(".pdf")) {
      // For PDF files, we'll just pass the path to the AI
      // In production, you'd use a PDF parser library
      fileContent = `[PDF Resume: ${fileName}]`;
    } else {
      // For text files, read content
      fileContent = fs.readFileSync(filePath, "utf-8");
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const prompt = `
Extract the following information from this resume and return as JSON:

Resume Content:
${fileContent.substring(0, 5000)}

Return a JSON object with:
{
  "name": "Person's name",
  "email": "Email if found",
  "summary": "Professional summary or objective (max 200 chars)",
  "totalExperience": "Total years of experience",
  "skills": ["skill1", "skill2", "skill3", ...],
  "roles": ["Job Role 1", "Job Role 2", ...],
  "companies": ["Company1", "Company2", ...],
  "keyAchievements": ["Achievement 1", "Achievement 2", ...]
}

Make sure to:
- Extract ALL technical and soft skills
- Include years of experience in each role
- Be accurate and comprehensive
- Return ONLY valid JSON, no extra text
`;

    console.log("Sending resume to OpenRouter for parsing...");

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.0-flash-lite-preview-02-05:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://upskillme-ai.onrender.com",
          "X-Title": "UpskillMe",
        },
        timeout: 60000,
      }
    );

    const rawText = response.data.choices[0].message.content;
    console.log("Resume Parsing Response:", rawText);

    // Extract JSON from response
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Could not parse resume - invalid response format");
    }

    const parsedData = JSON.parse(rawText.substring(start, end + 1));

    // Clean up uploaded file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({
      success: true,
      parsedData: {
        name: parsedData.name || "User",
        email: parsedData.email || "",
        summary: parsedData.summary || "",
        totalExperience: parsedData.totalExperience || "Unknown",
        roles: parsedData.roles || [],
        companies: parsedData.companies || [],
        keyAchievements: parsedData.keyAchievements || [],
      },
      skills: parsedData.skills || [],
    });
  } catch (error) {
    console.error("=== Resume Parse Error ===");
    console.error("Error Message:", error.message);
    console.error("Error Response:", error.response?.data);
    console.error("========================");

    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Failed to parse resume: " + error.message,
    });
  }
};

// ===============================
// Generate Questions Based on Resume
// ===============================
const generateResumeBasedQuestions = async (req, res) => {
  try {
    const {
      resumeData,
      skills,
      numberOfQuestions = 10,
    } = req.body;

    if (!resumeData || !skills || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Resume data and skills are required",
      });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const skillsText = skills.join(", ");
    const rolesText = resumeData.roles?.join(", ") || "Various";
    const companiesText = resumeData.companies?.join(", ") || "Various companies";

    const prompt = `
Generate ${numberOfQuestions} interview questions specifically tailored to this person's resume:

Name: ${resumeData.name}
Professional Summary: ${resumeData.summary}
Total Experience: ${resumeData.totalExperience}
Key Skills: ${skillsText}
Roles Held: ${rolesText}
Companies: ${companiesText}
Key Achievements: ${(resumeData.keyAchievements || []).join(", ")}

Generate questions that:
1. Are based on their specific experience and skills
2. Test their claimed expertise
3. Ask about specific achievements mentioned
4. Include behavioral and technical questions
5. Are role-appropriate based on their background

For each question:
- Mention which resume skill/role it tests in brackets [e.g. [Tests: Leadership]]
- Provide a sample answer that someone with their background could give

Rules:
- Return ONLY valid JSON array
- No markdown or extra text
- Each object must contain:
  - question
  - resumePoint (what from resume this tests)
  - answer (comprehensive sample answer)

Example:
[
  {
    "question": "You mentioned leading a team of 5 at Company XYZ. How did you improve their productivity?",
    "resumePoint": "Team Leadership - 5 years at Company XYZ",
    "answer": "At Company XYZ, I implemented daily standups and..."
  }
]
`;

    console.log("Generating resume-based questions...");

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.0-flash-lite-preview-02-05:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 3000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://upskillme-ai.onrender.com",
          "X-Title": "UpskillMe",
        },
        timeout: 60000,
      }
    );

    const rawText = response.data.choices[0].message.content;
    console.log("Resume Questions Response:", rawText);

    // Extract JSON
    const start = rawText.indexOf("[");
    const end = rawText.lastIndexOf("]");

    if (start === -1 || end === -1) {
      throw new Error("Invalid JSON response");
    }

    const data = JSON.parse(rawText.substring(start, end + 1));

    res.status(200).json({
      success: true,
      questions: data,
      resumeData,
      skills,
    });
  } catch (error) {
    console.error("=== Generate Resume Questions Error ===");
    console.error("Error Message:", error.message);
    console.error("Error Response:", error.response?.data);
    console.error("=====================================");

    res.status(500).json({
      success: false,
      message: "Failed to generate questions: " + error.message,
    });
  }
};

module.exports = {
  parseResume,
  generateResumeBasedQuestions,
};

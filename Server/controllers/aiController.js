// ===============================
// controllers/aiController.js
// ===============================

const axios = require("axios");

// ===============================
// Extract JSON Safely
// ===============================
const extractJSON = (rawText) => {
  try {
    const match = rawText.match(/\[[\s\S]*\]/);

    if (!match) {
      throw new Error("No JSON array found");
    }

    return JSON.parse(match[0]);
  } catch (err) {
    console.error("=== JSON PARSE ERROR ===");
    console.error("Error:", err.message);
    console.error("RAW RESPONSE:", rawText);
    console.error("========================");

    throw new Error("Invalid JSON response from AI");
  }
};

// ===============================
// OpenRouter API Helper
// ===============================
const callOpenRouter = async (prompt) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is missing");
  }

  console.log(
    "OPENROUTER_API_KEY EXISTS:",
    !!process.env.OPENROUTER_API_KEY
  );

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-3.5-turbo",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 4000,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },

      timeout: 60000,
      maxBodyLength: Infinity,
    }
  );

  return response.data.choices[0].message.content;
};

// ===============================
// Generate Interview Questions
// ===============================
const generateInterviewQuestions = async (
  req,
  res
) => {
  try {
    const {
      role,
      experience,
      topicsToFocus,
      numberOfQuestions = 10,
    } = req.body;

    console.log("REQUEST BODY:", req.body);

    if (
      !role ||
      !experience ||
      !topicsToFocus
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields",
      });
    }

    const prompt = `
Generate ${numberOfQuestions} interview questions with answers.

Role: ${role}
Experience: ${experience}
Topics: ${topicsToFocus}

Rules:
- Return ONLY valid JSON array
- No markdown
- No extra explanation

Format:
[
  {
    "question": "What is React?",
    "answer": "React is..."
  }
]
`;

    const rawText = await callOpenRouter(prompt);

    console.log(
      "QUESTIONS RESPONSE:",
      rawText
    );

    const data = extractJSON(rawText);

    return res.status(200).json({
      success: true,
      questions: data,
    });
  } catch (error) {
    console.error(
      "=== Generate Questions Error ==="
    );

    console.error(
      "Error Message:",
      error.message
    );

    console.error(
      "HTTP Status:",
      error.response?.status
    );

    console.error(
      "Response Data:",
      JSON.stringify(
        error.response?.data,
        null,
        2
      )
    );

    return res
      .status(
        error.response?.status || 500
      )
      .json({
        success: false,
        message:
          "Failed to generate questions",

        error:
          error.response?.data ||
          error.message,
      });
  }
};

// ===============================
// Generate Explanation
// ===============================
const generateConceptExplanation =
  async (req, res) => {
    try {
      const { question } = req.body;

      console.log(
        "REQUEST BODY:",
        req.body
      );

      if (!question) {
        return res.status(400).json({
          success: false,
          message:
            "Question is required",
        });
      }

      const prompt = `
Explain this interview question in detail.

Question:
${question}

Include:
- definition
- explanation
- code example
- best practices
- mistakes

Rules:
- Return ONLY valid JSON array
- No markdown

Format:
[
  {
    "title": "React State",
    "explanation": "State is...",
    "example": "const [count, setCount]"
  }
]
`;

      const rawText =
        await callOpenRouter(prompt);

      console.log(
        "EXPLANATION RESPONSE:",
        rawText
      );

      const data = extractJSON(rawText);

      return res.status(200).json({
        success: true,
        explanation: data[0],
      });
    } catch (error) {
      console.error(
        "=== Explanation Error ==="
      );

      console.error(
        "Error Message:",
        error.message
      );

      console.error(
        "HTTP Status:",
        error.response?.status
      );

      console.error(
        "Response Data:",
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );

      return res
        .status(
          error.response?.status || 500
        )
        .json({
          success: false,
          message:
            "Failed to generate explanation",

          error:
            error.response?.data ||
            error.message,
        });
    }
  };

// ===============================
// Generate More Questions
// ===============================
const generateMoreQuestions = async (
  req,
  res
) => {
  return generateInterviewQuestions(
    req,
    res
  );
};

// ===============================
// Generate Company Questions
// ===============================
const generateCompanySpecificQuestions =
  async (req, res) => {
    try {
      const {
        role,
        experience,
        topicsToFocus,
        company,
        roleType,
        numberOfQuestions = 10,
      } = req.body;

      if (
        !role ||
        !experience ||
        !topicsToFocus ||
        !company ||
        !roleType
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Missing required fields",
        });
      }

      const prompt = `
Generate ${numberOfQuestions} ${company} interview questions.

Role: ${role}
Role Type: ${roleType}
Experience: ${experience}
Topics: ${topicsToFocus}

Rules:
- Return ONLY valid JSON array
- No markdown

Format:
[
  {
    "question": "Question",
    "answer": "Answer",
    "difficulty": "Medium",
    "category": "Technical"
  }
]
`;

      const rawText =
        await callOpenRouter(prompt);

      console.log(
        "COMPANY RESPONSE:",
        rawText
      );

      const data = extractJSON(rawText);

      return res.status(200).json({
        success: true,
        company,
        roleType,
        questions: data,
      });
    } catch (error) {
      console.error(
        "=== Company Questions Error ==="
      );

      console.error(
        "Error Message:",
        error.message
      );

      console.error(
        "HTTP Status:",
        error.response?.status
      );

      console.error(
        "Response Data:",
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );

      return res
        .status(
          error.response?.status || 500
        )
        .json({
          success: false,
          message:
            "Failed to generate company questions",

          error:
            error.response?.data ||
            error.message,
        });
    }
  };

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
  generateMoreQuestions,
  generateCompanySpecificQuestions,
};
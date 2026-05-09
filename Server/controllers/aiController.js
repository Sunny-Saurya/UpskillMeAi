const axios = require("axios");

// ===============================
// Extract JSON safely
// ===============================
const extractJSON = (rawText) => {
  const start = rawText.indexOf("[");
  const end = rawText.lastIndexOf("]");

  if (start !== -1 && end !== -1) {
    return JSON.parse(rawText.substring(start, end + 1));
  }

  throw new Error("Invalid JSON response");
};

// ===============================
// Generate Interview Questions
// ===============================
const generateInterviewQuestions = async (req, res) => {
  try {
    const {
      role,
      experience,
      topicsToFocus,
      numberOfQuestions = 10,
    } = req.body;

    if (!role || !experience || !topicsToFocus) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: role, experience, topicsToFocus",
      });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
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
- Each object must contain:
  - question
  - answer

Example:
[
  {
    "question": "What is React?",
    "answer": "React is a JavaScript library used for building user interfaces."
  },
  {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine."
  }
]
`;

    console.log("Sending request to OpenRouter API...");

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/auto",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://upskillme-ai.onrender.com",
        },
        timeout: 30000,
      }
    );

    const rawText =
      response.data.choices[0].message.content;

    console.log("QUESTIONS RESPONSE:", rawText);

    const data = extractJSON(rawText);

    res.status(200).json({
      success: true,
      questions: data,
    });
  } catch (error) {
    console.error(
      "Generate Questions Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to generate questions: " + (error.response?.data?.error?.message || error.message),
    });
  }
};

// ===============================
// Generate Concept Explanation
// ===============================
const generateConceptExplanation = async (
  req,
  res
) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const prompt = `
Explain this interview question in very deep detail for interview preparation.

Include:
- definition
- real-world analogy
- why it is important
- detailed explanation
- code example
- best practices
- common mistakes

Make explanation beginner-friendly but detailed.

Question:
${question}

Rules:
- Return ONLY valid JSON
- No markdown
- No extra text

Format:
[
  {
    "title": "React State",
    "explanation": "State in React is used to store dynamic data inside components...",
    "example": "Example: const [count, setCount] = useState(0)"
  }
]
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawText =
      response.data.choices[0].message.content;

    console.log("EXPLANATION RESPONSE:", rawText);

    const data = extractJSON(rawText);

    res.status(200).json(data[0]);
  } catch (error) {
    console.error(
      "Generate Explanation Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to generate explanation",
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
  return generateInterviewQuestions(req, res);
};

// ===============================
// Generate Company-Specific Questions
// ===============================
const generateCompanySpecificQuestions = async (req, res) => {
  try {
    const {
      role,
      experience,
      topicsToFocus,
      company,
      roleType,
      numberOfQuestions = 10,
    } = req.body;

    if (!role || !experience || !topicsToFocus || !company || !roleType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: role, experience, topicsToFocus, company, roleType",
      });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    // Company-specific interview patterns and focus areas
    const companyPatterns = {
      "Google": "Focus on algorithms, system design, and scalability. Google values optimal solutions and big-O analysis.",
      "Amazon": "Focus on leadership principles, scalability, and customer obsession. Amazon emphasizes 'bar raiser' mentality.",
      "Microsoft": "Focus on problem-solving approach, product thinking, and cloud technologies. Microsoft values collaboration.",
      "Meta": "Focus on fast iteration, technical depth, and impact. Meta values engineers who can move fast.",
      "Apple": "Focus on attention to detail, quality, and user experience. Apple emphasizes precision and craftsmanship.",
      "Netflix": "Focus on performance, streaming technology, and data-driven decisions. Netflix values ownership.",
      "Tesla": "Focus on optimization, hardware-software integration, and innovation. Tesla values impact.",
      "Uber": "Focus on distributed systems, geo-spatial problems, and real-time processing.",
      "Airbnb": "Focus on product design thinking, full-stack capabilities, and user empathy.",
      "LinkedIn": "Focus on networking algorithms, data at scale, and professional networking concepts.",
    };

    const companyPattern = companyPatterns[company] || "Focus on general problem-solving and technical skills.";

    const prompt = `
Generate ${numberOfQuestions} interview questions tailored specifically for ${company}'s interview process for a ${roleType} role.

Context:
- Company: ${company}
- Role Type: ${roleType}
- Job Role: ${role}
- Experience: ${experience} years
- Topics: ${topicsToFocus}
- Company Focus: ${companyPattern}

Instructions:
1. Generate questions that match ${company}'s known interview patterns and focus areas
2. Include company-specific technologies and challenges if applicable
3. Mix behavioral, technical, and system design questions
4. Consider the ${roleType} specific skills required
5. Questions should reflect the company's culture and interview style

Rules:
- Return ONLY valid JSON array
- No markdown, no extra explanation
- Each object MUST contain:
  - question: The interview question
  - answer: Comprehensive answer or approach
  - difficulty: "Easy", "Medium", or "Hard"
  - category: "Behavioral", "Technical", or "System Design"

Example format:
[
  {
    "question": "How would you design X at ${company} scale?",
    "answer": "Start by understanding requirements...",
    "difficulty": "Hard",
    "category": "System Design"
  }
]
`;

    console.log("Sending company-specific request to OpenRouter API for", company);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/auto",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://upskillme-ai.onrender.com",
        },
        timeout: 30000,
      }
    );

    const rawText = response.data.choices[0].message.content;

    console.log("COMPANY-SPECIFIC QUESTIONS RESPONSE:", rawText);

    const data = extractJSON(rawText);

    res.status(200).json({
      success: true,
      questions: data,
      company,
      roleType,
    });
  } catch (error) {
    console.error(
      "Generate Company-Specific Questions Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to generate company-specific questions: " + (error.response?.data?.error?.message || error.message),
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
  generateMoreQuestions,
  generateCompanySpecificQuestions,
};
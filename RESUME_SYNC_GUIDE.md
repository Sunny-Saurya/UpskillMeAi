# Resume-AI Interview Sync Feature Guide

## 🎯 Overview
Resume-AI Interview Sync lets users upload their resume and get personalized interview questions based on their actual experience, skills, and achievements.

## ✨ Features Implemented

### 1. **Resume Upload & Parsing**
- Upload PDF or Word documents
- AI extracts:
  - Name
  - Professional summary
  - Total experience
  - Technical and soft skills
  - Previous roles and companies
  - Key achievements

### 2. **Skill Extraction**
- Automatically identifies 20+ relevant skills from resume
- Displays as interactive skill tags
- Uses extracted skills to generate questions

### 3. **Resume-Based Question Generation**
- AI generates interview questions specifically tailored to:
  - User's actual job roles
  - Companies they've worked for
  - Skills they claim
  - Achievements mentioned
- Each question includes:
  - The question itself
  - Which resume point it tests (e.g., "Team Leadership - 5 years at Company XYZ")
  - Sample answer tailored to their experience

### 4. **User Interface**
- Clean, intuitive upload interface
- Real-time file validation
- Visual confirmation of parsed data
- Direct "Start Interview" button

## 🚀 How to Use

### Step 1: Navigate to Resume Sync
1. Go to Dashboard
2. Click on "Resume Sync" in the sidebar (new menu item)
3. Or click "Resume-Based Interview" button from Interviews page

### Step 2: Upload Resume
1. Click "Choose File" button
2. Select your PDF or Word document
3. File will appear in the upload area
4. Click "Parse Resume" button

### Step 3: Review Extracted Data
- See your name, professional summary, and experience
- Review all extracted skills
- Verify the AI correctly identified your background

### Step 4: Start Interview
- Click "Start Interview with Resume Sync" button
- Answer questions customized to your experience
- Learn from model answers based on your background

## 🛠️ Tech Stack

### Frontend
- React component: `ResumeUpload.jsx`
- Upload handling with FormData API
- Real-time file validation
- Integration with existing dashboard layout

### Backend
- Controller: `resumeController.js`
  - `parseResume()`: Parses uploaded resume
  - `generateResumeBasedQuestions()`: Generates tailored questions
- Routes: `resumeRoutes.js`
- Middleware: Auth + File upload handling
- AI: OpenRouter API for parsing and question generation

### Database
- Session model can be extended to store resume reference if needed
- Currently stores resume data in request/response

## 📋 API Endpoints

### Parse Resume
```
POST /api/auth/parse-resume
Content-Type: multipart/form-data
Authorization: Bearer <token>

FormData:
- resume: File (PDF or Word)

Response:
{
  "success": true,
  "parsedData": {
    "name": "John Doe",
    "email": "john@example.com",
    "summary": "...",
    "totalExperience": "5 years",
    "roles": ["Senior Engineer", "Developer"],
    "companies": ["Tech Corp", "StartUp Inc"],
    "keyAchievements": [...]
  },
  "skills": ["JavaScript", "React", "Node.js", ...]
}
```

### Generate Resume-Based Questions
```
POST /api/ai/generate-resume-questions
Authorization: Bearer <token>

Body:
{
  "resumeData": { ... },
  "skills": ["JavaScript", "React", ...],
  "numberOfQuestions": 10
}

Response:
{
  "success": true,
  "questions": [
    {
      "question": "...",
      "resumePoint": "...",
      "answer": "..."
    }
  ]
}
```

## 🎨 UI Components

### New Components
- `ResumeUpload.jsx` - Main resume upload page
- `Interviews.jsx` - Interview sessions management

### Updated Components
- `Sidebar.jsx` - Added "Resume Sync" menu item
- `App.jsx` - Added routes for new pages
- `apiPaths.js` - Added API endpoint paths
- `server.js` - Registered new routes

## 🧪 Testing Checklist

- [ ] Upload a valid PDF resume
- [ ] Upload a valid Word document
- [ ] Verify file validation (reject non-PDF/Word)
- [ ] Check extracted skills display correctly
- [ ] Verify name and experience extraction
- [ ] Generate questions and check they're resume-specific
- [ ] Test on mobile (responsive design)
- [ ] Test on desktop (full layout)
- [ ] Test error handling (no file, parsing error)
- [ ] Verify questions are actually different from generic questions

## 💡 Future Enhancements

1. **Resume Matching Score**
   - Show how well resume matches job description
   - Highlight missing skills

2. **Interview Performance Analytics**
   - Track how well user answers resume-based vs generic questions
   - Identify areas to improve based on resume

3. **Auto-Resume Update**
   - Generate resume from interview answers
   - Track new skills learned

4. **Resume Comparison**
   - Compare multiple resumes
   - Version control for resume changes

5. **AI Feedback**
   - Analyze answers against resume claims
   - Flag inconsistencies

## ⚙️ Configuration

### Environment Variables
- `OPENROUTER_API_KEY` - Required for AI parsing

### File Upload Limits
- Default: 5MB (configured in uploadMiddleware.js)
- Supported formats: PDF, DOCX, DOC

### AI Model
- Currently using: `openrouter/auto` (auto-selects best available model)
- Can be changed to specific model if preferred

## 🐛 Troubleshooting

### Resume not parsing correctly
- Ensure file is in PDF or Word format
- Check file size (max 5MB)
- Try with simpler resume format (less graphics, tables)

### Skills not extracted
- Resume might use non-standard format
- Try uploading as plaintext
- Skills should be clearly listed

### Questions too generic
- Provide more detailed resume information
- Include specific company names and role titles
- Add more achievements and metrics

### API errors
- Check OpenRouter API key is set
- Verify internet connection
- Check OpenRouter service status
- Review server logs for detailed errors

## 📞 Support

For issues or questions:
1. Check server logs for error messages
2. Verify all required files are uploaded
3. Test with sample resume
4. Check network requests in browser DevTools

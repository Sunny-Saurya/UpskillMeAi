# Deployment & Environment Configuration

## Local Development

1. **Backend Setup:**
   - Navigate to the `Server` directory
   - Create a `.env` file with required variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     GEMINI_API_KEY=your_gemini_api_key
     ```
   - Run: `npm install && npm start`

2. **Frontend Setup:**
   - Navigate to the `Client` directory
   - The `.env.local` file is already configured for local development (http://localhost:5000)
   - Run: `npm install && npm run dev`

## Production Deployment

### Frontend (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com)
2. Connect your GitHub repository
3. In project settings, add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: Your production backend URL (e.g., `https://your-backend-url.com`)
4. Deploy

### Backend (Choose one option)

#### Option 1: Render.com
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
4. Deploy

#### Option 2: Railway.app
1. Connect GitHub repository
2. Create new project
3. Set environment variables in project settings
4. Deploy

#### Option 3: Heroku (Legacy)
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set MONGODB_URI=your_uri
```

## Important Notes
- Never commit `.env` or `.env.local` files (they're in `.gitignore`)
- Keep `VITE_API_URL` empty or use relative paths (`/api/*`) if backend is on same domain
- Ensure CORS is configured properly on backend for your frontend domain

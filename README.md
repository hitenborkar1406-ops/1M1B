# EcoSort AI

AI-assisted waste classification and sustainability guidance for campuses and communities.

## Run Locally

**Prerequisites:** Node.js 22 or newer

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a local environment file from the template:
   ```bash
   copy .env.example .env.local
   ```
3. Set `GEMINI_API_KEY` in `.env.local` for live Gemini classification. The app uses a fallback response when no key is configured.
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000.

## Other commands

```bash
npm run lint   # Type-check the project
npm run build  # Build the client and production server
npm start      # Start the production server after building
```

Never commit `.env.local` or any file containing API keys.

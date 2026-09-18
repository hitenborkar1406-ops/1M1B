# Antigravity Agent Guidelines & Project Instructions: EcoSort AI

## Project Identity & Mission
**EcoSort AI** is a full-stack sustainable waste management platform developed for universities, smart campuses, and households, aligned with **UN SDG 12 (Responsible Consumption & Production)** and **SDG 11 (Sustainable Cities & Communities)**, recognized within the **1M1B & IBM SkillsBuild Responsible AI** fellowship.

For the exhaustive architectural, API, and life-cycle specifications, refer to `/ANTIGRAVITY.md`.

---

## Strict Architectural Directives

1. **Full-Stack Architecture (Express + Vite)**:
   - All client traffic routes through Port `3000` (`0.0.0.0:3000`).
   - The backend server is `/server.ts`. It serves `/api/*` endpoints first and mounts Vite middleware in development or static `dist` in production.
   - Never alter the port `3000` binding or remove the `0.0.0.0` host.

2. **API Key Security (`GEMINI_API_KEY`)**:
   - The Gemini API key MUST remain strictly server-side inside `server.ts` via `process.env.GEMINI_API_KEY`.
   - Never expose `GEMINI_API_KEY` to the client browser or prefix it with `VITE_`.
   - Never create custom client UI fields or modal dialogues requesting users to input an API key.

3. **Gemini Models Strategy**:
   - **`gemini-3.8-flash`**: Primary model for multimodal image classification, computer vision, and the default zero-waste advisor.
   - **`gemini-3.1-pro-preview`**: Dedicated model for Life Cycle Assessment (LCA) deep audits and institutional policy blueprints (`/api/deep-think`), configured with `ThinkingLevel.HIGH` and NO `maxOutputTokens`.
   - **`gemini-3.1-flash-lite`**: Ultra-fast sorting model for rapid bin decisions (2–3 bullet points) in the chatbot.
   - **`gemini-3.5-flash`**: Circular DIY upcycling and craft repurposing suggestions.
   - When calling `@google/genai`, use the standard modern SDK import (`import { GoogleGenAI, ThinkingLevel } from "@google/genai"`).

4. **Resilient Fallback Mode**:
   - If `GEMINI_API_KEY` is not present or an API call fails, the server MUST return deterministic, rich mock data from internal knowledge generators rather than throwing unhandled 500 errors.
   - This ensures live demonstrations, previews, and tests run smoothly at all times.

5. **Styling & UI Standards**:
   - Styling is strictly powered by **Tailwind CSS** using `@import "tailwindcss";` in `/src/index.css`.
   - All icons MUST be imported from `lucide-react`.
   - Color palettes must strictly adhere to the standardized municipal waste streams:
     - Blue: `#2563EB` (Clean Dry Recyclables)
     - Green: `#16A34A` (Wet Organic / Compost)
     - Red: `#DC2626` (E-Waste / Hazardous)
     - Black: `#334155` (Sanitary / Landfill Residual)
     - Yellow: `#CA8A04` (Specialized Institutional)

6. **Metadata & Entry Points**:
   - Keep `/metadata.json`, `/index.html` title and description synchronized.
   - Do NOT add extraneous pages or rewrite core layouts without user request.

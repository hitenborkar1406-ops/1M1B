# EcoSort AI — Complete Antigravity Project & Architectural Specification

> **Project Name:** EcoSort AI  
> **Tagline:** Smart Campus & Household Waste Segregation, Contamination Detection, and Circular Upcycling Advisor  
> **Global Mandate:** United Nations Sustainable Development Goals — **SDG 12 (Responsible Consumption & Production)** & **SDG 11 (Sustainable Cities & Communities)**  
> **Initiative Alignment:** 1M1B (One Million for One Billion) & IBM SkillsBuild Responsible AI Fellowship  
> **Runtime Environment:** Full-Stack Node.js (Express) + React 18 (Vite SPA) + Tailwind CSS + Google GenAI SDK  
> **Host / Port:** `0.0.0.0:3000` (Reverse-proxied single container ingress)

---

## 1. Executive Summary & Problem Statement

Globally, over **2.01 billion tonnes** of municipal solid waste are generated annually, with at least 33% mismanaged through open dumping or burning. Even in institutions with established multi-bin collection (Blue/Green/Red/Black), **contamination rates frequently exceed 25% to 40%**. A single greasy pizza box tossed into a paper recycling bin can spoil entire pulping batches at a Material Recovery Facility (MRF); lithium-ion batteries and electronic scraps hidden in domestic bags trigger catastrophic facility fires; and organic waste decaying in anaerobic landfills generates potent methane ($CH_4$).

**EcoSort AI** solves this systemic challenge at the source:
1. **Instant Multimodal Computer Vision Classification**: Students, staff, and citizens take a photo or enter an item description to receive real-time material decomposition, exact municipal/campus bin designation, and actionable preparation steps.
2. **Source Contamination Detection**: Identifies grease, moisture, composite plastics, foil liners, and hazardous residues *before* disposal occurs, instructing the user on separation (e.g., removing soiled cardboard from clean box lids).
3. **Circular DIY Upcycling & Waste Prevention**: Recommends creative, zero-cost upcycling ideas, extending product lifecycles and encouraging resource reuse.
4. **Deep Life Cycle Assessment (LCA) & Institutional Audits**: Powered by Gemini 3.1 Pro with High Thinking mode to generate quantitative LCA evaluations, MRF purity metrics, and campus zero-waste policy frameworks.
5. **Multi-Turn Adaptive Gemini Chatbot**: An interactive AI assistant featuring 4 specialized operational personas (Zero-Waste Advisor, Fast Bin Sorter, Circular DIY Crafter, and LCA Policy Auditor).
6. **Campus Zero-Waste Impact Tracking & Nearby Drop-Off Locator**: Aggregates community diversion stats (CO2e avoided, water preserved, landfill mass saved) and geolocates authorized regional recycling depots.

---

## 2. Gemini AI Models & Task Allocation Matrix

EcoSort AI leverages Google's state-of-the-art Gemini models using the modern `@google/genai` TypeScript SDK:

| Model Identifier | Primary Responsibility | Architectural Placement | Rationale & Configuration |
| :--- | :--- | :--- | :--- |
| **`gemini-3.8-flash`** | Multimodal Waste Classification & Vision | `/api/classify` | Outstanding multimodal comprehension; processes base64 camera frames alongside complex JSON schema instructions at low latency (<1.2s). `temperature: 0.2`, `responseMimeType: application/json`. |
| **`gemini-3.1-pro-preview`** | High Thinking Life Cycle Assessment (LCA) & Policy Blueprinting | `/api/deep-think`, `/api/chat` (Auditor Persona) | Complex reasoning and institutional policy synthesis. Configured with `thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }` and **no** `maxOutputTokens` restriction. |
| **`gemini-3.1-flash-lite`** | Instant Bin Sorting & Fast Guidance | `/api/chat` (Fast Sorter Persona) | Ultra-low latency, token-efficient model designed for high-frequency queries where users need 2–3 immediate sorting bullet points. |
| **`gemini-3.5-flash`** | Circular DIY Upcycling & Repurposing Engine | `/api/chat` (Upcycler Persona) | Balances expressive creativity with structural guidance for step-by-step craft tutorials and resource savings calculations. |

---

## 3. System Architecture & Container Ingress

```
                   +-------------------------------------------------------------+
                   |                     CLIENT (Browser / Tab)                  |
                   |                                                             |
                   |  [WebRTC Camera]    [Drag & Drop UI]   [Preset Item Cards]  |
                   |  [Classification]   [Campus Metrics]   [Presentation Deck]  |
                   |  [Drop-Off Depot]   [High LCA Audit]   [Multi-Turn Chatbot] |
                   +-----------------------------+-------------------------------+
                                                 | HTTP POST / GET (JSON)
                                                 v
                   +-------------------------------------------------------------+
                   |            EXPRESS NODE.JS SERVER (server.ts)               |
                   |                 (Port 3000 / Host 0.0.0.0)                  |
                   |                                                             |
                   |  - /api/health        : Health check & key validation       |
                   |  - /api/classify      : Multimodal computer vision sorting  |
                   |  - /api/deep-think    : High-thinking LCA & policy audit    |
                   |  - /api/chat          : Multi-turn persona conversations    |
                   |  - Vite Middleware    : SPA client asset bundling & serving |
                   |  - Fallback Engine    : Resilient offline mock responses    |
                   +-----------------------------+-------------------------------+
                                                 | Server-side API Secret (GEMINI_API_KEY)
                                                 v
                   +-------------------------------------------------------------+
                   |                 GOOGLE GEMINI API ENDPOINTS                 |
                   |                                                             |
                   |  - gemini-3.8-flash       (Vision & Multimodal JSON)        |
                   |  - gemini-3.1-pro-preview (ThinkingLevel.HIGH Analysis)     |
                   |  - gemini-3.1-flash-lite  (Rapid segregation decisions)    |
                   |  - gemini-3.5-flash       (Creative circular upcycling)     |
                   +-------------------------------------------------------------+
```

### Key Security & Network Constraints
- **Port 3000 Ingress**: External traffic routes exclusively through Port 3000 via nginx proxy.
- **Server-Side API Key Protection**: The `GEMINI_API_KEY` is loaded exclusively inside `server.ts` via `process.env.GEMINI_API_KEY`. It is **never** prefixed with `VITE_` and never transmitted to the browser client.
- **Offline Reliability Guarantee**: If `GEMINI_API_KEY` is omitted or quota is exhausted, every endpoint gracefully falls back to deterministic local knowledge algorithms, ensuring the application remains interactive.

---

## 4. REST API Endpoint Specifications

### 4.1 `GET /api/health`
Validates container status and API key availability.
- **Response:**
  ```json
  {
    "status": "ok",
    "hasKey": true,
    "timestamp": "2026-09-18T12:00:00.000Z"
  }
  ```

---

### 4.2 `POST /api/classify`
Processes images (Base64 JPEG/PNG) and/or text item descriptions to classify waste materials.
- **Request Payload:**
  ```json
  {
    "textQuery": "Cardboard pizza box with residual cheese",
    "imageBase64": "data:image/jpeg;base64,...",
    "mimeType": "image/jpeg"
  }
  ```
- **Response Payload (`ClassificationResult`):**
  ```json
  {
    "itemName": "Soiled Cardboard Pizza Box",
    "confidenceScore": 94,
    "primaryCategory": "Dry / Recyclable & Organic Split",
    "binColorCode": "blue",
    "binName": "Blue Bin (Clean Recyclables) / Green Bin (Soiled Cardboard)",
    "materialComposition": [
      "Corrugated Paper Pulp",
      "Food Grease & Dairy Residuals",
      "Wax Adhesive"
    ],
    "contaminationWarning": {
      "isRisk": true,
      "details": "Grease and food oils cannot be separated from paper fibers during hydro-pulping, ruining recycling batches.",
      "preventionStep": "Tear off the unsoiled top lid for the Blue Recycling Bin; compost or discard the greasy bottom."
    },
    "stepByStepDisposal": [
      "1. Open box and scrape out all leftover food scraps.",
      "2. Separate the clean top lid from the oil-stained bottom tray.",
      "3. Place clean lid into Blue Recycling Bin.",
      "4. Place greasy bottom into Green Organic/Compost Bin."
    ],
    "upcyclingIdeas": [
      {
        "title": "Garden Sheet Mulching",
        "description": "Shred clean cardboard layers under mulch to suppress weeds and retain soil moisture.",
        "difficulty": "Easy",
        "savedCostOrUtility": "Saves $15 on commercial landscape weed barriers"
      }
    ],
    "sustainabilityImpact": {
      "co2eSavedKg": 0.42,
      "landfillDivertedKg": 0.28,
      "waterPreservedLiters": 18,
      "ecoPoints": 35
    },
    "sdgAlignment": {
      "primaryGoal": "SDG 12: Responsible Consumption and Production",
      "target": "Target 12.5: Substantially reduce waste generation through prevention, reduction, recycling, and reuse",
      "summary": "Source separation of contaminated fibers preserves recycling pulp quality and prevents landfill emissions."
    },
    "funFact": "Recycling 1 ton of clean cardboard saves 46 gallons of oil, 4,000 kW of energy, and 9 cubic yards of landfill space."
  }
  ```

---

### 4.3 `POST /api/deep-think`
Executes an in-depth institutional Life Cycle Assessment (LCA) and campus zero-waste policy audit via `gemini-3.1-pro-preview` with `ThinkingLevel.HIGH`.
- **Request Payload:**
  ```json
  {
    "query": "Conduct full cradle-to-cradle LCA and campus food packaging phase-out strategy",
    "contextItem": "Single-use Polyethylene Terephthalate (PET) Cold Cups"
  }
  ```
- **Response Payload:**
  ```json
  {
    "analysis": "### 1. End-to-End Lifecycle Assessment (LCA)...\n### 2. Contamination Economics at MRFs...\n### 3. Institutional Campus Policy Blueprint...",
    "modelUsed": "gemini-3.1-pro-preview (ThinkingLevel.HIGH)"
  }
  ```

---

### 4.4 `POST /api/chat`
Provides conversational multi-turn AI advice with 4 specialized personas.
- **Request Payload:**
  ```json
  {
    "messages": [
      { "role": "user", "content": "How do I safely dispose of a swollen laptop battery?" }
    ],
    "persona": "auditor",
    "modelPreference": "gemini-3.1-pro-preview"
  }
  ```
- **Supported Personas:**
  1. `advisor`: Friendly, encouraging zero-waste consultant (`gemini-3.8-flash`).
  2. `fast_sorter`: Instant 2–3 bullet bin decisions with zero filler (`gemini-3.1-flash-lite`).
  3. `upcycler`: Creative DIY maker for zero-cost repurposing (`gemini-3.5-flash`).
  4. `auditor`: Senior LCA materials engineer and campus policy strategist (`gemini-3.1-pro-preview`).
- **Response Payload:**
  ```json
  {
    "reply": "⚠️ **CRITICAL HAZARD: Thermal Runaway Risk**\n\n1. Do NOT press, puncture, or throw in general trash...",
    "modelUsed": "gemini-3.1-pro-preview"
  }
  ```

---

## 5. Frontend Component Architecture

All UI components reside in `/src/components` with TypeScript strictness and Tailwind CSS:

```
src/
├── App.tsx                     # Main layout, state orchestrator, persistent audit history
├── main.tsx                    # React 18 DOM mount point
├── index.css                   # Global Tailwind CSS (@import "tailwindcss";)
├── types.ts                    # Strict TypeScript types and interfaces
├── data/
│   ├── dropOffLocations.ts     # Verified campus & municipal drop-off centers with geo coordinates
│   └── sampleItems.ts          # Curated preset library (coffee cups, electronics, pizza boxes, etc.)
└── components/
    ├── Navbar.tsx              # Brand logo, global metrics, theme toggle, modal launchers
    ├── CameraScanner.tsx       # WebRTC viewfinder, file dropzone, text input, preset carousel
    ├── ResultCard.tsx          # Comprehensive audit card, bin color pills, contamination alert, LCA triggers
    ├── DeepThinkingModal.tsx   # Full-screen Gemini 3.1 Pro High Thinking exploration modal
    ├── GeminiChatbot.tsx       # Floating & modal multi-turn conversational AI with persona switcher
    ├── PresentationModal.tsx   # 8-slide executive pitch deck for competitions/judges (1M1B/IBM)
    ├── NearbyDropOffModal.tsx  # Geolocation depot finder with interactive search and category filters
    └── CampusDashboard.tsx     # Metrics strip, community diversion trends, recent audit stream
```

---

## 6. Color Code & Municipal Bin Standardization

EcoSort AI adheres to global and municipal bin color protocols:

| Bin Color | Hex Token | Standard Stream | Allowed Items | Strict Exclusions |
| :--- | :--- | :--- | :--- | :--- |
| **Blue** | `#2563EB` | **Clean Dry Recyclables** | Paper, cardboard, PET bottles, clean aluminum cans, HDPE containers | Food-stained paper, liquids, e-waste, biological waste |
| **Green** | `#16A34A` | **Wet Organic & Compost** | Fruit peels, leftover cooked food, garden trimmings, unbleached soiled napkins | Plastic bags, metal cutlery, treated wood, glass |
| **Red** | `#DC2626` | **E-Waste & Toxic Hazardous** | Lithium batteries, fluorescent tubes, broken circuit boards, chemical containers | General trash, wet organic scrap, paper pulp |
| **Black** | `#334155` | **Sanitary & Landfill Residual** | Multi-laminate chip bags, styrofoam foam peanuts, sanitary wipes, broken ceramics | Clean recyclables, rechargeable batteries, compostables |
| **Yellow** | `#CA8A04` | **Specialized Institutional Streams** | Medical sharps, laboratory glass, confidential document shredding | Standard domestic trash |

---

## 7. United Nations SDG Alignment Matrix

### 🎯 SDG 12: Responsible Consumption and Production
- **Target 12.5**: By 2030, substantially reduce waste generation through prevention, reduction, recycling, and reuse.
  - *EcoSort AI Implementation*: Real-time contamination warnings prevent down-cycling and rejected MRF truckloads; DIY upcycling suggestions extend product lifespan.
- **Target 12.8**: Ensure that people everywhere have relevant information and awareness for sustainable development and lifestyles in harmony with nature.
  - *EcoSort AI Implementation*: Fun educational facts, LCA summaries, and transparent carbon/water savings metrics empower conscious daily decisions.

### 🏙️ SDG 11: Sustainable Cities and Communities
- **Target 11.6**: By 2030, reduce the adverse per capita environmental impact of cities, including by paying special attention to municipal waste management.
  - *EcoSort AI Implementation*: Geo-located specialized drop-off points direct toxic batteries, electronics, and compostables away from municipal stormwater and illegal open landfills.

---

## 8. 1M1B / IBM SkillsBuild Responsible AI Principles

EcoSort AI was designed in accordance with foundational Responsible AI principles:
1. **Transparency & Explainability**: Every classification delivers exact material composition percentages, explicit reasons for contamination warnings, and confidence scores.
2. **Safety & Hazard Mitigation**: Immediate priority alerts for hazardous, toxic, or flammable discards (e.g., swollen lithium cells, chemical solvents).
3. **Fairness & Accessibility**: Multi-modal inputs (live camera, file upload, text descriptions, and click-to-scan sample presets) ensure zero barrier to entry for users across diverse hardware and connection speeds.
4. **Data Privacy**: Image data is processed in-memory as ephemeral base64 payloads on the backend server and is **never stored permanently** or sold.

---

## 9. Developer Setup & Build Commands

### Environment Variables (`.env`)
```env
# Google Gemini API Key (Server-side secret, do NOT prefix with VITE_)
GEMINI_API_KEY=your_gemini_api_key_here
```

### Dependency Installation & Execution
```bash
# Install packages
npm install

# Run full-stack dev server (Express + Vite on Port 3000)
npm run dev

# Lint codebase (TypeScript checking)
npm run lint

# Production build (Vite client + esbuild bundled server)
npm run build

# Start production server
npm start
```

---

## 10. Summary & Future Extensibility

EcoSort AI bridges the gap between passive sustainability awareness and active, source-level waste reduction. Through its multi-model Gemini architecture—uniting **Gemini 3.8 Flash** for computer vision, **Gemini 3.1 Pro** for deep life cycle thinking, and **Gemini 3.1 Flash Lite** for instant user interactions—the system serves as an indispensable zero-waste infrastructure tool for modern academic campuses, smart municipalities, and responsible households worldwide.

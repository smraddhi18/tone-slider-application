# Tone Slider Text Tool

A web application that allows users to adjust the tone of their text using a slider interface powered by Mistral AI. Includes undo/redo functionality and smooth user interactions.

## ✨ Features

- **Text Editor**: Input and edit text directly in the editor.
- **Tone Slider**: Adjust text tone (formal ↔ casual) using a slider (0-100).
- **Undo/Redo**: Seamlessly revert or reapply text and tone changes.
- **Reset**: Reset the editor and slider to the default state.
- **Loading & Error Handling**: Visual indicators during API calls and clear error messages.
- **Backend Proxy**: A lightweight Node.js backend that securely proxies requests to Mistral AI, handles caching, rate limiting, and input validation.
- **Debounced API Calls**: Slider changes trigger API calls only after a brief pause to avoid excessive requests during sliding.

## 🏗️ Technologies Used

- **Frontend**: React, Redux Toolkit, Tailwind CSS, custom CSS, Axios, lodash.debounce
- **Backend**: Node.js, Express, @mistralai/mistralai, node-cache, express-rate-limit, cors, helmet, morgan, dotenv

## 🚀 Setup Instructions

You need to run **frontend** and **backend** separately.

### 1️⃣ Backend
cd backend
npm install
# Create a .env file from .env.example and add your MISTRAL_API_KEY
npm start
Backend will start at http://localhost:3001 (or the port specified in .env).

### 1️⃣ Frontend
cd frontend
npm install
npm start
Frontend will start at http://localhost:3000.

📐 Technical Architecture & Approach
Frontend

    UI: React functional components.

    State Management: Redux Toolkit with createSlice and createAsyncThunk.

    API Client: Axios wrapper for backend interaction.

    Styling: Tailwind CSS and custom CSS for a Neumorphism-style design.

    Slider Logic:

        Uses lodash.debounce (400ms) to delay API calls.

        Separates visual feedback (localSlider) from actual tone-adjusting state (current.slider).

    Error Handling:

        Friendly error messages from getFriendlyErrorMessage.

        Redux-managed error state, displayed via a reusable ErrorMessage component.

        UI is disabled during API calls.

Backend

    Framework: Express.js

    Mistral AI Integration:

        Uses the official SDK.

        Dynamic system prompts based on slider value and user input.

    Security:

        API key is stored in .env.

        Uses middleware like helmet, cors, and rate-limit.

    Caching: In-memory caching with node-cache (TTL: 1 hour).

    Middleware:

        Validates user input.

        Handles errors globally and gracefully.

🔄 Undo/Redo Implementation

Implemented using Redux:

    State Structure:

        current: The active text and slider state.

        history: An array of past states.

        future: An array of redo-able future states.

    Text Change:

        Push current to history.

        Update current.

        Clear future.

    Tone Adjustment:

        Updates current upon API success.

        future remains cleared.

    Undo:

        Pop from history to current.

        Push old current to future.

    Redo:

        Pop from future to current.

        Push old current to history.

    Reset:

        Push current state to history.

        Clear future.

        Set current to default.

🛠️ Error Handling
Frontend

    Errors caught by createAsyncThunk and shown using ErrorMessage.

    Validation before dispatching API requests.

    UI is disabled during API calls to prevent conflicts.

Backend

    Input validation middleware returns 400 errors for invalid inputs.

    Rate limiting middleware returns 429 on abuse.

    Global error handler returns 500 for unhandled issues.

    Mistral API interactions are checked for valid responses.

🎨 Design & UX

    Responsive layout: Side-by-side editor and slider on wide screens, stacked on mobile.

    Smooth slider feedback via localSlider.

    Neumorphism-inspired styling via custom CSS.

    Clear loading indicators and disabled state for buttons.

    Friendly error displays for API and validation issues.

📹 Deliverables ✅ Video Demo: 

     https://drive.google.com/file/d/166cyJ1iZKaDZ5-37udv7HmPEktq_JhAw/view?usp=sharing

📝 Notes
Trade-offs

    Redux Toolkit simplifies managing complex UI states like undo/redo, async calls, and multiple interactive elements.

    In-memory cache is suitable for development but not ideal for production persistence.

    useUndoRedo.js exists but is not used, as Redux handles this internally.

Potential Improvements

    Persist Redux state with redux-persist.

    Expand tone presets beyond just a linear slider.

    Remove unused hook files.

    Increase Tailwind usage for more utility-first styling.

    Add backend tests.

    Use Redis for persistent caching in production.

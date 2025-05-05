
# Tone Slider Text Tool

A web application that allows users to adjust the tone of their text using a slider interface powered by Mistral AI. Includes undo/redo functionality and smooth user interactions.

## ✨ Features

- **Text Editor**: Input and edit text directly in the editor.
- **Tone Slider**: Adjust text tone (formal ↔ casual) using a slider.
- **Undo/Redo**: Seamlessly revert or reapply tone changes.
- **Reset**: Reset the editor to default state.
- **Loading & Error Handling**: Visual indicators during API calls and clear error messages.
- **Backend Proxy**: A lightweight backend that securely proxies requests to Mistral AI.

## 🏗️ Project Structure

```
/frontend
  ├── src
  ├── public
  └── package.json

/backend
  ├── index.js
  └── package.json
```

- **Frontend**: Built with React, Redux for state management.
- **Backend**: Lightweight Node.js/Express server for API proxying and caching.

## 🚀 Setup Instructions

You need to run **frontend** and **backend** separately.

### 1️⃣ Backend

```bash
cd backend
npm install
npm start
```

Backend will start at `http://localhost:3001`.

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will start at `http://localhost:3000`.

## 📐 Technical Architecture

- **Frontend**:
  - React for UI
  - Redux Toolkit for state management (including undo/redo with history and future arrays)
  - AsyncThunk for API calls
  - Custom hooks for undo/redo interaction
- **Backend**:
  - Express server to securely call Mistral AI API
  - Handles API key security and potential caching

All API requests from the frontend are routed through the backend for security.

## 🔄 State Management (Undo/Redo)

The application uses a `current`, `history`, and `future` pattern:

- On every successful text tone change:
  - Current state is pushed to `history`.
  - `current` is updated with the new text and slider value.
  - `future` is cleared.
- Undo:
  - Moves the latest `history` state back to `current`.
  - Pushes current to `future`.
- Redo:
  - Moves the latest `future` state to `current`.
  - Pushes current to `history`.

This ensures smooth undo/redo across both **text** and **slider position**.

## 🛠️ Error Handling

- **Frontend**:
  - API errors are caught in `createAsyncThunk` and stored in Redux state.
  - Error messages are displayed to users via the UI.
- **Backend**:
  - Catches and returns API errors from Mistral AI gracefully.
- Handles:
  - Network errors
  - Invalid API responses
  - Empty input validation (asks users to enter text before adjusting tone)

## 🎨 Design & UX

- Clean split interface (editor on the left, slider + buttons on the right).
- Smooth slider interaction.
- Loading indicators during API calls.
- Disabled buttons while loading.
- Clear error and success states.

## 📹 Deliverables

✅ **Video Demo**: [\[Insert link to video demo here\]](https://drive.google.com/file/d/166cyJ1iZKaDZ5-37udv7HmPEktq_JhAw/view?usp=sharing)

✅ **GitHub Repo**: [Insert GitHub repo link here]

✅ **This README**

## 📝 Notes

- **Trade-offs**:
  - Chose Redux Toolkit instead of more lightweight solutions for better undo/redo control.
  - Used a simple Express backend without persistent caching for faster development.
- **Potential improvements**:
  - Add local storage persistence for undo/redo across sessions.
  - Improve slider granularity or provide tone presets.

---

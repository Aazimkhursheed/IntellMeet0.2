# IntellMeet – AI-Powered Video Conferencing & Real-Time Transcription

## System Overview

**IntellMeet** is a modern, AI-powered video conferencing platform that enables secure real-time meetings with live speech-to-text transcription, screen sharing, and persistent meeting history. The application combines **React**, **Agora RTC/RTM**, **Firebase Authentication**, **Cloud Firestore**, and a secure **Express.js token server** to deliver a seamless collaboration experience.

---

# Features

## Video & Audio Conferencing

- Multi-party HD video conferencing powered by Agora RTC.
- Adaptive participant layouts.
- Camera and microphone controls.
- Mute/Unmute functionality.
- Leave meeting support.

## Real-Time Speech Transcription

### Live Speech Recognition

The application uses the browser's native Speech Recognition API to continuously capture speech.

It supports:

- Live (interim) transcription
- Final confirmed transcription
- Speaker identification

### Real-Time Transcript Synchronization

Transcript updates are shared instantly between participants using the Agora RTM SDK.

Features include:

- Live caption synchronization
- Speaker mapping
- Low-latency transcript delivery

### Transcript Storage

Meeting transcripts are automatically stored in Firebase Cloud Firestore after meetings for future reference.

---

## Pre-Join Lobby

Before entering a meeting, users can:

- Preview camera
- Select microphone
- Select camera
- Verify hardware availability

---

## Screen Sharing

Supports native screen sharing using Agora screen tracks.

---

# Technology Stack

## Frontend

- React 19
- Vite
- React Router v7

## Backend

- Node.js
- Express.js
- dotenv
- CORS

## Real-Time Communication

- Agora RTC SDK
- Agora RTM SDK
- Agora Token SDK

## Authentication

- Firebase Authentication (Google Sign-In)

## Database

- Firebase Cloud Firestore

## Styling

- Vanilla CSS
- Glassmorphism UI
- Dark Theme

---

# Architecture

```text
React (Vite)
        │
        ▼
Express Token Server
        │
        ▼
Agora Token Generation
        │
        ▼
Agora RTC + RTM
        │
        ▼
Firebase Authentication
        │
        ▼
Cloud Firestore
```

---

# Security

The Agora App Certificate is never exposed to the client.

The frontend requests secure meeting tokens from the Express backend.

```http
GET /api/token?channel=<channel>&uid=<uid>
```

The Express server securely generates:

- RTC Token
- RTM Token

using the Agora Token SDK and returns them to the client.

---

# Project Structure

```text
IntellMeet/
│
├── public/
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── config/
│   └── styles/
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

# Environment Variables

## Frontend (.env)

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_AGORA_APP_ID=your_agora_app_id
VITE_API_URL=http://localhost:5000
VITE_AGORA_TEMP_TOKEN=
```

---

## Backend (server/.env)

```env
PORT=5000

AGORA_APP_ID=your_agora_app_id
AGORA_APP_CERTIFICATE=your_agora_app_certificate
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/Aazimkhursheed/IntellMeet0.2.git
```

## Navigate to the Project Directory

```bash
cd IntellMeet0.2
```

## Install Frontend Dependencies

```bash
npm install
```

## Install Backend Dependencies

```bash
cd server
npm install
```

---

# Running the Project

## Terminal 1 – Frontend

```bash
npm run dev
```

Runs on:

```text
http://localhost:5173
```

---

## Terminal 2 – Backend

```bash
cd server
npm start
```

Runs on:

```text
http://localhost:5000
```

---

# Core Components

### `src/hooks/useAgoraClient.js`

Responsible for:

- Camera initialization
- Microphone management
- Remote participant subscription
- Screen sharing
- Agora RTC lifecycle

---

### `src/hooks/useSpeechTranscription.js`

Responsible for:

- Browser Speech Recognition API
- Interim transcripts
- Final transcripts
- Speech processing

---

### `src/services/transcriptService.js`

Responsible for:

- Agora RTM communication
- Transcript synchronization
- Real-time caption broadcasting

---

### `src/components/VideoCall.jsx`

Responsible for:

- Meeting creation
- Meeting joining
- Secure token retrieval
- Agora RTC integration
- Agora RTM integration
- Live transcription

---

### `server/server.js`

Responsible for:

- RTC token generation
- RTM token generation
- Secure Agora authentication
- Express API endpoints

---

# Future Improvements

- Meeting recording
- AI meeting summaries
- Calendar integration
- Meeting scheduling
- Team collaboration
- File sharing
- User profiles
- Meeting analytics

---

# Developer

## Aazim Khursheed

Computer Science Engineering Student | MERN Stack Developer | AI Enthusiast

### GitHub

https://github.com/Aazimkhursheed

### LinkedIn

https://www.linkedin.com/in/aazim-khursheed-203304294/

---

If you found this project helpful, consider starring the repository and feel free to connect with me on LinkedIn.
# IntellMeet – AI-Powered Video Conferencing & Real-Time Transcription

## System Overview

**IntellMeet** is a modern, high-performance web application designed to provide secure video conferencing with real-time, shared speech-to-text transcription. The application uses a serverless backend powered by Firebase Cloud Functions and a highly optimized WebRTC communication pipeline built with Agora.

---

## Core Capabilities

### Video & Audio Conferencing

* Multi-party WebRTC video conferencing with adaptive participant layouts.
* High-quality audio and video communication powered by the Agora RTC SDK.

### Real-Time Speech Transcription Architecture

#### Local Speech Recognition

The `useSpeechTranscription.js` hook communicates directly with the browser's native `webkitSpeechRecognition` API to capture continuous speech. It distinguishes between:

* **Interim transcripts** (live speech currently being recognized)
* **Final transcripts** (completed and confirmed speech)

#### Peer-to-Peer Transcript Synchronization

To instantly share captions with all participants, the `TranscriptChannel` wrapper uses the **Agora Real-Time Messaging (RTM) SDK (v1.5.1)**. It establishes a dedicated messaging channel that broadcasts both interim and final transcript data as lightweight JSON payloads with sub-100ms latency.

#### Transcript Rendering

The `TranscriptPanel.jsx` component displays:

* Final transcript messages in chronological order
* Floating interim captions while users are speaking
* Automatic speaker attribution using Agora UID mappings

#### Persistent Meeting Records

When a meeting ends, the complete transcript history and meeting metadata are automatically stored in **Firebase Firestore** (`/meetings/{meetingId}`), enabling future review and record keeping.

### Professional Pre-Join Lobby

A dedicated pre-join experience allows users to:

* Preview camera before joining
* Select preferred camera
* Select preferred microphone
* Verify hardware before establishing the WebRTC connection

### Screen Sharing

Secure native screen sharing using dedicated Agora screen video tracks.

---

# Technical Architecture

The application follows a clean separation between the frontend React application and a serverless Firebase backend.

---

# Technology Stack

### Frontend

* React 19
* Vite
* React Router v7

### Real-Time Communication

* Agora RTC SDK (`agora-rtc-sdk-ng v4.x`)
* Agora RTM SDK (`agora-rtm-sdk v1.5.1`)

### Backend

* Firebase Cloud Functions (Node.js 20, 2nd Generation)

### Database & Authentication

* Firebase Authentication
* Firebase Firestore

### Styling

* Vanilla CSS
* CSS Design Tokens
* Glassmorphism UI
* Premium Monochromatic Dark Theme

---

# Security & Authentication Flow

To ensure secure WebRTC communication, **IntellMeet** never exposes Agora certificates to the client.

### Authentication Flow

1. The React frontend requests:

```
/api/token?channel={channelId}&uid={numericUid}
```

2. Firebase Hosting automatically rewrites the request to the **2nd Generation Firebase Cloud Function** `agoraToken`.

3. The Cloud Function securely generates:

* RTC Token (Video & Audio)
* RTM Token (Real-Time Messaging)

using the **agora-token** library.

4. The client initializes both Agora RTC and RTM services using the generated secure tokens.

---

# System Requirements & Local Setup

## Environment Variables

Create a `.env` file in the project root.

```env
# Agora Configuration
VITE_AGORA_APP_ID="your_agora_app_id"
VITE_AGORA_APP_CERTIFICATE="your_agora_app_certificate"

# Firebase Configuration
VITE_FIREBASE_API_KEY="your_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_auth_domain"
VITE_FIREBASE_PROJECT_ID="your_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
VITE_FIREBASE_APP_ID="your_app_id"
```

---

# Installation

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

## Run Firebase Emulators (Optional)

```bash
npm run serve
```

---

# Codebase Navigation (Developer & AI Assistant Reference)

### `src/hooks/useAgoraClient.js`

Core WebRTC integration layer.

Responsibilities include:

* Local camera initialization
* Microphone management
* Screen sharing
* Remote participant subscription
* Maintaining the `remoteUsers` state

---

### `src/hooks/useSpeechTranscription.js`

Interfaces directly with the browser Speech Recognition API.

Responsibilities:

* Continuous speech recognition
* Interim transcript generation
* Final transcript generation
* Microphone permission management

---

### `src/services/transcriptService.js`

Contains the `TranscriptChannel` wrapper around the Agora RTM SDK.

Responsibilities:

* Sending transcript updates
* Receiving transcript updates
* Synchronizing live captions between participants

---

### `src/components/VideoCall.jsx`

Primary orchestration component.

Responsible for connecting:

* Secure token generation
* Agora RTC
* Agora RTM
* Speech transcription
* Meeting UI

into a unified conferencing experience.

---

### `functions/index.js`

Firebase Cloud Function (2nd Generation).

Responsibilities:

* Secure Agora token generation
* RTC token creation
* RTM token creation

Requires **agora-token v2.0+**.

---

### `src/index.css`

Global design system.

Implements:

* CSS Custom Properties
* Dark Theme
* Glassmorphism
* Premium UI Tokens
* Consistent Apple-inspired visual language throughout the application.

---

# Developer

**Aazim Khursheed**

* **GitHub:** https://github.com/Aazimkhursheed
* **LinkedIn:** https://www.linkedin.com/in/aazim-khursheed-203304294/

If you found this project useful or interesting, feel free to connect with me on LinkedIn or explore more of my work on GitHub.


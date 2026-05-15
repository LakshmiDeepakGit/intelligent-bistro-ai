# Intelligent Bistro AI

A premium AI-powered conversational food ordering mobile application built using React Native, Expo, Node.js, Express, and TypeScript.

The application allows users to browse restaurant categories, interact with an AI assistant using natural language, and manage a dynamic shopping cart through conversational ordering.

---

# Features

## AI Conversational Ordering

Users can place food orders naturally using prompts like:

- Add one hot chicken burrito bowl
- Add sparkling water and lava cake
- Recommend dessert
- Add something spicy
- Remove it
- Add another

The AI assistant intelligently converts conversational prompts into structured cart actions.

---

## Smart Cart Management

- Add items dynamically
- Remove items
- Increase and decrease quantity
- Conversational cart updates
- Persistent cart state management
- Checkout success flow

---

## Premium Mobile UI

- Modern mobile-first design
- Dynamic category tabs
- Smooth user experience
- Professional dark theme interface
- Floating cart button
- Responsive layout

---

## AI Parsing Capabilities

The backend supports:

- Multi-item extraction
- Quantity detection
- Conversational memory
- Recommendation handling
- Spicy food suggestions
- Exact menu matching
- Smart phrase parsing
- Structured JSON action generation

---

# Tech Stack

## Frontend

- React Native
- Expo
- TypeScript
- Zustand

## Backend

- Node.js
- Express
- TypeScript

---

# Project Structure

```text
intelligent-bistro/
├── frontend/
├── backend/
├── README.md
└── .gitignore
```

---

# Beginner-Friendly Setup Guide

Follow these steps after downloading or cloning the project.

---

## 1. Open the Project in Visual Studio Code

1. Open **Visual Studio Code**.
2. Click:

```text
File → Open Folder
```

3. Select the main project folder:

```text
intelligent-bistro
```

After opening the folder, you should see:

```text
frontend
backend
```

inside the VS Code Explorer panel.

---

## 2. Configure the Backend IP Address

Before starting the application, update the backend URL used by the mobile application.

Open this file:

```text
frontend/services/aiService.ts
```

Find this line:

```ts
const API_URL = "http://YOUR_LOCAL_IP:5000";
```

Replace `YOUR_LOCAL_IP` with your computer’s local IPv4 address.

Example:

```ts
const API_URL = "http://192.168.1.49:5000";
```

This is required because the mobile application communicates with the backend server running on your computer.

---

## 3. Start the Backend Server

In Visual Studio Code:

1. Open a terminal:

```text
Terminal → New Terminal
```

2. Run the following commands:

```bash
cd backend
npm install
npm run dev
```

When the backend starts successfully, it will run on:

```text
http://localhost:5000
```

Keep this terminal running while using the application.

---

## 4. Start the Frontend Application

Open another terminal in Visual Studio Code:

```text
Terminal → New Terminal
```

Run:

```bash
cd frontend
npm install
npx expo start
```

After running the command:

- Expo Developer Tools will start
- A QR code will appear
- A development URL will be generated

Example:

```text
exp://192.168.1.49:8081
```

Keep this terminal running while using the application.

---

# Running the Application

You can run the mobile application using any of the following methods.

---

## Option 1 — Android Emulator

1. Open **Android Studio**.
2. Start an Android Emulator device.
3. Return to the frontend terminal.
4. Press:

```text
a
```

Expo will automatically launch the application inside the Android Emulator.

---

## Option 2 — Physical Mobile Device (Recommended)

1. Install **Expo Go** on your mobile device.

2. Make sure:
- your laptop/computer
- and your mobile device

are connected to the **same Wi-Fi network**.

This is required because the mobile application communicates with the backend server running on your computer through the local network.

3. Scan the QR code shown in the Expo terminal using:

- Expo Go (Android)
- Camera App (iPhone)

4. The application will automatically open on your mobile device.

---

## Option 3 — Expo URL

If QR scanning does not work:

1. Copy the Expo development URL shown in the terminal.

Example:

```text
exp://192.168.1.49:8081
```

2. Open the **Expo Go** application manually.

3. Paste the URL inside Expo Go to open the application.

---

# Important Notes

- Keep both backend and frontend terminals running while using the application.
- Start the backend server before starting the frontend application.
- If the AI assistant cannot connect, verify that the IP address inside:

```text
frontend/services/aiService.ts
```

matches your computer’s IPv4 address.

- If the frontend stops updating properly, stop the frontend terminal using:

```text
Ctrl + C
```

Then restart it using:

```bash
npx expo start --clear
```

---

# Example AI Prompts

- Add one hot chicken burrito bowl
- Add sparkling water and lava cake
- Add the best recommend dessert
- Add most spicy burrito bowl
- Remove it
- Add another

---

# Application Screens

- Home Screen
- AI Assistant
- Cart Screen
- Checkout Success Screen

---

# Architecture Overview

The frontend communicates with the backend AI parsing service through REST APIs.

The backend converts natural language prompts into structured actions such as:

- ADD_ITEM
- REMOVE_ITEM
- CLEAR_CART

These actions dynamically update the frontend cart state using Zustand state management.

---

# AI Engineering Concepts Used

- Conversational ordering
- Intent parsing
- Quantity extraction
- Smart phrase matching
- Greedy entity consumption
- Conversational memory

---

# Author

Lakshmi Deepak Chidagam

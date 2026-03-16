### Full-Stack Admin Authentication System

A production-ready authentication system built with **React + Redux Toolkit** on the frontend and **Node.js + Express + MongoDB** on the backend. Features JWT authentication, protected routing.

## Overview

this is a beginner-friendly yet production-ready admin authentication system. It demonstrates real-world patterns for building secure full-stack applications — from bcrypt password hashing and JWT token management to protected React routes and Redux state management.

## Features

### Authentication

- User registration with name, email, and password
- Secure login with JWT token generation
- Automatic token attachment on every API request via Axios interceptor
- Auto-logout and redirect when token expires or is invalid (401 response)
- Logout clears token from `localStorage` and resets Redux state

### Frontend

- Professional light-mode UI with warm editorial design
- Fully responsive layout (mobile + desktop)
- Protected routes — unauthenticated users are redirected to `/login`
- Form validation with inline error messages (React Hook Form)
- Loading spinners on all async actions
- Success and error alert banners
- User profile display and edit functionality
- Sticky navbar with avatar dropdown and active link highlighting

### Backend

- RESTful API with Express.js
- MongoDB with Mongoose ODM
- Input validation on all endpoints via `express-validator`
- Password hashing with bcrypt (salt rounds: 12)
- JWT middleware protecting private routes
- Centralized error handling and 404 handler
- CORS configured for frontend origin

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** — either local installation or a free [MongoDB Atlas]

---

### Step 1 — Set up the Backend

```bash
cd backend
npm install
```

Copy the environment file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and set your values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/admin_auth
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.
Verify it's running: `http://localhost:5000/api/health`

---

### Step 2 — Set up the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

The Vite dev server automatically proxies all `/api` requests to `http://localhost:5000`, so no CORS issues during development.

---

### Step 3 — Create your first account

1. Open `http://localhost:5173/register`
2. Fill in your name, email, and password
3. You'll be automatically logged in and redirected to the dashboard
4. Explore the profile page to update your details

## Scripts

### Backend

```bash
# Start with auto-reload (development)
npm run dev

# Start for production
npm start
```

### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

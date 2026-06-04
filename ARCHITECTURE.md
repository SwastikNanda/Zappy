# Zappy — Architecture & API Documentation

## Overview

Zappy is a real-time quiz game platform (similar to Kahoot) where a host creates quizzes and players compete live. It uses **REST APIs** for authentication and data persistence, and **WebSockets (Socket.IO)** for real-time gameplay.

---

## Tech Stack

| Layer | Technology | Hosting |
|-------|-----------|---------|
| Frontend | React + Vite, MUI, Framer Motion, TailwindCSS | Vercel (`zappy-green.vercel.app`) |
| Backend | Node.js, Express, Socket.IO | Render (`zappy-m3dk.onrender.com`) |
| Database | MongoDB Atlas | Cloud (shared across environments) |
| Auth | JWT (JSON Web Tokens) + bcrypt password hashing | — |

---

## Frontend (Client)

### Pages & Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Home | Public | Landing page with join/host options |
| `/register` | Register | Public | New user signup |
| `/login` | Login | Public | User login (JWT stored in localStorage) |
| `/host` | HostGame | Protected (login required) | Create quiz, manage room, control game |
| `/join` | JoinGame | Public | Enter room code + player name |
| `/play/:code` | PlayerGame | Public | Live game interface for players |

### Key Libraries

- **Socket.IO Client** — Real-time communication with server
- **Axios** (`api.js`) — REST API calls with auth token
- **TinyMCE** — Rich text editor for quiz questions
- **Framer Motion** — Animations
- **MUI (Material UI)** — UI components

### Environment Variables (`.env`)

```
VITE_API_URL=https://zappy-m3dk.onrender.com
```

---

## Backend (Server)

### Server Entry (`index.js`)

- Express app with CORS, cookie-parser, JSON body parsing
- Socket.IO server attached to HTTP server
- MongoDB connection via Mongoose
- Routes mounted at `/api/auth`, `/api/quizzes`, `/api/sessions`

### Environment Variables (`.env`)

```
PORT=5100
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/kahoot_clone
JWT_SECRET=<strong-random-string>
CLIENT_ORIGIN=https://zappy-green.vercel.app
```

---

## REST API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Body | Response | Auth |
|--------|----------|------|----------|------|
| POST | `/api/auth/register` | `{ name, email, password, role }` | `{ token, user: { id, name, role } }` | No |
| POST | `/api/auth/login` | `{ email, password }` | `{ token, user: { id, name, role } }` | No |

**Roles:** `player`, `host`, `admin`

---

### Quizzes (`/api/quizzes`)

All quiz endpoints require `Authorization: Bearer <token>` header.

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/api/quizzes` | `{ title, description, questions }` | Create a new quiz |
| GET | `/api/quizzes` | — | Get all quizzes owned by logged-in user |
| GET | `/api/quizzes/:id` | — | Get a specific quiz by ID |
| PUT | `/api/quizzes/:id` | `{ title?, description?, questions? }` | Update a quiz |
| DELETE | `/api/quizzes/:id` | — | Delete a quiz |

**Question format:**
```json
{
  "text": "<p>What is 2+2?</p>",
  "choices": ["3", "4", "5", "6"],
  "correctIndices": [1],
  "timeLimitSec": 15
}
```

---

### Sessions (`/api/sessions`)

| Method | Endpoint | Body | Auth | Description |
|--------|----------|------|------|-------------|
| POST | `/api/sessions` | `{ quizId }` | Yes (host/admin) | Create a game session record |
| GET | `/api/sessions/:id` | — | No | Get session details |

---

## WebSocket Events (Socket.IO)

The real-time game engine lives in `server/src/sockets/game.js`. Rooms are stored **in-memory** on the server.

### Host Events

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `host:create_room` | Client → Server | `{ quizId }` | Create a new game room |
| `host:room_created` | Server → Client | `{ roomCode }` | Room created successfully |
| `host:next_question` | Client → Server | `{ roomCode }` | Advance to next question |
| `host:players_update` | Server → Client | `{ players: [{ name, score }] }` | Player list updated |

### Player Events

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `player:join` | Client → Server | `{ roomCode, name }` | Join a game room |
| `player:answer` | Client → Server | `{ roomCode, choiceIndices }` | Submit answer(s) |
| `player:answer_result` | Server → Client | `{ correct: boolean }` | Feedback on answer |

### Game Flow Events

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `question:start` | Server → All | `{ index, questionNumber, totalQuestions, text, choices, endsAt, hasMultipleAnswers }` | New question begins |
| `question:end` | Server → All | `{ correctIndices, leaderboard, answerDistribution, totalPlayers, totalAnswered }` | Question timer expired |
| `leaderboard:update` | Server → All | `{ leaderboard: [{ name, score }] }` | Live score update after each answer |
| `lobby:update` | Server → All | `{ count }` | Number of players in lobby |
| `game:over` | Server → All | `{ leaderboard }` | Quiz finished, final scores |
| `game:closed` | Server → All | — | Host disconnected, room closed |

### Answer Distribution Format (in `question:end`)

```json
{
  "answerDistribution": [
    { "choiceIndex": 0, "choiceText": "Paris", "count": 3, "percentage": 75 },
    { "choiceIndex": 1, "choiceText": "London", "count": 1, "percentage": 25 }
  ],
  "totalPlayers": 5,
  "totalAnswered": 4
}
```

---

## Database Models (MongoDB)

### User
```js
{
  name: String,          // required
  email: String,         // required, unique
  password: String,      // bcrypt hashed
  role: "player" | "host" | "admin",
  createdAt, updatedAt   // auto timestamps
}
```

### Quiz
```js
{
  title: String,         // required
  description: String,
  ownerId: ObjectId,     // ref: User
  questions: [{
    text: String,
    choices: [String],
    correctIndices: [Number],
    timeLimitSec: Number
  }],
  createdAt, updatedAt
}
```

### GameSession
```js
{
  quiz: ObjectId,        // ref: Quiz
  host: ObjectId,        // ref: User
  players: Array
}
```

---

## Game Flow (End-to-End)

```
1. Host logs in → POST /api/auth/login → gets JWT token
2. Host creates quiz → POST /api/quizzes → quiz saved to MongoDB
3. Host starts room → emit "host:create_room" { quizId }
4. Server creates in-memory room → emits "host:room_created" { roomCode }
5. Players visit /play/ROOMCODE → emit "player:join" { roomCode, name }
6. Server broadcasts "host:players_update" to room
7. Host clicks "Start" → emit "host:next_question"
8. Server emits "question:start" to all in room + starts timer
9. Players answer → emit "player:answer" { choiceIndices }
10. Server scores, emits "player:answer_result" + "leaderboard:update"
11. Timer expires → Server emits "question:end" with distribution
12. Host clicks "Next" → repeat from step 7
13. After last question → Server emits "game:over" with final leaderboard
```

---

## Deployment

### Frontend (Vercel)

- **URL:** https://zappy-green.vercel.app
- **Auto-deploys** on push to `main` branch
- **Build command:** `npm run build` (Vite)
- **Output directory:** `dist/`
- **Environment variable:** `VITE_API_URL` = Render backend URL

### Backend (Render)

- **URL:** https://zappy-m3dk.onrender.com
- **Auto-deploys** on push to `main` branch
- **Start command:** `node index.js`
- **Environment variables:** `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`
- **Note:** Free-tier Render spins down after inactivity (~50s cold start)

### Database (MongoDB Atlas)

- **Cluster:** Shared (M0 free tier)
- **Region:** AP-South-1
- **Network Access:** IP whitelist must include Render's IPs + your dev IP
- **Database name:** `kahoot_clone`

---

## Scoring System

- **Fully correct answer:** 1000 points + time bonus (faster = more points)
- **Partial credit (multi-answer):** Proportional points for each correct choice selected
- **Wrong/no answer:** 0 points
- **Time bonus formula:** `Math.floor(timeLeftMs / 50)` added to base 1000

---

## Project Structure

```
Zappy/
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx          # Router & layout
│   │   ├── HostGame.jsx     # Host dashboard & game control
│   │   ├── PlayerGame.jsx   # Player game interface
│   │   ├── JoinGame.jsx     # Join room page
│   │   ├── QuizEditor.tsx   # Quiz creation form
│   │   ├── SavedQuizzes.jsx # Load existing quizzes
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   ├── useSocket.js     # Socket.IO hook
│   │   ├── api.js           # Axios instance
│   │   └── components/      # UI components (shadcn/ui)
│   ├── index.html
│   └── vercel.json          # SPA rewrites
│
├── server/                  # Backend (Express + Socket.IO)
│   ├── index.js             # Server entry point
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js      # Register & Login
│   │   │   ├── quizzes.js   # Quiz CRUD
│   │   │   └── session.js   # Game session records
│   │   ├── sockets/
│   │   │   └── game.js      # Real-time game engine
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Quiz.js
│   │   │   └── GameSession.js
│   │   └── middleware/
│   │       └── auth.js      # JWT verification middleware
│   └── .env
│
└── ARCHITECTURE.md          # This file
```

# Real-Time Chat Application

A complete MERN-style real-time chat app with JWT authentication, private chats, group chats, online presence, typing indicators, read receipts, and encrypted message storage.

## Stack

- **Client:** React, Vite, React Router, Tailwind CSS, Socket.io Client
- **Server:** Node.js, Express, Socket.io, MongoDB, Mongoose, JWT, bcrypt.js

## Setup

### 1. Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, and `MESSAGE_ENCRYPTION_SECRET` in `server/.env`.

### 2. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173` in two browser windows, register two users, search for the other user, and start chatting.


## Real-Time Events

Socket.io handles:

- `online-users` for presence.
- `join-chat` for room membership.
- `typing` and `stop-typing` for typing indicators.
- `new-message` and `message-received` for live delivery.
- `messages-read` and `read-receipt-updated` for read receipts.


## Project Structure

```text
client/src/components  Reusable UI components
client/src/pages       Login, Register, Dashboard, Profile
client/src/context     Auth provider
client/src/services    API client wrappers
client/src/hooks       Socket hook
server/controllers     REST API logic
server/models          Mongoose schemas
server/socket          Socket.io handlers
server/utils           JWT and encryption helpers
```

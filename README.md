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

## API Routes

All protected routes require `Authorization: Bearer <token>`.

### Auth

- `POST /api/auth/register` — create user with `name`, `email`, `password`.
- `POST /api/auth/login` — authenticate with `email`, `password`.
- `GET /api/auth/me` — get the current authenticated user.

### Users

- `GET /api/users/search?q=<term>` — search users by name or email, excluding yourself.

### Chats

- `POST /api/chats` — create or access a private chat with `userId`.
- `POST /api/chats/group` — create group chat with `chatName` and `users` array.
- `GET /api/chats` — list chats for the current user with latest message preview.

### Messages

- `GET /api/messages/:chatId` — list chat messages.
- `POST /api/messages` — send message with `chatId` and `content`.
- `PATCH /api/messages/:chatId/read` — mark chat messages as read.

## MongoDB Schemas

### User

Stores profile and auth data: `name`, `email`, hashed `password`, `avatar`, `isOnline`, and `lastSeen`.

### Chat

Stores private or group conversations: `isGroupChat`, `chatName`, `users`, `latestMessage`, and `groupAdmin`.

### Message

Stores encrypted chat messages: `sender`, `chat`, encrypted `content`, `readBy`, and timestamps. Message content is encrypted with AES-256-GCM before being saved and decrypted when returned by the API.

## Real-Time Events

Socket.io handles:

- `online-users` for presence.
- `join-chat` for room membership.
- `typing` and `stop-typing` for typing indicators.
- `new-message` and `message-received` for live delivery.
- `messages-read` and `read-receipt-updated` for read receipts.

## Screenshots

Add screenshots here after running locally:

- Login page
- Chat dashboard
- Group chat

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

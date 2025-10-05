# 🧪 WebSocket Playground

Welcome to **WebSocket Playground** — a simple and interactive project designed to help you learn and experiment with WebSocket communication using [Socket.IO](https://socket.io/).

This repository demonstrates three core real-time functionalities:

1.  **Live Counter Incrementing**
2.  **Basic Chat Messaging**
3.  **Public and Private Chat Rooms**

Perfect for beginners who want hands-on experience with WebSocket events, client-server communication, and real-time UI updates.

---

## 🚀 Features

### 🔢 Counter Increment

- A button on the client UI increments a shared counter.
- The updated value is broadcast to all connected clients in real time.
- Demonstrates server-side state management and event broadcasting.

### 💬 Chat Messaging

- Clients can send messages to the server.
- Messages are displayed instantly in the chat area.
- Shows how to handle custom events and dynamic DOM updates.

### 🚪 Public and Private Chat Rooms

- Users can create public or private chat rooms.
- Private rooms can be protected with a password.
- Users can join existing rooms.
- Messages sent within a room are only visible to members of that room.

---

## 🛠️ Tech Stack

-   **Node.js** + **Express** — for the backend server
-   **Socket.IO** — for WebSocket communication
-   **HTML + JavaScript** — for the frontend interface

---

## 🏁 How to Use

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/heintzz/websocket-playground.git
    ```
2.  **Navigate to the server directory and install dependencies:**
    ```bash
    cd websocket-playground/server
    npm install
    ```
3.  **Start the server:**
    ```bash
    node index.js
    ```
4.  **Open `client/index.html` in your browser.**

You can open multiple browser tabs to simulate multiple clients.
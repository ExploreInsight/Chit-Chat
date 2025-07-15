<h1 align='center'>💬 Real-Time Chat App – MERN Stack + Socket.IO</h1>

A responsive, full-stack real-time **Chat Application** built using the **MERN stack**, **Socket.IO**, and modern UI libraries. It supports secure user authentication, profile picture uploads, and real-time one-to-one messaging.

---

## 📸 Screenshots

![Home page](/client/public/homepage_chitChat.jpeg)


---

## ⚙️ Tech Stack

### 🔧 Backend:
- **Express.js** – Server framework
- **MongoDB + Mongoose** – NoSQL database & ODM
- **JWT (jsonwebtoken)** – Auth token handling
- **bcryptjs** – Password hashing
- **dotenv** – Environment variables
- **Cloudinary** – Profile picture hosting
- **cookie-parser** – Cookie-based auth
- **CORS** – Cross-origin handling
- **Socket.IO** – Real-time communication
- **http-status-codes** – HTTP status management

### 🎨 Frontend:
- **React.js (v19)** – UI library
- **Zustand** – Global state management
- **Axios** – API communication
- **React Router v7** – Routing
- **Tailwind CSS** – Utility-first CSS
- **DaisyUI** – Tailwind component framework
- **React Hot Toast** – Toast notifications
- **Lucide-react** – Icon set
- **Socket.IO Client** – Real-time messaging frontend

---

## ✨ Features

- 🔐 **JWT Authentication** (Login, Signup, Logout)
- 🖼️ **Profile Picture Upload** via Cloudinary
- 💬 **Real-time Messaging** using Socket.IO
- 👥 **Chat with specific users** (1-to-1 chat)
- 📦 **Protected Routes** using Middleware
- 📁 Modular backend with route/controller separation
- 🔍 **User list & dynamic chat history**

---

## 🔌 API Endpoints

> Base URL: `/api`

### 🧑 Auth Routes(/auth)

| Method | Endpoint                   | Description                    |
|--------|----------------------------|--------------------------------|
| POST   | `/signup`                  | Register a new user           |
| POST   | `/login`                   | Log in and receive token      |
| POST   | `/logout`                  | Log out the user              |
| PUT    | `/updateProfile-Picture`   | Update profile image (auth)   |
| GET    | `/check`                   | Validate JWT token (auth)     |

### 💬 Message Routes(/messages)

| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| GET    | `/users`           | Fetch all users (auth)           |
| GET    | `/:id`             | Get messages with a user (auth)  |
| POST   | `/send/:id`        | Send message to a user (auth)    |

---

### 🧑‍💻 Getting Started

 Clone the Repo
 
```shell

https://github.com/ExploreInsight/Chit-Chat.git
cd chit-chat

```
### Install Dependencies
Backend

```shell

npm install

```

 Frontend:
 
 ```shell

cd client
npm install

```

### ⚙️ Setup Environment Variables

In the /server folder, create a .env file and add the following:

```js
 PORT=7001
 MONGO_URI=your-mongodb-uri
 JWT_SECRET=your-jwt-secret
 CLOUDINARY_NAME=your-cloud-name
 CLOUDINARY_API_KEY=your-api-key
 CLOUDINARY_SECRET=your-secret
```
---

### Run the API

```shell
npm run dev
```
The backend (API) should be running at:
http://localhost:7001 

### Run the frontend

```shell
cd client
npm run dev
```

The frontend should be running at:
http://localhost:5173

---

### 👨‍💻 Author
Chirag

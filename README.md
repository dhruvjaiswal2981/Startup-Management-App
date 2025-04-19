# 🚀 Startup Management App
- A full-stack web application built with React, Node.js (Express), and SQLite that enables:

    1. 🔐 User Authentication: Signup, Login, Logout with password encryption
    2. 🛠️ Startup Management: Add, Edit, Delete startups (CRUD operations)
    3. 💅 Responsive UI using CSS Grid

## 📦 Tech Stack

- Frontend:
    - ReactJS
    - Axios
    - CSS Grid (for responsiveness)

- Backend:
    - Node.js
    - Express
    - bcrypt (for password hashing)
    - jsonwebtoken (for login sessions)
    - SQLite (lightweight DB)

## ✅ Features
- Signup with Email, Phone, and secure Password
- Login with Email or Phone
- Logout
- Add a Startup via popup form
- Edit/Delete existing Startups
- Responsive Design using CSS Grid

## 🛠️ Setup Instructions

1. Clone the Repository
    ```bash
    https://github.com/dhruvjaiswal2981/Startup-Management-App.git
    cd Startup-Management-App
    ```
2. Setup Backend (Server)

    ```bash
    cd backend
    npm install
    node server.js
    ```
- The backend will run on http://localhost:5000

3. Setup Frontend (Client)

    ```bash
    cd frontend
    npm install
    npm start
    ```
- Frontend will run on http://localhost:3000


## 🧪 Testing
- You can manually test:

    - User signup and login
    - Adding, editing, deleting startups
    - Responsive layout on desktop/mobile
    - Protected routes (dashboard accessible only after login)


## 📬 API Endpoints

| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| POST   | `/api/signup`    | User Signup        |
| POST   | `/api/login`     | User Login         |
| POST   | `/api/startups`       | Create Startup     |
| GET    | `/api/startups`       | Get All Startups   |
| PUT    | `/api/startups/:id`   | Update Startup     |
| DELETE | `/api/startups/:id`   | Delete Startup     |


## 🚀 Deployment

- Backend Deployment
    - Live Demo: The application is hosted on Render
    - Access it here: https://startup-management-app.onrender.com/api/

- Frontend Deployment
    - Live Demo: The application is hosted on Netlify.
    - Access it here: https://dhruv-startup.netlify.app/

## 📌 Author

- 💻 Developed by Dhruv Jaiswal
- 🚀 Happy Coding! 🎉
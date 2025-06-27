# Task Manager App

This is a full-stack Task Manager application where users can register, log in, and manage their daily tasks. It is built using **React** for the frontend, **Node.js + Express** for the backend, and **MongoDB Atlas** for the database. Users can create, update, delete, and mark tasks as completed.

Authentication is handled using **JWT (JSON Web Tokens)**, and all task-related routes are protected. The frontend is styled with custom **CSS** and offers a clean, responsive UI. The backend includes secure password hashing with **bcrypt** and environment-based configuration using `.env`.

The project uses a **RESTful API** architecture with separate routes for authentication and task management. Users' tasks are linked to their account in MongoDB using **Mongoose schemas** and object references. The app supports **persistent login** via `localStorage`.

---

# How to Run Locally

# Backend
```bash
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm start
MongoDB connection is configured in a .env file using your own MONGO_URI and JWT_SECRET.

Project Structure:

Task-ManagerApp/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css
│   │   └── ...
│   └── public/
└── README.md

Key API Routes

POST /api/auth/register → User registration
POST /api/auth/login → User login
GET /api/tasks → Get all tasks for logged-in user
POST /api/tasks → Add new task
PATCH /api/tasks/:id → Update task (mark complete)
DELETE /api/tasks/:id → Delete task

Testing

Basic frontend testing is done using React Testing Library.
To run the tests:
npm test

Future Enhancements

Add due dates and priority to tasks
Task filters (e.g., Completed, Pending)
Deploy frontend on Vercel and backend on Render
Add user profile section
Add loading spinners and error handling UI

Developer
Himabindu V R
Email: binduvng28@gmail.com | LinkedIn: https://www.linkedin.com/in/himabindu-v-r-b34033222/

This project is open-source and built for learning, showcasing full-stack development skills, and further enhancements.





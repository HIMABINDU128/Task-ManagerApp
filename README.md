# 📝 Task Manager App

This is a full-stack Task Manager application where users can register, log in, and manage their daily tasks. It is built using **React** for the frontend, **Node.js + Express** for the backend, and **MongoDB Atlas** for the database.

Authentication is handled using **JWT (JSON Web Tokens)**, and all task-related routes are protected. Users can create, update, delete, and mark tasks as completed. The app supports persistent login via `localStorage`. Passwords are securely hashed with **bcrypt**.

---

## 🔧 How to Run Locally

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

Project Structure

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
│   └── public/
└── README.md

 API Routes
POST /api/auth/register → Register a user

POST /api/auth/login → Login user

GET /api/tasks → Get all tasks

POST /api/tasks → Create task

PATCH /api/tasks/:id → Update task

DELETE /api/tasks/:id → Delete task

🧪 Testing
Basic frontend testing is done using React Testing Library.

bash
Copy
Edit
npm test
🌐 Live URLs
Frontend: Live Site

Backend API: Live API

✅ App Features to Try
Register a new user

Log in

Add, complete, or delete tasks

Log out and refresh to test persistent login

🌟 Future Enhancements
Add due dates and priority levels

Task filtering (Completed, Pending)

Add user profile section

Better error handling and loading UI

OAuth login support

Notifications/reminders

👩‍💻 Developer
Himabindu V R
📧 Email: binduvng28@gmail.com
🔗 LinkedIn Profile



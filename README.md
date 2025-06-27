# 📝 Task Manager App

This is a full-stack Task Manager application where users can register, log in, and manage their daily tasks. It is built using **React** for the frontend, **Node.js + Express** for the backend, and **MongoDB Atlas** for the database. Users can create, update, delete, and mark tasks as completed.

Authentication is handled using **JWT (JSON Web Tokens)**, and all task-related routes are protected. The frontend is styled with custom CSS and offers a clean, responsive UI. The backend includes secure password hashing with **bcrypt** and environment-based configuration using `.env`.

The project uses a **RESTful API architecture** with separate routes for authentication and task management. Users' tasks are linked to their account in MongoDB using Mongoose schemas and object references. The app supports persistent login via localStorage.

---

## 🔧 How to Run Locally

### Backend

```bash
cd backend
npm install
npm start
Frontend
bash
Copy
Edit
cd frontend
npm install
npm start
⚙️ MongoDB connection is configured in a .env file using your own MONGO_URI and JWT_SECRET.

📁 Project Structure
arduino
Copy
Edit
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
📡 API Routes
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
🚀 Live URLs
🔗 Frontend: https://task-manager-frontend-g6wi7dlvq-himabindu-v-rs-projects.vercel.app

🔗 Backend API: https://task-manager-backend-rm39.onrender.com

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
🔗 LinkedIn








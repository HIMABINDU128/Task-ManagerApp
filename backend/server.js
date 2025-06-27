const express = require('express');
console.log('✅ server.js loaded');

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority',
})
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Optional: More mongoose connection event handlers for debugging
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

// Routes
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);    // Auth routes mounted here
app.use('/api/tasks', taskRoutes);   // Task routes mounted here

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});


// Start server
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

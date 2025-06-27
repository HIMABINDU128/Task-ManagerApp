const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

console.log('✅ routes/auth.js loaded'); // ✅ Add at the top to confirm the file is loaded

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// ✅ REGISTER
router.post('/register', async (req, res) => {
  console.log('📩 Register route hit'); // ✅ Add here to confirm route is being hit

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    console.log('⚠️ Missing fields');
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    console.log('✅ User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
  console.log('🔑 Login route hit'); // Optional debug for login route

  const { email, password } = req.body;
  if (!email || !password) {
    console.log('⚠️ Missing login fields');
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Invalid credentials: user not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid credentials: password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('✅ Login successful');
    res.json({ token, name: user.name }); // ✅ Send name to frontend

  } catch (err) {
    console.error('❌ Server error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

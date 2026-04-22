const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getDashboard,
  updatePassword,
  updateCourse,
} = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/dashboard', verifyToken, getDashboard);
router.put('/update-password', verifyToken, updatePassword);
router.put('/update-course', verifyToken, updateCourse);

module.exports = router;

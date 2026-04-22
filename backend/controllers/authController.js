const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

// Generate JWT Token
const generateToken = (studentId) => {
  return jwt.sign({ studentId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register a new student
exports.register = async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    // Validate input
    if (!name || !email || !password || !course) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new student
    const student = new Student({
      name,
      email,
      password,
      course,
    });

    await student.save();

    // Generate token
    const token = generateToken(student._id);

    res.status(201).json({
      message: 'Registration successful',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Login student
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find student by email
    const student = await Student.findOne({ email }).select('+password');
    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await student.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(student._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Get student dashboard (protected route)
exports.getDashboard = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Dashboard data fetched',
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
        createdAt: student.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard', error: error.message });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Please provide all password fields' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Find student
    const student = await Student.findById(req.studentId).select('+password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Verify old password
    const isOldPasswordValid = await student.matchPassword(oldPassword);
    if (!isOldPasswordValid) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // Update password
    student.password = newPassword;
    await student.save();

    res.status(200).json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Password update failed', error: error.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const { course } = req.body;

    if (!course) {
      return res.status(400).json({ message: 'Please provide a course' });
    }

    const validCourses = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Other'];
    if (!validCourses.includes(course)) {
      return res.status(400).json({ message: 'Invalid course selection' });
    }

    const student = await Student.findByIdAndUpdate(
      req.studentId,
      { course },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Course updated successfully',
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Course update failed', error: error.message });
  }
};

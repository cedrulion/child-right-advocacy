const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/config');

// User Signup
exports.signUp = async (req, res) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      ...req.body,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User SignIn
exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '1h' });
    res.status(200).json({ token, loggedInUser: user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// User Logout
exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User ID is required" });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'firstName lastName username email phone role'); // Selecting the necessary fields
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Profile of Logged-in User
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user is populated via authentication middleware
    const user = await User.findById(userId, 'firstName lastName username email phone dateOfBirth nationality role');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedData = req.body;

    if (updatedData.password) {
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      updatedData.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true, select: 'firstName lastName username email phone dateOfBirth nationality role' });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insert Admin User
exports.insertAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ role: 'ADMIN' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('adminpassword', 10); // Replace with a secure password
      const newAdmin = new User({
        firstName: 'Admin',
        lastName: 'User',
        username: 'admin',
        email: 'admin@example.com',
        phone: '1234567890',
        password: hashedPassword,
        role: 'ADMIN',
      });
      await newAdmin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error inserting admin user:', error.message);
  }
};

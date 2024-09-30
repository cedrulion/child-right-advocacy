const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    
  },
  lastName: {
    type: String,
    
  },
  dateOfBirth: {
    type: Date,
    
  },
  nationality: {
    type: String,
    
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"], // Restrict role to "ADMIN" and "USER"
    required: true,
    default: "USER", // Default to "USER" if no role is specified
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

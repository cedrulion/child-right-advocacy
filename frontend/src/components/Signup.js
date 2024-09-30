import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaLock } from 'react-icons/fa'; // React Icons for input fields
import logo from '../Assets/unicef_logo.png'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username: formData.username,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });
      
      setSuccess('Signup successful!');
      setError('');
    } catch (err) {
      setError('Error signing up');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        {/* UNICEF Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="UNICEF Logo" className="h-12" />
        </div>

        {/* Child Rights Advocacy Header */}
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Child Rights <span className="text-blue-600">ADVOCACY</span>
        </h2>

        {/* SignUp Form */}
        <form onSubmit={handleSubmit} className="mt-3 bg-gray-500 p-5 text-white font-bold rounded">
          <h3 className="text-2xl font-semibold text-center mb-6 ">
            USER SignUp
          </h3>

          <div className="mb-4">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <div className="flex items-center border-b border-white rounded-md p-3">
              <FaUser className="text-white mr-2" />
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Create Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full focus:outline-none bg-gray-500 text-white"
              />
            </div>
          </div>
         <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="flex items-center border-b border-white rounded-md p-3">
              <FaUser className="text-white mr-2" />
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="w-full focus:outline-none bg-gray-500 text-white"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="sr-only">
              Phone Number
            </label>
            <div className="flex items-center border-b border-white rounded-md p-3">
              <FaPhone className="text-white mr-2" />
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full focus:outline-none bg-gray-500 text-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="flex items-center border-b border-white rounded-md p-3">
              <FaLock className="text-white mr-2" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full focus:outline-none bg-gray-500 text-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="flex items-center border-b border-white rounded-md p-3">
              <FaLock className="text-white mr-2" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full focus:outline-none bg-gray-500 text-white"
              />
            </div>
          </div>

          {/* Error or Success Message */}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

          {/* SignUp Button */}
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <p className="text-sm text-center mt-4 text-white">
            Already have an account?{' '}
            <a href="/login" className="text-white hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

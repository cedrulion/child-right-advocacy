const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signUp, signIn, logOut, getAllUsers, getProfile, updateProfile, deleteUser } = require('../controllers/AuthController');

// Public routes
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/logout/:id', logOut);

// Routes requiring authentication
router.get('/users', passport.authenticate('jwt', { session: false }), getAllUsers); // Protect this route
router.delete('/users/:id', passport.authenticate('jwt', { session: false }), deleteUser); // Protect this route
router.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);
router.put('/profile', passport.authenticate('jwt', { session: false }), updateProfile);

// Export the router
module.exports = router;

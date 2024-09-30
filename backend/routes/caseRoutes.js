const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const passport = require('passport');

// Create a new case report
router.post('/report', passport.authenticate('jwt', { session: false }), caseController.createCaseReport);

// Get case reports by user
router.get('/reports/:userId', passport.authenticate('jwt', { session: false }), caseController.getCaseReportsByUser);

module.exports = router;

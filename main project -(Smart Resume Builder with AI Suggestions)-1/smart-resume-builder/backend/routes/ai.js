const express = require('express');
const { body } = require('express-validator');
const { generateSuggestions, optimizeResume } = require('../controllers/aiController');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate AI suggestions
router.post('/suggestions', [
  auth,
  body('type')
    .isIn(['summary', 'experience', 'skills', 'project', 'objective'])
    .withMessage('Invalid suggestion type')
], generateSuggestions);

// Optimize resume
router.post('/optimize', [
  auth,
  body('resumeData')
    .exists()
    .withMessage('Resume data is required'),
  body('jobDescription')
    .isLength({ min: 10 })
    .withMessage('Job description must be at least 10 characters')
], optimizeResume);

module.exports = router;
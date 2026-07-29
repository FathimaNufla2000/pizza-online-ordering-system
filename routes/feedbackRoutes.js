const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.get('/feedback', feedbackController.getFeedbackPage);
router.post('/feedback', feedbackController.submitFeedback);

module.exports = router;

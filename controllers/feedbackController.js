const db = require('../db/db');

const DISTRICTS = [
  'Anuradhapura','Jaffna','Colombo','Kandy','Kilinochchi','Mannar','Vavuniya','Galle',
  'Mullaitivu','Ampara','Trincomalee','Batticaloa','Puttalam','Ratnapura','Gampaha',
  'Kurunegala','Badulla','Hambantota','Matale','Monaragala','Nuwara Eliya','Polonnaruwa'
];

exports.getFeedbackPage = (req, res) => {
  res.render('feedback', {
    title: 'Feedback | Slices of Heaven Pizza',
    description: 'Share your feedback with Slices of Heaven Pizza. We would love to hear about your experience.',
    districts: DISTRICTS,
    submitted: false
  });
};

exports.submitFeedback = (req, res) => {
  const { name, email, district, message } = req.body;

  if (!name || !email || !district || !message) {
    return res.render('feedback', {
      title: 'Feedback | Slices of Heaven Pizza',
      description: 'Share your feedback with Slices of Heaven Pizza.',
      districts: DISTRICTS,
      submitted: false,
      error: 'Please fill in every field before submitting.'
    });
  }

  db.prepare(`INSERT INTO feedback (name, email, district, message) VALUES (?, ?, ?, ?)`)
    .run(name, email, district, message);

  res.render('feedback', {
    title: 'Feedback | Slices of Heaven Pizza',
    description: 'Share your feedback with Slices of Heaven Pizza.',
    districts: DISTRICTS,
    submitted: true
  });
};

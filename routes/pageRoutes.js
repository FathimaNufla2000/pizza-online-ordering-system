const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Slices of Heaven | Authentic Deep-Dish Pizza Sri Lanka',
    description: 'Order authentic deep-dish pizza online from Slices of Heaven. Fast delivery in Colombo, Kandy and Kurunegala.'
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us | Slices of Heaven Pizza',
    description: 'Learn about Slices of Heaven, our story, and our branches in Kandy, Colombo and Kurunegala.'
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/cart', orderController.getCartPage);
router.post('/api/orders', orderController.createOrder);
router.get('/order-confirmation/:id', orderController.getOrderConfirmation);

module.exports = router;

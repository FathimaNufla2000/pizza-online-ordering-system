const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/menu', menuController.getMenuPage);
router.get('/api/menu', menuController.getMenuJson);

module.exports = router;

const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const authRoutes = require('./authRoutes');
const instagramRoutes = require('./instagramRoutes');

router.get('/health', healthController.getHealth);
router.use('/auth', authRoutes);
router.use('/instagram', instagramRoutes);

module.exports = router;

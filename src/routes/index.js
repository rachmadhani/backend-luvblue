const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const authRoutes = require('./authRoutes');
const instagramRoutes = require('./instagramRoutes');
const diaryRoutes = require('./diaryRoutes');
const blueNoteRoutes = require('./blueNoteRoutes');

router.get('/health', healthController.getHealth);
router.use('/auth', authRoutes);
router.use('/instagram', instagramRoutes);
router.use('/diary', diaryRoutes);
router.use('/blue-notes', blueNoteRoutes);

module.exports = router;

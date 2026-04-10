const express = require('express');
const router = express.Router();
const blueNoteController = require('../controllers/blueNoteController');
const upload = require('../middleware/upload');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// @route   GET api/blue-notes
// @desc    Get all blue notes
// @access  Public
router.get('/', blueNoteController.getAllBlueNotes);

// @route   GET api/blue-notes/:id
// @desc    Get blue note by ID
// @access  Public
router.get('/:id', blueNoteController.getBlueNoteById);

// @route   POST api/blue-notes
// @desc    Create new blue note
// @access  Private (Admin)
router.post('/',
    authenticate,
    authorize(['admin']),
    upload.fields([{ name: 'note_image', maxCount: 1 }]),
    blueNoteController.createBlueNote
);

// @route   PUT api/blue-notes/:id
// @desc    Update blue note
// @access  Private (Admin)
router.put('/:id',
    authenticate,
    authorize(['admin']),
    upload.fields([{ name: 'note_image', maxCount: 1 }]),
    blueNoteController.updateBlueNote
);

// @route   DELETE api/blue-notes/:id
// @desc    Delete blue note
// @access  Private (Admin)
router.delete('/:id',
    authenticate,
    authorize(['admin']),
    blueNoteController.deleteBlueNote
);

module.exports = router;

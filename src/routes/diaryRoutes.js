const express = require('express');
const router = express.Router();
const diaryContentController = require('../controllers/diaryContentController');
const upload = require('../middleware/upload');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// @route   GET api/diary
// @desc    Get all diary contents
// @access  Public
router.get('/', diaryContentController.getAllDiaryContents);

// @route   GET api/diary/:id
// @desc    Get diary content by ID
// @access  Public
router.get('/:id', diaryContentController.getDiaryContentById);

// @route   POST api/diary
// @desc    Create new diary content
// @access  Private (Admin)
router.post('/',
    authenticate,
    authorize(['admin']),
    upload.fields([{ name: 'diary_image', maxCount: 1 }]),
    diaryContentController.createDiaryContent
);

// @route   PUT api/diary/:id
// @desc    Update diary content
// @access  Private (Admin)
router.put('/:id',
    authenticate,
    authorize(['admin']),
    upload.fields([{ name: 'diary_image', maxCount: 1 }]),
    diaryContentController.updateDiaryContent
);

// @route   DELETE api/diary/:id
// @desc    Delete diary content
// @access  Private (Admin)
router.delete('/:id',
    authenticate,
    authorize(['admin']),
    diaryContentController.deleteDiaryContent
);

module.exports = router;

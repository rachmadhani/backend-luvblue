const express = require('express');
const router = express.Router();
const instagramUploadController = require('../controllers/instagramUploadController');
const upload = require('../middleware/upload');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// @route   GET api/instagram
// @desc    Get all instagram uploads
// @access  Public
router.get('/', instagramUploadController.getAllInstagram);

// @route   POST api/instagram
// @desc    Upload new instagram image(s)
// @access  Private (Admin)
router.post('/',
    authenticate,
    authorize(['admin']),
    upload.fields([{ name: 'instagram_image', maxCount: 10 }]),
    instagramUploadController.uploadInstagram
);

// @route   PUT api/instagram/:id
// @desc    Update instagram upload
// @access  Private (Admin)
router.put('/:id',
    authenticate,
    authorize(['admin']),
    upload.fields([{ name: 'instagram_image', maxCount: 10 }]),
    instagramUploadController.updateInstagram
);

// @route   DELETE api/instagram/:id
// @desc    Delete instagram upload
// @access  Private (Admin)
router.delete('/:id',
    authenticate,
    authorize(['admin']),
    instagramUploadController.deleteInstagram
);

module.exports = router;

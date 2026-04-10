const blueNoteService = require('../services/blueNoteService');

exports.createBlueNote = async (req, res, next) => {
    try {
        const { note_title, note_brief_title, note_brief_description, note_instagram_link } = req.body;
        let note_image_url = '';

        if (req.files && req.files.note_image && req.files.note_image.length > 0) {
            note_image_url = req.files.note_image[0].path.replace(/\\/g, '/').split('public/').pop();
        }

        const blueNote = await blueNoteService.createBlueNote({
            note_title,
            note_brief_title,
            note_brief_description,
            note_instagram_link,
            note_image_url
        });

        res.status(201).json({
            success: true,
            message: 'Blue note created successfully',
            data: blueNote
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

exports.updateBlueNote = async (req, res, next) => {
    try {
        const { note_title, note_brief_title, note_brief_description, note_instagram_link } = req.body;
        const data = {};
        if (note_title) data.note_title = note_title;
        if (note_brief_title) data.note_brief_title = note_brief_title;
        if (note_brief_description) data.note_brief_description = note_brief_description;
        if (note_instagram_link) data.note_instagram_link = note_instagram_link;

        if (req.files && req.files.note_image && req.files.note_image.length > 0) {
            data.note_image_url = req.files.note_image[0].path.replace(/\\/g, '/').split('public/').pop();
        }

        const updatedBlueNote = await blueNoteService.updateBlueNote(req.params.id, data);

        res.status(200).json({
            success: true,
            message: 'Blue note updated successfully',
            data: updatedBlueNote
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

exports.deleteBlueNote = async (req, res, next) => {
    try {
        const result = await blueNoteService.deleteBlueNote(req.params.id);
        res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

exports.getBlueNoteById = async (req, res, next) => {
    try {
        const blueNote = await blueNoteService.getBlueNoteById(req.params.id);
        res.status(200).json({
            success: true,
            data: blueNote
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

exports.getAllBlueNotes = async (req, res, next) => {
    try {
        const result = await blueNoteService.getAllBlueNotes(req.query);
        res.status(200).json({
            success: true,
            message: 'Blue notes fetched successfully',
            ...result
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

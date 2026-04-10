const diaryContentService = require('../services/diaryContentService');

exports.createDiaryContent = async (req, res, next) => {
    try {
        const { diary_title, diary_brief_title, diary_brief_description, diary_instagram_link } = req.body;
        let diary_image_url = '';

        if (req.files && req.files.diary_image && req.files.diary_image.length > 0) {
            diary_image_url = req.files.diary_image[0].path.replace(/\\/g, '/').split('public/').pop();
        }

        const diaryContent = await diaryContentService.createDiaryContent({
            diary_title,
            diary_brief_title,
            diary_brief_description,
            diary_instagram_link,
            diary_image_url
        });

        res.status(201).json({
            success: true,
            message: 'Diary content created successfully',
            data: diaryContent
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

exports.updateDiaryContent = async (req, res, next) => {
    try {
        const { diary_title, diary_brief_title, diary_brief_description, diary_instagram_link } = req.body;
        const data = {};
        if (diary_title) data.diary_title = diary_title;
        if (diary_brief_title) data.diary_brief_title = diary_brief_title;
        if (diary_brief_description) data.diary_brief_description = diary_brief_description;
        if (diary_instagram_link) data.diary_instagram_link = diary_instagram_link;

        if (req.files && req.files.diary_image && req.files.diary_image.length > 0) {
            data.diary_image_url = req.files.diary_image[0].path.replace(/\\/g, '/').split('public/').pop();
        }

        const updatedDiaryContent = await diaryContentService.updateDiaryContent(req.params.id, data);

        res.status(200).json({
            success: true,
            message: 'Diary content updated successfully',
            data: updatedDiaryContent
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

exports.deleteDiaryContent = async (req, res, next) => {
    try {
        const result = await diaryContentService.deleteDiaryContent(req.params.id);
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

exports.getDiaryContentById = async (req, res, next) => {
    try {
        const diaryContent = await diaryContentService.getDiaryContentById(req.params.id);
        res.status(200).json({
            success: true,
            data: diaryContent
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

exports.getAllDiaryContents = async (req, res, next) => {
    try {
        const result = await diaryContentService.getAllDiaryContents(req.query);
        res.status(200).json({
            success: true,
            message: 'Diary contents fetched successfully',
            ...result
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

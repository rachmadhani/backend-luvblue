const instagramUploadService = require('../services/instagramUploadService');

exports.uploadInstagram = async (req, res, next) => {
    try {
        const { instagram_users, instagram_links } = req.body;
        let instagram_images = [];
        if (req.files && req.files.instagram_image && req.files.instagram_image.length > 0) {
            instagram_images = req.files.instagram_image.map(file => file.path.replace(/\\/g, '/').split('public/').pop());
        }

        const image_url = instagram_images.join(',');

        const instagramUpload = await instagramUploadService.uploadInstagram({ image_url, instagram_users, instagram_links });
        res.status(200).json({
            success: true,
            message: 'Instagram upload successful',
            data: instagramUpload
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

exports.updateInstagram = async (req, res) => {
    try {
        const { instagram_users, instagram_links } = req.body;
        const data = {};
        if (instagram_users) data.instagram_users = instagram_users;
        if (instagram_links) data.instagram_links = instagram_links;

        if (req.files && req.files.instagram_image) {
            const instagram_images = req.files.instagram_image.map(file => file.path.replace(/\\/g, '/').split('public/').pop());
            data.image_url = instagram_images.join(',');
        }

        const updated_instagram_upload = await instagramUploadService.updateInstagram(req.params.id, data);
        res.status(200).json({
            success: true,
            message: 'Instagram upload updated successfully',
            data: updated_instagram_upload
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

exports.deleteInstagram = async (req, res) => {
    try {
        const result = await instagramUploadService.deleteInstagram(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

exports.getAllInstagram = async (req, res) => {
    try {
        const instagrams = await instagramUploadService.getAllInstagram(req.query);
        res.status(200).json({
            success: true,
            message: 'Instagram fetched successfully',
            data: instagrams
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

exports.getStats = async (req, res) => {
    try {
        const stats = await instagramUploadService.getInstagramStats();
        res.status(200).json({
            success: true,
            message: 'Instagram stats fetched successfully',
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}
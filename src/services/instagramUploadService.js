const { InstagramUpload } = require('../models');
const fs = require('fs');
const path = require('path');

exports.uploadInstagram = async (data) => {
    try {
        const instagramUpload = await InstagramUpload.create(data);
        return instagramUpload;
    } catch (error) {
        throw error;
    }
};

exports.getAllInstagram = async (data) => {
    try {
        const page = parseInt(data.page, 10) || 1;
        const limit = parseInt(data.limit, 10) || 10;
        const offset = (page - 1) * limit;

        const where = {};

        const { count, rows } = await InstagramUpload.findAndCountAll({
            where,
            limit,
            offset,
            order: [['id', 'DESC']],
        });

        return {
            data: rows,
            meta: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        };
    } catch (error) {
        throw error;
    }
};


exports.updateInstagram = async (id, data) => {
    try {
        const instagram_upload = await InstagramUpload.findByPk(id);
        if (!instagram_upload) {
            throw new Error('Instagram upload not found');
        }

        if (data.image_url && data.image_url !== instagram_upload.image_url) {
            const images = instagram_upload.image_url.split(',');
            images.forEach(img => {
                const imgPath = path.join(__dirname, '..', '..', 'public', img.trim().replace(/\\/g, '/'));
                if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
            });
        }

        const updated_instagram_upload = await instagram_upload.update(data);
        return updated_instagram_upload;
    } catch (error) {
        throw error;
    }
};

exports.deleteInstagram = async (id) => {
    try {
        const instagram_upload = await InstagramUpload.findByPk(id);
        if (!instagram_upload) {
            throw new Error('Instagram upload not found');
        }
        const images = instagram_upload.image_url.split(',');
        images.forEach(img => {
            const imgPath = path.join(__dirname, '..', '..', 'public', img.trim().replace(/\\/g, '/'));
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        });
        await instagram_upload.destroy();
        return { message: 'Instagram upload deleted successfully' };
    } catch (error) {
        throw error;
    }
};
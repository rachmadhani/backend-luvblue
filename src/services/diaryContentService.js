const { DiaryContent } = require('../models');
const fs = require('fs');
const path = require('path');

exports.getAllDiaryContents = async (query = {}) => {
    try {
        const page = parseInt(query.page, 10) || 1;
        const limit = parseInt(query.limit, 10) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await DiaryContent.findAndCountAll({
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
}

exports.getDiaryContentById = async (id) => {
    try {
        const diaryContent = await DiaryContent.findByPk(id);
        if (!diaryContent) {
            const error = new Error('Diary content not found');
            error.status = 404;
            throw error;
        }
        return diaryContent;
    } catch (error) {
        throw error;
    }
}

exports.createDiaryContent = async (data) => {
    try {
        const diaryContent = await DiaryContent.create(data);
        return diaryContent;
    } catch (error) {
        throw error;
    }
}

exports.updateDiaryContent = async (id, data) => {
    try {
        const diaryContent = await DiaryContent.findByPk(id);
        if (!diaryContent) {
            const error = new Error('Diary content not found');
            error.status = 404;
            throw error;
        }

        // Physical file deletion if image changed
        if (data.diary_image_url && diaryContent.diary_image_url && data.diary_image_url !== diaryContent.diary_image_url) {
            const imgPath = path.join(__dirname, '..', '..', 'public', diaryContent.diary_image_url.trim().replace(/\\/g, '/'));
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }

        const updatedDiaryContent = await diaryContent.update(data);
        return updatedDiaryContent;
    } catch (error) {
        throw error;
    }
}

exports.deleteDiaryContent = async (id) => {
    try {
        const diaryContent = await DiaryContent.findByPk(id);
        if (!diaryContent) {
            const error = new Error('Diary content not found');
            error.status = 404;
            throw error;
        }

        // Physical file deletion
        if (diaryContent.diary_image_url) {
            const imgPath = path.join(__dirname, '..', '..', 'public', diaryContent.diary_image_url.trim().replace(/\\/g, '/'));
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }

        await diaryContent.destroy();
        return { message: 'Diary content deleted successfully' };
    } catch (error) {
        throw error;
    }
}
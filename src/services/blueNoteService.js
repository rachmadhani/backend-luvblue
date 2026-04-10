const { BlueNote } = require('../models');
const fs = require('fs');
const path = require('path');

exports.getAllBlueNotes = async (query = {}) => {
    try {
        const page = parseInt(query.page, 10) || 1;
        const limit = parseInt(query.limit, 10) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await BlueNote.findAndCountAll({
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

exports.getBlueNoteById = async (id) => {
    try {
        const blueNote = await BlueNote.findByPk(id);
        if (!blueNote) {
            const error = new Error('Blue note not found');
            error.status = 404;
            throw error;
        }
        return blueNote;
    } catch (error) {
        throw error;
    }
}

exports.createBlueNote = async (data) => {
    try {
        const blueNote = await BlueNote.create(data);
        return blueNote;
    } catch (error) {
        throw error;
    }
}

exports.updateBlueNote = async (id, data) => {
    try {
        const blueNote = await BlueNote.findByPk(id);
        if (!blueNote) {
            const error = new Error('Blue note not found');
            error.status = 404;
            throw error;
        }

        // Physical file deletion if image changed
        if (data.note_image_url && blueNote.note_image_url && data.note_image_url !== blueNote.note_image_url) {
            const imgPath = path.join(__dirname, '..', '..', 'public', blueNote.note_image_url.trim().replace(/\\/g, '/'));
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }

        const updatedBlueNote = await blueNote.update(data);
        return updatedBlueNote;
    } catch (error) {
        throw error;
    }
}

exports.deleteBlueNote = async (id) => {
    try {
        const blueNote = await BlueNote.findByPk(id);
        if (!blueNote) {
            const error = new Error('Blue note not found');
            error.status = 404;
            throw error;
        }

        // Physical file deletion
        if (blueNote.note_image_url) {
            const imgPath = path.join(__dirname, '..', '..', 'public', blueNote.note_image_url.trim().replace(/\\/g, '/'));
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }

        await blueNote.destroy();
        return { message: 'Blue note deleted successfully' };
    } catch (error) {
        throw error;
    }
}

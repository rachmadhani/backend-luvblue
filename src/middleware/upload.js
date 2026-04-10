const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = 'instagram';
        if (req.originalUrl.includes('/diary')) {
            folder = 'diary';
        }
        const uploadPath = path.join(__dirname, '..', '..', 'public', 'uploads', folder);

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif'];
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (allowedFileTypes.includes(fileExtension)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.'));
        }
    }
});

module.exports = upload;
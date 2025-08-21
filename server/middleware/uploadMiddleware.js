const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/**
 * Multer storage configuration.
 * Saves files to /uploads with timestamped filenames.
 */
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/**
 * File filter to allow only JPEG, PNG, and WEBP images.
 *
 * @param {Object} req - Express request object
 * @param {Object} file - Uploaded file object
 * @param {Function} cb - Callback to accept or reject file
 */
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  cb(null, allowed.includes(file.mimetype));
};

/**
 * Multer middleware for handling image uploads.
 *
 * @constant
 * @type {multer.Instance}
 *
 * @description
 * - Stores files in `/uploads/`
 * - Accepts only JPEG, PNG, WEBP
 * - Limits file size to 2MB
 *
 * @example
 * // Usage in route
 * router.post('/upload', upload.single('image'), handler);
 */
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;

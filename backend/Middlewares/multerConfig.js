const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files in uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Name the file with a timestamp
  },
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 1MB file size limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|mp4|mkv/; // Allowed extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images and Videos Only!');
    }
  },
});

module.exports = upload;

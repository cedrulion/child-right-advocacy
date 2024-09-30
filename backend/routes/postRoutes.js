const express = require('express');
const { createPost, getAllPosts, getMediaFile } = require('../controllers/postController');
const upload = require('../Middlewares/multerConfig'); 
const passport = require('passport');
const router = express.Router();


router.post('/posts', passport.authenticate('jwt', { session: false }), upload.single('file'), createPost); 
router.get('/posts', getAllPosts);
router.get('/media/:filename', getMediaFile);
module.exports = router;

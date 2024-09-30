const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String, // Text content
    required: true,
  },
  media: {
    type: String, // Path to the image or video file
  },
  mediaType: {
    type: String, // Type of media, can be 'image', 'video', or 'text'
    enum: ['image', 'video', 'text'],
    default: 'text',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

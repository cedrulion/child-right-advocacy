import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../Assets/unicef_logo.png'; // Replace with your logo path

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // For media uploads (image or video)
  const [mediaType, setMediaType] = useState('text'); // Default type is text

  const token = localStorage.getItem('token'); // Get token from localStorage

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` }, // Send token with the request
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Handle new post submission
  const handlePost = async () => {
    if (newPost.trim() === '' && !selectedFile) {
      alert('Please enter text or upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('content', newPost);
    formData.append('mediaType', mediaType);

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { Authorization: `Bearer ${token}` },
        'Content-Type': 'multipart/form-data',
      });

      setPosts([response.data.post, ...posts]); // Add new post to the list
      setNewPost('');
      setSelectedFile(null);
      setMediaType('text');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white mt-5">
      {/* Header */}
      <div className="flex justify-center text-center mb-3">
        <img src={logo} alt="UNICEF Logo" className="h-10" />
        <h1 className="text-4xl font-bold text-gray-800">
          Child Rights <span className="text-blue-400">ADVOCACY</span>
        </h1>
      </div>

      {/* What's Happening Section */}
      <div className="max-w-3xl mx-auto mt-8 bg-gray-300 p-4 rounded-lg shadow-md">
        <textarea
          className="w-full border-none focus:outline-none p-2 rounded-lg bg-gray-300"
          placeholder="What's happening?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>

        <div className="flex justify-between items-center mt-3">
          <div className="flex space-x-4">
            {/* File input for media */}
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                setMediaType(e.target.files[0]?.type.startsWith('image') ? 'image' : 'video');
              }}
            />
          </div>

          <button
            onClick={handlePost}
            className="bg-black text-white px-4 py-2 rounded-full"
          >
            Post
          </button>
        </div>
      </div>

      {/* Post Feed */}
      <div className="mt-6 max-w-3xl mx-auto">
        {posts.map((post) => (
          <div key={post._id} className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex items-center">
              <h3 className="font-bold">{post.author?.username || 'Anonymous'}</h3>
              <span className="ml-2 text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</span>
            </div>

            <p className="mt-2">{post.content}</p>

            {/* Display media if available */}
            {post.mediaType === 'image' && <img src={`http://localhost:5000/api/media/${post.media}`} alt="Post media" className="mt-4" />}
            {post.mediaType === 'video' && <video controls src={`http://localhost:5000/api/media/${post.media}`} className="mt-4" />}

            <div className="flex space-x-4 mt-3 text-gray-500">
              <button className="hover:text-black">
                <i className="fas fa-comment"></i>
              </button>
              <button className="hover:text-black">
                <i className="fas fa-retweet"></i>
              </button>
              <button className="hover:text-black">
                <i className="fas fa-heart"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostFeed;

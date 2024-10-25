import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import logo from '../Assets/unicef_logo.png';

const DiscussionsForums = () => {
  const [discussions, setDiscussions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('Update');
  const [currentDiscussion, setCurrentDiscussion] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [type, setType] = useState('All');

  // Fetch Discussions by user
  const fetchDiscussions = async () => {
    try {
      const token = localStorage.getItem('token');
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

      if (!loggedInUser || !loggedInUser._id) {
        console.error("Logged in user information is missing or incomplete");
        return;
      }
      const userId = loggedInUser._id;
      const response = await axios.get(`http://localhost:5000/api/discussions/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDiscussions(response.data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  // Fetch posts by user
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

      if (!loggedInUser || !loggedInUser._id) {
        console.error("Logged in user information is missing or incomplete");
        return;
      }
      const userId = loggedInUser._id;
      const response = await axios.get(`http://localhost:5000/api/posts/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchDiscussions();
    fetchPosts();
  }, []);

  const handleOpenDiscussionModal = (discussion) => {
    setModalMode('Update');
    setCurrentDiscussion(discussion);
    setTitle(discussion.title);
    setDescription(discussion.description);
    setShowModal(true);
  };

  const handleOpenPostModal = (post) => {
    setModalMode('Update');
    setCurrentPost(post);
    setTitle(post.title);
    setMediaType(post.mediaType);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const updateDiscussion = async () => {
    try {
      const token = localStorage.getItem('token');
      const discussionData = { title, description };

      await axios.put(`http://localhost:5000/api/discussions/${currentDiscussion._id}`, discussionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchDiscussions();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating discussion:', error);
    }
  };

  const updatePost = async () => {
    try {
      const token = localStorage.getItem('token');
      const postData = { title, mediaType };

      await axios.put(`http://localhost:5000/api/posts/${currentPost._id}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchPosts();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deleteDiscussion = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/discussions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDiscussions();
    } catch (error) {
      console.error('Error deleting discussion:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'roboto' }}>
      <div className="flex justify-center text-center m-3">
        <img src={logo} alt="UNICEF Logo" className="h-10" />
        <h1 className="text-4xl font-bold text-gray-800">
          Child Rights <span className="text-blue-400">ADVOCACY</span>
        </h1>
      </div>

      <div className="px-10 py-6">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-10">DISCUSSIONS</h2>
        {/* Filter by Type */}
        <div className="flex justify-end mb-4">
          <label className="mr-2 font-semibold text-gray-700">Select Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="All">All</option>
            <option value="Theme">Theme</option>
            <option value="Forum">Forum</option>
          </select>
        </div>

<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-8">
  <thead>
    <tr className="bg-gray-800 text-white text-left">
      <th className="py-3 px-4">Title</th>
      <th className="py-3 px-4">Type</th>
      <th className="py-3 px-4">Date</th>
      <th className="py-3 px-4">Attendees</th>
      <th className="py-3 px-4">Actions</th>
    </tr>
  </thead>
  <tbody>
    {discussions
      .filter((discussion) => type === 'All' || discussion.type === type)
      .map((discussion) => (
        <tr
          key={discussion._id}
          className="border-t hover:bg-gray-100 transition duration-150 ease-in-out"
        >
          <td className="py-3 px-4">{discussion.title}</td>
          <td className="py-3 px-4">{discussion.type}</td>
          <td className="py-3 px-4">
            {new Date(discussion.createdAt).toLocaleString()}
          </td>
          <td className="py-3 px-4">{discussion.attendees.length}</td> 
          <td className="py-3 px-4 flex space-x-4">
            <button
              onClick={() => handleOpenDiscussionModal(discussion)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteDiscussion(discussion._id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
  </tbody>
</table>


        <h2 className="text-xl font-bold text-gray-800 text-center mb-10">MY POSTS</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="py-3 px-4">Content</th>
              <th className="py-3 px-4">Media Type</th>
              <th className="py-3 px-4">Likes</th>
              <th className="py-3 px-4">Comments</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-t hover:bg-gray-100 transition duration-150 ease-in-out">
                <td className="py-3 px-4">{post.content}</td>
                <td className="py-3 px-4">{post.mediaType}</td>
                <td className="py-3 px-4">{post.likes.length}</td>
                <td className="py-3 px-4">{post.comments.length}</td>
                <td className="py-3 px-4 flex space-x-4">
                  <button onClick={() => handleOpenPostModal(post)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button onClick={() => deletePost(post._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">{modalMode} {modalMode === 'Update' ? 'Post' : 'Discussion'}</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                {modalMode === 'Update Post' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Media Type</label>
                    <input
                      type="text"
                      value={mediaType}
                      onChange={(e) => setMediaType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                )}
              </form>
              <div className="flex justify-end mt-4">
                <button
                  onClick={modalMode === 'Update' ? updateDiscussion : updatePost}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCloseModal}
                  className="ml-4 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionsForums;

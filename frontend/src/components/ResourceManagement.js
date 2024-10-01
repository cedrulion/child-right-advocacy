import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../Assets/unicef_logo.png'; // Adjust this import to your logo

const ResourceManagement = () => {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  });
  const [editingResource, setEditingResource] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token');

  // Fetch all resources when the component loads
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resources', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, [token]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Add new resource
  const handleAddResource = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('file', formData.file);

    try {
      const response = await axios.post('http://localhost:5000/api/resources/upload', formDataToSubmit, {
        headers: { Authorization: `Bearer ${token}` },
        'Content-Type': 'multipart/form-data',
      });

      setResources([...resources, response.data.newResource]);
      setFormData({ title: '', description: '', file: null });
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  // Handle edit resource
  const handleEditResource = (resource) => {
    setFormData({
      title: resource.title,
      description: resource.description,
    });
    setEditingResource(resource._id);
    setIsEditing(true);
  };

  // Update existing resource
  const handleUpdateResource = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('description', formData.description);
    if (formData.file) {
      formDataToSubmit.append('file', formData.file);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/resources/${editingResource}`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedResources = resources.map((resource) =>
        resource._id === editingResource ? response.data.updatedResource : resource
      );
      setResources(updatedResources);
      setFormData({ title: '', description: '', file: null });
      setEditingResource(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };

  // Delete a resource
  const handleDeleteResource = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/resources/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(resources.filter((resource) => resource._id !== id));
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      {/* Header */}
      <div className="flex justify-center mb-5">
        <img src={logo} alt="UNICEF Logo" className="h-10" />
        <h1 className="text-4xl font-bold text-gray-800">
          Child Rights <span className="text-blue-400">ADVOCACY</span>
        </h1>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Resource' : 'Add New Resource'}</h2>
        <form onSubmit={isEditing ? handleUpdateResource : handleAddResource}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">File</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              accept=".pdf,.ppt,.mp4,.jpg,.png"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isEditing ? 'Update Resource' : 'Add Resource'}
          </button>
        </form>
      </div>

      {/* Resource List */}
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Resources</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">File</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource._id} className="border-b">
                <td className="px-4 py-2">{resource.title}</td>
                <td className="px-4 py-2">{resource.description}</td>
                <td className="px-4 py-2">
                  <a
                    href={`http://localhost:5000/api/resources/file/${resource.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View File
                  </a>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-3"
                    onClick={() => handleEditResource(resource)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteResource(resource._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceManagement;

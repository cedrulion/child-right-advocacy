const Resource = require('../models/Resource');
const path = require('path');
const fs = require('fs');

// Add Resource (Create)
const addResource = async (req, res) => {
  try {
    const file = req.file ? req.file.filename : null;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, description } = req.body;

    const newResource = new Resource({
      title,
      description,
      file,
    });

    await newResource.save();
    return res.status(201).json({ message: 'Resource uploaded successfully', newResource });
  } catch (error) {
    return res.status(500).json({ message: 'Error uploading resource', error });
  }
};

// Get All Resources (Read)
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    return res.status(200).json(resources);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching resources', error });
  }
};

// Get Single Resource (Read)
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    return res.status(200).json(resource);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching resource', error });
  }
};

// Update Resource (Update)
const updateResource = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedData = { title, description };

    if (req.file) {
      updatedData.file = req.file.filename; // Update file if provided
    }

    const updatedResource = await Resource.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    return res.status(200).json({ message: 'Resource updated successfully', updatedResource });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating resource', error });
  }
};

// Delete Resource (Delete)
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const filePath = path.join(__dirname, '../uploads/', resource.file);

    // Remove file from uploads folder
    fs.unlink(filePath, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting file', err });
      }

      await Resource.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Resource deleted successfully' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting resource', error });
  }
};

// Get File (Serve file)
const getFile = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, '../uploads/', fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }
  });
};

module.exports = {
  addResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
  getFile,
};

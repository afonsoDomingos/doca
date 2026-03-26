require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET
});

// MongoDB Connection
const MONGODB_URI = process.env.VITE_MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ DOCA MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schema for Projects (Escalável)
const ProjectSchema = new mongoose.Schema({
  title: String,
  category: String,
  imageUrl: String,
  isFeatured: Boolean
});

const Project = mongoose.model('Project', ProjectSchema);

// Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Simple route to check server
app.get('/', (req, res) => {
    res.send('DOCA API is running...');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 API DOCA running on port ${PORT}`));

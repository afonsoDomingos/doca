require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  category: String,
  imageUrl: String,
  isFeatured: Boolean
});

const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const Project = mongoose.model('Project', ProjectSchema);
const Admin = mongoose.model('Admin', AdminSchema);

const projectsData = [
  { title: 'Residencial MiraMar', category: 'Construção', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop', isFeatured: true },
  { title: 'Sede Bancária Maputo', category: 'Manutenção', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop', isFeatured: true },
  { title: 'Reforma Comercial', category: 'Antes/Depois', imageUrl: '/project_before_after_1774479019694.png', isFeatured: true },
  { title: 'Edifício Infinity', category: 'Construção', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop', isFeatured: false },
  { title: 'Plano Diretor Industrial', category: 'Consultoria', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop', isFeatured: false },
  { title: 'Manutenção Galeria Central', category: 'Manutenção', imageUrl: 'https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=800&auto=format&fit=crop', isFeatured: false }
];

const adminData = {
  email: 'geral@docacm.com',
  password: '@Admin123@'
};

async function seed() {
  await mongoose.connect(process.env.VITE_MONGODB_URI);
  console.log('Connected to MongoDB');
  
  await Project.deleteMany({});
  await Project.insertMany(projectsData);
  console.log('Projects seeded!');

  await Admin.deleteMany({});
  await Admin.create(adminData);
  console.log('Admin seeded!');

  await mongoose.disconnect();
}

seed().catch(err => console.error(err));

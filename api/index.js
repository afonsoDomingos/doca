require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcryptjs');
const { Resend } = require('resend');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configurations
const resend = new Resend(process.env.RESEND_API_KEY);
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET
});

// MongoDB Connection Strategy for Vercel
let cachedDb = null;
const connectToDatabase = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log('=> Using existing database connection');
    return cachedDb;
  }
  
  const uri = process.env.MONGODB_URI || process.env.VITE_MONGODB_URI;
  if (!uri) {
    console.error('❌ FATAL: MONGODB_URI is not defined in environment!');
    throw new Error('Database configuration missing');
  }

  console.log('=> Connecting to database...');
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    cachedDb = conn;
    console.log('✅ Connected to MongoDB');
    return cachedDb;
  } catch (err) {
    console.error('❌ MONGODB CONNECTION ERROR:', err.message);
    throw err;
  }
};

// Schema for Projects
const ProjectSchema = new mongoose.Schema({
  title: String,
  category: String,
  imageUrl: String,
  isFeatured: Boolean
});

// User (Customer) Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  phone: String,
  role: { type: String, default: 'customer' },
  nuit: String,
  address: String,
  photo: String,
  createdAt: { type: Date, default: Date.now }
});

// Admin Schema
const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true }
});

// Quote / Project Management Schema
const QuoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  clientName: String,
  email: String,
  phone: String,
  serviceType: String,
  budgetRange: String,
  description: String,
  status: { type: String, default: 'Pendente' }, 
  adminNotes: { type: String, default: '' },
  
  // --- NOVOS CAMPOS DE GESTÃO PRO ---
  totalBudget: { type: Number, default: 0 },
  startDate: { type: Date },
  deadline: { type: Date },
  percentage: { type: Number, default: 0 }, // 0 a 100
  
  payments: [{
    amount: Number,
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Pendente' }, // Pago, Pendente
    method: String
  }],
  
  materials: [{
    name: String,
    cost: Number,
    date: { type: Date, default: Date.now }
  }],
  
  workPhotos: [String], // URLs de fotos da obra
  
  additionalDetails: { type: mongoose.Schema.Types.Mixed, default: {} }, // Guardar detalhes dinâmicos (m2, pisos, urgência, etc)
  
  createdAt: { type: Date, default: Date.now }
});

// Banner / Carousel Schema
const BannerSchema = new mongoose.Schema({
  imageUrl: String,
  type: { type: String, default: 'about' },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
const Quote = mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

// Routes
// Projects CRUD
app.get('/api/projects', async (req, res) => {
  try {
    await connectToDatabase();
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    await connectToDatabase();
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await connectToDatabase();
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Banners CRUD
app.get('/api/banners', async (req, res) => {
  try {
    await connectToDatabase();
    const { type } = req.query;
    const filter = type ? { type } : {};
    const banners = await Banner.find(filter).sort({ createdAt: -1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/banners', async (req, res) => {
  try {
    await connectToDatabase();
    const banner = new Banner(req.body);
    await banner.save();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/banners/:id', async (req, res) => {
  try {
    await connectToDatabase();
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banner deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Quote/Project Management
app.put('/api/quotes/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper for beautiful emails
const createEmailTemplate = (data) => `
  <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
    <div style="background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
      <div style="background: #1e293b; padding: 40px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">NOVO PEDIDO DE ORÇAMENTO</h1>
        <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">DOCA Construção & Manutenção</p>
      </div>
      
      <div style="padding: 40px;">
        <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 30px; margin-bottom: 30px;">
          <h3 style="color: #64748b; text-transform: uppercase; font-size: 12px; margin-bottom: 20px;">Detalhes do Cliente</h3>
          <p style="margin: 0 0 10px 0;"><strong>Nome:</strong> ${data.clientName}</p>
          <p style="margin: 0 0 10px 0;"><strong>E-mail:</strong> ${data.email}</p>
          <p style="margin: 0 0 10px 0;"><strong>Telefone:</strong> ${data.phone}</p>
        </div>

        <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 30px; margin-bottom: 30px;">
          <h3 style="color: #64748b; text-transform: uppercase; font-size: 12px; margin-bottom: 20px;">Solicitação</h3>
          <p style="margin: 0 0 10px 0;"><strong>Serviço:</strong> <span style="color: #eb8923; font-weight: bold;">${data.serviceType}</span></p>
          <p style="margin: 0 0 10px 0;"><strong>Faixa de Orçamento:</strong> ${data.budgetRange}</p>
        </div>

        <div>
          <h3 style="color: #64748b; text-transform: uppercase; font-size: 12px; margin-bottom: 20px;">Descrição do Projeto</h3>
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; font-style: italic; color: #475569;">
            ${data.description}
          </div>
        </div>

        <div style="margin-top: 40px; text-align: center;">
          <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="background: #25D366; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: bold; display: inline-block;">Responder via WhatsApp</a>
        </div>
      </div>
      
      <div style="background: #f1f5f9; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
        Este é um e-mail automático gerado pela plataforma DOCA Construção.
      </div>
    </div>
  </div>
`;

// Quotes endpoints
app.post('/api/quotes', async (req, res) => {
  try {
    await connectToDatabase();
    const quote = new Quote(req.body);
    await quote.save();

    // Send beautiful email notification
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'DOCA Platform <onboarding@resend.dev>', // Verifique se o domínio está autenticado no Resend
        to: 'geral@docacm.com',
        subject: `Novo Pedido: ${req.body.serviceType} - ${req.body.clientName}`,
        html: createEmailTemplate(req.body)
      });
    }

    res.json(quote);
  } catch (err) {
    console.error('Error processing quote request:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/quotes', async (req, res) => {
  try {
    await connectToDatabase();
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/quotes/user/:userId', async (req, res) => {
  try {
    await connectToDatabase();
    const quotes = await Quote.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/quotes/:id', async (req, res) => {
  try {
    await connectToDatabase();
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quote deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Authenticação e Gestão de Usuários (Clientes) ---

// Listar todos os usuários (Apenas para Admins)
app.get('/api/users', async (req, res) => {
  try {
    await connectToDatabase();
    const users = await User.find().select('-password'); // Não enviar senhas por segurança
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update User Profile
app.put('/api/user/:id', async (req, res) => {
  try {
    await connectToDatabase(); // Ensure database connection
    const { name, email, phone, nuit, address, photo } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { name, email, phone, nuit, address, photo },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(500).json({ error: 'Erro ao atualizar perfil', details: err.message });
  }
});

// Promover Usuário a Admin
app.post('/api/users/promote', async (req, res) => {
  const { userId } = req.body;
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    // Verificar se já é admin
    const alreadyAdmin = await Admin.findOne({ email: user.email });
    if (alreadyAdmin) return res.status(400).json({ error: 'Este usuário já é um administrador' });

    // Adicionar à coleção de Admins
    const newAdmin = new Admin({ email: user.email, password: user.password });
    await newAdmin.save();

    res.json({ success: true, message: `${user.name} foi promovido a Administrador!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Registro de Usuário (Cliente)
app.post('/api/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log('--- NOVA TENTATIVA DE REGISTRO ---');
  console.log('Dados recebidos (exceto senha):', { name, email, phone });
  
  if (!name || !email || !password) {
    console.log('❌ Falha: Dados obrigatórios ausentes');
    return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios' });
  }

  try {
    console.log('1. Conectando à base de dados para registro...');
    await connectToDatabase();
    
    // Verificar se já existe (sempre em minúsculas)
    const normalizedEmail = email.toLowerCase();
    console.log('2. Verificando existência de e-mail:', normalizedEmail);
    const existingUser = await User.findOne({ email: normalizedEmail });
    
    if (existingUser) {
      console.log('❌ Falha: E-mail já cadastrado');
      return res.status(400).json({ error: 'Este e-mail já está cadastrado' });
    }

    console.log('3. Gerando encriptação segura...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('4. Criando e salvando novo registro...');
    const user = new User({ 
      name, 
      email: normalizedEmail, 
      password: hashedPassword, 
      phone 
    });
    
    await user.save();
    console.log('✅ SUCESSO: Usuário registrado no Banco de Dados');
    
    res.json({ 
      success: true, 
      message: 'Usuário registrado com sucesso', 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (err) {
    console.error('❌ ERRO CRÍTICO NO REGISTRO:', err.name, err.message);
    res.status(500).json({ 
      error: 'Erro interno ao registrar usuário', 
      details: err.message,
      code: err.code || 'UNKNOWN_ERROR'
    });
  }
});

// --- Fim da Gestão de Usuários ---

// Buscar Pedidos de um Cliente Específico
app.get('/api/user/quotes/:userId', async (req, res) => {
  try {
    await connectToDatabase();
    const quotes = await Quote.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Unificado (Admin + Cliente)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('--- NOVA TENTATIVA DE LOGIN ---');
  console.log('E-mail alvo:', email);

  if (!email || !password) {
    console.log('❌ Falha: Credenciais ausentes');
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
  }

  try {
    console.log('1. Conectando à base de dados para login...');
    await connectToDatabase();

    // 1. Verificar Coleção de Admins
    console.log('2. Consultando na coleção de Administradores...');
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (admin) {
      console.log('Admin encontrado. Validando...');
      try {
        const adminPass = admin.password || '';
        const isMatch = await bcrypt.compare(password, adminPass).catch(() => false);
        
        if (isMatch || admin.password === password) {
          console.log('✅ SUCESSO: Admin Identificado');
          return res.json({ 
            success: true, 
            role: 'admin', 
            user: { id: admin._id, email: admin.email, name: 'Administrador' } 
          });
        }
        console.log('❌ Senha Admin Incorreta');
        return res.status(401).json({ error: 'Senha incorreta para esta conta de administrador' });
      } catch (e) {
        console.error('Erro no Bcrypt Admin:', e);
        if (admin.password === password) return res.json({ success: true, role: 'admin' });
      }
    }

    // 2. Verificar Coleção de Clientes
    console.log('3. Consultando na coleção de Clientes...');
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      console.log('Cliente encontrado. Validando...');
      try {
        const userPass = user.password || '';
        const isMatch = await bcrypt.compare(password, userPass).catch(() => false);
        
        if (isMatch || user.password === password) {
           console.log('✅ SUCESSO: Cliente Identificado');
           return res.json({ 
             success: true, 
             role: 'customer', 
             user: { 
               id: user._id, 
               name: user.name, 
               email: user.email,
               phone: user.phone || '',
               nuit: user.nuit || '',
               address: user.address || '',
               photo: user.photo || ''
             }
           });
        }
        console.log('❌ Senha Cliente Incorreta');
        return res.status(401).json({ error: 'Senha incorreta para esta conta de cliente' });
      } catch (e) {
        console.error('Erro no Bcrypt Cliente:', e);
        if (user.password === password) return res.json({ success: true, role: 'customer', user });
      }
    }

    // 3. Nenhum encontrado
    console.log('❌ Conta não encontrada');
    res.status(401).json({ error: 'E-mail ou senha incorretos' });
  } catch (err) {
    console.error('❌ ERRO CRÍTICO NO LOGIN:', err.name, err.message);
    res.status(500).json({ 
      error: 'Erro interno no servidor de autenticação', 
      details: err.message,
      code: err.code || 'AUTH_SYSTEM_ERROR'
    });
  }
});

// --- Admin Login ---
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    res.json({ success: true, message: 'Login realizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Upload de Imagem (Cloudinary) ---
app.post('/api/upload', async (req, res) => {
  try {
    await connectToDatabase();
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'doca_portfolio',
    });
    res.json({ url: uploadResponse.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
  }
});

// Simple route to check server
app.get('/', (req, res) => {
    res.send('DOCA API is running...');
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = 5000;
  app.listen(PORT, () => console.log(`🚀 Local Server running on port ${PORT}`));
}

module.exports = app;

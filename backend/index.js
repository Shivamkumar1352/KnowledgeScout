const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const uploadRoutes = require('./routes/upload');
const questionRoutes = require('./routes/question');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173', // local dev
    'https://knowledge-scout-nine.vercel.app' // your deployed frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

app.get('/ping', (req, res) => res.send('pong'));

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/question', questionRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

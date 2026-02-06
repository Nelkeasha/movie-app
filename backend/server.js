const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/entertainment-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes configuration
app.use('/api/entertainment', movieRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[ServerError]', err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});

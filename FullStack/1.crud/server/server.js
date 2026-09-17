const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crud_db';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require('./routes/studentRoutes');
const itemRoutes = require('./routes/itemRoutes');
app.use('/api/students', studentRoutes);
app.use('/api/items', itemRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Fallback 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

// Connect to MongoDB & start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected successfully to MongoDB at: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for root
app.get('/', (req, res) => {
  res.send('Interview Portal API is running...');
});

// Import Routes
const authRoutes = require('./routes/authcontroller');
const questionRoutes = require('./routes/questioncontroller');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);

// Error Handling Middleware (Basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});


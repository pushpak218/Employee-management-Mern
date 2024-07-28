require('dotenv').config(); // Ensure this is at the top to load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
const loginRoutes = require('./Routes/login');
const employeeRoutes = require('./Routes/employee');

app.use('/api/login', loginRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

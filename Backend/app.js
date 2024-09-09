const express = require('express');
const mongoose = require('mongoose');
const sensorRoutes = require('./routes/sensorRoutes');
const sensorDataRoutes = require('./routes/sensorDataRoutes');
const cors = require('cors');
const connectDB = require("./config/database");

const app = express();
const port = process.env.PORT || 3000;

// Database connection
connectDB().then(() => {
    console.log("Database connected successfully!");
}).catch(err => {
    console.error("Database connection failed:", err.message);
});

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/sensors', sensorRoutes);
app.use('/sensorData', sensorDataRoutes);

// Catch-all route for handling 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Starting the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;

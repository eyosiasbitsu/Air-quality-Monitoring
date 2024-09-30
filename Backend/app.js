const express = require('express');
const mongoose = require('mongoose');

const sensorRoutes = require('./routes/sensorRoutes');
const sensorDataRoutes = require('./routes/sensorDataRoutes');
const userRoutes = require('./routes/userRoutes');

const cors = require('cors');
const connectDB = require("./config/database");
const initFirebaseSync = require('./services/firebaseSync');
const app = express();
const port = process.env.PORT || 3000;

// Database connection
connectDB().then(() => {
    console.log("Database connected successfully!");
}).catch(err => {
    console.error("Database connection failed:", err.message);
});

initFirebaseSync();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Log incoming request body for debugging
app.use((req, res, next) => {
    console.log(`Incoming request data: ${JSON.stringify(req.body)}`);
    next();
});

// Routes
app.use('/sensors', sensorRoutes);
app.use('/sensorData', sensorDataRoutes);
app.use('/user', userRoutes);

// Catch-all route for handling 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Starting the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;

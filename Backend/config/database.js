const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.dbConnection, {
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Database connection failed. Exiting now...', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
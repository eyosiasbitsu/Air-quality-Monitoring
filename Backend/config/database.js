const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.dbConnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Database connection failed. Exiting now...', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
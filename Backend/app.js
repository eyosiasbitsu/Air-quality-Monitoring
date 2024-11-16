const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sensorRoutes = require("./routes/sensorRoutes");
const sensorDataRoutes = require("./routes/sensorDataRoutes");
const userRoutes = require("./routes/userRoutes");
const syncRoutes = require("./routes/syncRoutes");

// const {populateDatabase} = require("./scripts/populateData");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const port = process.env.PORT || 3000;

// Swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CleanAir API",
      version: "1.0.0",
      description: "API documentation for the CleanAir project",
    },
    servers: [
      {
        url: `https://air-quality-monitoring-duxk.onrender.com`,
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the route files where Swagger comments will be added
};

// Swagger docs setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database connection
connectDB()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Log incoming request body for debugging
app.use((req, res, next) => {
  console.log(`Incoming request data: ${JSON.stringify(req.body)}`);
  next();
});

// Routes
app.use("/sensors", sensorRoutes);
app.use("/sensorData", sensorDataRoutes);
app.use("/user", userRoutes);
app.use("/sync", syncRoutes);
// Catch-all route for handling 404 errors
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // populateDatabase();
});

module.exports = app;

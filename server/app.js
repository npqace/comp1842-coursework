const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const genreRoutes = require('./routes/genreRoutes');
require('dotenv').config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB
connectDB();

// enable CORS
app.use(cors());

app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/genres', genreRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
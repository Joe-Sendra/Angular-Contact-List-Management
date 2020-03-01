// This file is the nodeJS server application

// Allow construction of paths safe for any OS
const path = require('path');

// Web framework that let’s you structure a web application
// to handle multiple different http requests at a specific url
const express = require('express');

// Middleware used to parse the request data
// This allows you to use methods like req.body
const bodyParser = require('body-parser');

// Need to import so we can avoid CORS errors
const cors = require('cors');

// Need to import so that we can connect the database to the nodeJS server
const mongoose = require('mongoose');

// Used for environment variables
require('dotenv').config();

// Need to import our routes
const contactRoutes = require('./routes/contacts');
const userRoutes = require('./routes/users');

// Create the server application
const app = express();

// Connect the database to the app (returns a promise)
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

// CORS Middleware
app.use(cors());

// Middleware for application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
});

module.exports = app;

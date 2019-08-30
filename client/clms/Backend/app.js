// This file is the nodeJS server application

// Allow construction of paths safe for any OS
const path = require('path');

// Web framework that let’s you structure a web application
// to handle multiple different http requests at a specific url
const express = require('express');

// Middleware used to parse the request data
// This allows you to use methods like req.body
const bodyParser = require('body-parser');

// Need to import so that we can connect the database to the nodeJS server
const mongoose = require('mongoose');

// Need to import our routes
const contactRoutes = require('./routes/contacts');
const userRoutes = require('./routes/users');

// Create the server application
const app = express();

// Connect the database to the app (returns a promis)
mongoose.connect(
  'mongodb+srv://JoeyDevs:' +
  process.env.MONGO_ATLAS_PW +
  '@cluster0-aihio.mongodb.net/CLMS?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

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

module.exports = app;

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.route');
const mongoose = require('mongoose');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Use user routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB', err);
    });
  

// Specify the port to listen on
const port = process.env.PORT || 3000; // You can use environment variables for port configuration

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
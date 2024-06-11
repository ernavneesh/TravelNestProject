const express = require('express');
const app = express();

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Specify the port to listen on
const port = process.env.PORT || 3000; // You can use environment variables for port configuration

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
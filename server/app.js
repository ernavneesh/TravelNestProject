const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.route');
const destinationRoutes = require('./routes/destination.route');
const packageRoutes = require('./routes/package.route');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Middleware to log requests
app.use((req, res, next) => {
    next();
});

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

app.use('/api/users', userRoutes);
app.use('/api/destination', destinationRoutes);
app.use('/api/package', packageRoutes);

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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

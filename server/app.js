const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.route');
const destinationRoutes = require('./routes/destination.route');
const packageRoutes = require('./routes/package.route');
const userAnalysisRoutes = require('./routes/userAnalysis.route');
const discountRoutes = require('./routes/discount.route');
const bookingRoutes = require('./routes/booking.route');
const reviewRoutes = require('./routes/review.route');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const Booking = require('./models/booking.model');
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

// Other routes
app.use('/api/users', userRoutes);
app.use('/api/destination', destinationRoutes);
app.use('/api/package', packageRoutes);
app.use('/api/userAnalysis', userAnalysisRoutes);
app.use('/api/discount', discountRoutes);
app.use('/api/bookPackage', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

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

app.post('/api/sendEmail', (req, res) => {
    const { to, subject, text } = req.body;
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'travelnestbyechologic@gmail.com',
        pass: 'zgcf wtdy mkgj vzez'
      }
    });
  
    const mailOptions = {
      from: 'travelnestbyechologic@gmail.com',
      to,
      subject,
      text
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Failed to send email:', error);
        res.status(500).send('Failed to send email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent: ' + info.response);
      }
    });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require('express');
const router = express.Router();
const Booking = require('../controllers/booking.controller');

router.post('/', Booking.bookPackage);

module.exports = router;

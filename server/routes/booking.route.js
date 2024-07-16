const express = require('express');
const router = express.Router();
const Booking = require('../controllers/booking.controller');

router.post('/', Booking.bookPackage);
router.post('/:userId', Booking.getBookingByUserId);

module.exports = router;

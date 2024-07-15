const express = require('express');
const router = express.Router();
const Booking = require('../controllers/booking.controller');
const verifyToken = require('../middleware/auth');

router.post('/',verifyToken, Booking.bookPackage);
router.post('/:userId',verifyToken, Booking.getBookingByUserId);

module.exports = router;

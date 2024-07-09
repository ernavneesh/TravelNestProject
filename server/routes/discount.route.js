const express = require('express');
const router = express.Router();
const Discount = require('../controllers/discount.controller');

router.get('/active-discounts/:userId', Discount.getActiveDiscounts);

module.exports = router;

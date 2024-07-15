const express = require('express');
const router = express.Router();
const Discount = require('../controllers/discount.controller');
const verifyToken = require('../middleware/auth');

router.get('/active-discounts/:userId',verifyToken, Discount.getActiveDiscounts);
router.get('/:id',verifyToken, Discount.getDiscountById);

module.exports = router;

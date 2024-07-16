const express = require('express');
const router = express.Router();
const Review = require('../controllers/review.controller');
const verifyToken = require('../middleware/auth');

router.post('/',verifyToken, Review.addReview);
router.post('/:packageId', verifyToken, Review.getReviewsByPackage);

module.exports = router;

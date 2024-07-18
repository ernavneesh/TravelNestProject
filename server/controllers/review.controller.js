const Review = require('../models/review.model');
const mongoose = require('mongoose');

exports.addReview = async (req, res) => {
    const { packageId, bookingId, userId, rating, reviewDescription } = req.body;

    try {
        const newReview = new Review({
            packageId,
            bookingId,
            userId,
            rating,
            reviewDescription,
            createdAt: new Date()
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).send({ error: 'Failed to add review' });
    }
};

exports.getReviewsByPackage = async (req, res) => {
    const { packageId } = req.params;

    try {
        const reviews = await Review.find({ packageId });

        if (reviews.length === 0) {
            return res.status(404).json({ error: 'No reviews found for this package' });
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        res.status(200).json({ reviews, averageRating });
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch reviews' });
    }
};

exports.getReviewByBookingId = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const review = await Review.findOne({ bookingId : bookingId });

        if (!review) {
            return res.status(404).json({ error: 'No review found for this user and booking' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch review' });

    }
};

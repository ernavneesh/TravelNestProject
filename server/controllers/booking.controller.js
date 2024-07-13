const Booking = require('../models/booking.model');
const Discount = require('../models/discount.model');
const mongoose = require('mongoose');

exports.bookPackage = async (req, res) => {
    const {
        packageId,
        userId,
        discountId,
        noOfPerson,
        personDetails,
        amountPerPerson,
        dateOfTravel,
        bookingDate,
        totalAmount
    } = req.body;

    try {
        let discount;
        if (discountId) {
            discount = await Discount.findById(discountId);
            if (!discount) {
                return res.status(404).json({ error: 'Discount not found' });
            }

            if (discount.status !== 'active') {
                return res.status(400).json({ error: 'Discount is not active' });
            }
        }

        const newBooking = new Booking({
            packageId,
            userId,
            discountId,
            noOfPerson,
            personDetails,
            amountPerPerson,
            dateOfTravel,
            bookingDate,
            totalAmount
        });

        await newBooking.save();

        if (discount) {
            discount.status = 'used';
            await discount.save();
        }

        res.status(201).json(newBooking);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Failed to book package' });
    }
};

exports.getBookingByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ userId }).populate('packageId').populate('discountId');
        res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Failed to get bookings' });
    }
};
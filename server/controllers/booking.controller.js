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

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let discount;
        if (discountId) {
            discount = await Discount.findById(discountId).session(session);
            if (!discount) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ error: 'Discount not found' });
            }

            if (discount.status !== 'active') {
                await session.abortTransaction();
                session.endSession();
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

        await newBooking.save({ session });

        if (discount) {
            discount.status = 'used';
            await discount.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(newBooking);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({ error: 'Failed to book package' });
    }
};
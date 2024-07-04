const Booking = require('../models/booking.model');

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

        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).send({ error: 'Failed to book package' });
    }
};

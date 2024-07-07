const Discount = require('../models/discount.model');

exports.getActiveDiscounts = async (req, res) => {
    const { userId } = req.params;

    try {
        const activeDiscounts = await Discount.find({ userId, status: 'active' });
        res.status(200).json(activeDiscounts);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch active discounts' });
    }
};

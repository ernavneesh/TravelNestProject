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

exports.getDiscountById = async (req, res) => {
    try {
      const discount = await Discount.findById(req.params.id);
      if (!discount) {
        return res.status(404).json({ message: 'Discount not found' });
      }
      res.json(discount);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

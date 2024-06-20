const Destination = require('../models/destination.model');

const getDestinations = async (req, res) => {
    try {
      const destinations = await Destination.find();
      res.status(200).json(destinations);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch destinations' });
    }
  };

module.exports = { getDestinations };

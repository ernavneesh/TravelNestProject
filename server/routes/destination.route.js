const express = require('express');
const router = express.Router();
const Destination = require('../controllers/destination.controller');

router.get('/', Destination.getDestinations);
router.get('/:id', Destination.getDestinationById);

module.exports = router;

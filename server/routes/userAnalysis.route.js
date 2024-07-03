const express = require('express');
const router = express.Router();
const UserAnalysis = require('../controllers/userAnalysis.controller');

router.post('/', UserAnalysis.storeInteraction);

module.exports = router;
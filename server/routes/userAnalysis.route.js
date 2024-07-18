const express = require('express');
const router = express.Router();
const UserAnalysis = require('../controllers/userAnalysis.controller');
const verifyToken = require('../middleware/auth');

router.post('/',verifyToken, UserAnalysis.storeInteraction);

module.exports = router;
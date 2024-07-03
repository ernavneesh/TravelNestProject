const express = require('express');
const router = express.Router();
const Package = require('../controllers/package.controller');

router.get('/', Package.getpackages);
router.get('/:id', Package.getPackageById);

module.exports = router;

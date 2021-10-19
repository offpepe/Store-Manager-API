const express = require('express');
const { createNewSale } = require('../controllers/salesController');

const router = express.Router();

router.post('/', createNewSale);

module.exports = router;
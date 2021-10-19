const express = require('express');
const { createNewSale } = require('../controllers/salesController');
const { validateNewProduct } = require('../validations/salesValiations');

const router = express.Router();

router.post('/', validateNewProduct, createNewSale);

module.exports = router;
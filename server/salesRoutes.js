const express = require('express');
const { createNewSale, getAllSales } = require('../controllers/salesController');
const { validateNewProduct } = require('../validations/salesValiations');

const router = express.Router();

router.post('/', validateNewProduct, createNewSale);
router.get('/', getAllSales);

module.exports = router;
const express = require('express');
const { createNewSale, getAllSales, getSalesById } = require('../controllers/salesController');
const { validateNewProduct, validateID } = require('../validations/salesValiations');

const router = express.Router();

router.get('/', getAllSales);
router.get('/:id', validateID, getSalesById);
router.post('/', validateNewProduct, createNewSale);

module.exports = router;
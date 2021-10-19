const express = require('express');
const { createNewProduct, getAllProducts } = require('../controllers/productsController');
const { validateProductFields } = require('../validations/productValidations');

const router = express.Router();

/* PRODUCTS ROUTES */
router.post('/', validateProductFields, createNewProduct);
router.get('/', getAllProducts);

module.exports = router;
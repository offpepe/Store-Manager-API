const express = require('express');
const { createNewProduct, getAllProducts, getById } = require('../controllers/productsController');
const { validateProductFields } = require('../validations/productValidations');

const router = express.Router();

/* PRODUCTS ROUTES */
router.get('/', getAllProducts);
router.get('/:id', getById);
router.post('/', validateProductFields, createNewProduct);

module.exports = router;
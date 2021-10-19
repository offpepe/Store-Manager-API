const express = require('express');
const { createNewProduct, getAllProducts, getById } = require('../controllers/productsController');
const { validateProductFields, validateId } = require('../validations/productValidations');

const router = express.Router();

/* PRODUCTS ROUTES */
router.get('/', getAllProducts);
router.get('/:id', validateId, getById);
router.post('/', validateProductFields, createNewProduct);

module.exports = router;
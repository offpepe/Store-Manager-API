const express = require('express');
const {
    createNewProduct,
    getAllProducts,
    getById,
    updateProduct,
    deleteProduct,
 } = require('../controllers/productsController');
const { validateProductFields, validateId } = require('../validations/productValidations');

const router = express.Router();

/* PRODUCTS ROUTES */
router.get('/', getAllProducts);
router.get('/:id', validateId, getById);
router.post('/', validateProductFields, createNewProduct);
router.put('/:id', validateId, validateProductFields, updateProduct);
router.delete('/:id', validateId, deleteProduct);

module.exports = router;
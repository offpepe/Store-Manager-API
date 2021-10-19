const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

/* PRODUCTS ROUTES */
router.post('/', productsController.createNewProduct);
router.get('/', productsController.getAllProducts);

module.exports = router;
const express = require('express');
const { 
    createNewSale,
    getAllSales,
    getSalesById,
    updateSale,
    deleteSale,
} = require('../controllers/salesController');
const { 
    validateNewProduct,
    validateID,
    validateIdAsNotFound,
 } = require('../validations/salesValiations');
const { createSaleTrigger, deleteSaleTrigger } = require('../triggers/sales');

const router = express.Router();

router.get('/', getAllSales);
router.get('/:id', validateIdAsNotFound, getSalesById);
router.post('/', validateNewProduct, createSaleTrigger, createNewSale);
router.put('/:id', validateID, validateNewProduct, createSaleTrigger, updateSale);
router.delete('/:id', validateID, deleteSaleTrigger, deleteSale);

module.exports = router;
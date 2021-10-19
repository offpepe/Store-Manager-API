const express = require('express');
const { 
    createNewSale,
    getAllSales,
    getSalesById,
    updateSale,
    deleteSale,
} = require('../controllers/salesController');
const { validateNewProduct, validateID } = require('../validations/salesValiations');

const router = express.Router();

router.get('/', getAllSales);
router.get('/:id', validateID, getSalesById);
router.post('/', validateNewProduct, createNewSale);
router.put('/:id', validateID, validateNewProduct, updateSale);
router.delete('/:id', validateID, deleteSale);

module.exports = router;
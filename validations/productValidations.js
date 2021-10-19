const { ObjectId } = require('mongodb');
const service = require('../services/productsService');
const error = require('../errors/messages');

const validateProductFields = async (req, res, next) => {
    const { name, quantity } = req.body;
    const products = await service.getAllProducts();
    const alreadyExists = products.some(({ name: prodName }) => prodName === name);
    if (name.length < 5) return res.status(422).json({ err: error.invalidName }); 
   
    if (alreadyExists) return res.status(422).json({ err: error.productAlreadyExists });
   
    if (quantity < 1) return res.status(422).json({ err: error.invalidQtd });
   
    if (typeof quantity !== 'number') return res.status(422).json({ err: error.invalidQtdType });
    
    next();
};

const validateUpdateFields = async (req, res, next) => {
    const { name, quantity } = req.body;
    if (name.length < 5) return res.status(422).json({ err: error.invalidName });    
   
    if (quantity < 1) return res.status(422).json({ err: error.invalidQtd });
   
    if (typeof quantity !== 'number') return res.status(422).json({ err: error.invalidQtdType });
    
    next();
};

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(422).json({ err: error.invalidId });
    next();
};

module.exports = {
    validateProductFields,
    validateUpdateFields,
    validateId,
};
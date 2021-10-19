const service = require('../services/productsService');
const error = require('../errors/messages');

const validateProductFields = async (req, res, next) => {
    const { name, quantity } = req.body;
    const products = await service.getAllProducts();
    if (name.length < 5) {
      return res.status(422).json({ err: error.invalidName });
    } 
    if (products.some(({ name: prodName }) => prodName === name)) {
      return res.status(422).json({ err: error.productAlreadyExists });
    }
    if (quantity < 1) {
      return res.status(422).json({ err: error.invalidQtd });
    }
    if (typeof quantity !== 'number') {
      return res.status(422).json({ err: error.invalidQtdType });
    }
    next();
};

module.exports = {
    validateProductFields,
};
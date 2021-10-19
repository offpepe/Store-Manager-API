const { ObjectId } = require('mongodb');
const error = require('../errors/messages');

module.exports = {
    validateNewProduct: (req, res, next) => {
        const products = req.body;
        const hasInvalidId = products.some(({ productId }) => !ObjectId.isValid(productId));
        const hasInvalidQTD = products
          .some(({ quantity }) => quantity < 1 || typeof quantity !== 'number');
        if (hasInvalidId) return res.status(422).json({ err: error.invalidIdOrQTD });
        
        if (hasInvalidQTD) return res.status(422).json({ err: error.invalidIdOrQTD });
        next();
    },
    validateID: async (req, res, next) => {
        const { id } = req.params;        
        if (!ObjectId.isValid(id)) return res.status(422).json({ err: error.invalidId });        
        next();
    },
};
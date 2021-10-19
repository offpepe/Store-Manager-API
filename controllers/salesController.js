const salesService = require('../services/salesService');

module.exports = {
    createNewSale: async (req, res) => {
      const products = req.body;
      const result = await salesService.createNewSale(products);
      return res.status(201).json(result);
    },
};
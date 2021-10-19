const salesService = require('../services/salesService');
const error = require('../errors/messages');

module.exports = {
    createNewSale: async (req, res) => {
      const products = req.body;
      const result = await salesService.createNewSale(products);
      return res.status(200).json(result);
    },
    getAllSales: async (_req, res) => {
        const sales = await salesService.getAllSales();
        return res.status(200).json({ sales });
    },
    getSalesById: async (req, res) => {
        const { id } = req.params;
        const sale = await salesService.getSalesById(id);
        if (!sale) return res.status(404).json({ err: error.saleNotFound });
        return res.status(200).json(sale);
    },
};
const salesService = require('../services/salesService');

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
        return res.status(200).json(sale);
    },
};
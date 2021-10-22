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
    updateSale: async (req, res) => {
        const { id } = req.params;
        const products = req.body;
        const updated = await salesService.updateSale(id, products);
        return res.status(200).json(updated);
    },
    deleteSale: async (req, res) => {
        const { id } = req.params;
        const deleted = await salesService.deleteSale(id);
        return res.status(200).json(deleted);
    },
};
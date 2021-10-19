const salesModel = require('../models/salesModel');

module.exports = {
    createNewSale: async (products) => {
      const result = await salesModel.createNewSale(products);
      return result;
    },
    getAllSales: async () => {
        const result = await salesModel.getAllSales();
        return result;
    },
    getSalesById: async (id) => {
        const result = await salesModel.getSalesById(id);
        return result[0];
    },
    updateSale: async (id, products) => {
        const updated = await salesModel.updateSale(id, products);
        return updated.value;
    },
};
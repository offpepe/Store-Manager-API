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
};
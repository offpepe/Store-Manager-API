const salesModel = require('../models/salesModel');

module.exports = {
    createNewSale: async (products) => {
      const result = await salesModel.createNewSale(products);
      return result;
    },
};
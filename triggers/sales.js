const { getById: getProductById, updateProduct } = require('../services/productsService');
const { getSalesById } = require('../services/salesService');
const error = require('../errors/messages');

module.exports = {
    createSaleTrigger: async (req, res, next) => {
        const sales = req.body;
        sales.forEach(async (sale) => {
            const { productId, quantity } = sale;
            const product = await getProductById(productId);
            if (!product) return res.status(404).json({ err: error.productNotFound });
            const { _id: id, name, quantity: qtd } = product;
            if (quantity > qtd - 1) return res.status(400).json({ err: error.outOfStock });
            const newQtd = qtd - quantity;
            await updateProduct(id, name, newQtd);
            next();
        });
    },
    deleteSaleTrigger: async (req, res, next) => {
        const { id } = req.params;
        const sale = await getSalesById(id);
        if (!sale) return res.status(404).json({ err: error.saleNotFound });
        const { itensSold } = sale;
        itensSold.forEach(async (item) => {
          const { productId, quantity } = item;
          const product = await getProductById(productId);
          const { quantity: qtd, name } = product;
          const newQtd = qtd + quantity;
          await updateProduct(productId, name, newQtd);
          next();
        });
    },
};
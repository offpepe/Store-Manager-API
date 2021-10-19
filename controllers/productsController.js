const productsService = require('../services/productsService');

const createNewProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const result = await productsService.createNewProduct(name, quantity);
    return res.status(200).json(result);
};

module.exports = {
    createNewProduct,
};
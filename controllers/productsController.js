const productsService = require('../services/productsService');

const createNewProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const result = await productsService.createNewProduct(name, quantity);
    return res.status(200).json(result);
};

const getAllProducts = async (_req, res) => {
    const products = await productsService.getAllProducts();
    return res.status(201).json({ products });
};

const getById = async (req, res) => {
    const { id } = req.params;
    const product = await productsService.getById(id);
    return res.status(200).json(product);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updated = await productsService.updateProduct(id, name, quantity);
    return res.status(200).json(updated);
};

module.exports = {
    createNewProduct,
    getAllProducts,
    getById,
    updateProduct,
};
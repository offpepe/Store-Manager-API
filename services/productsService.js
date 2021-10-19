const productsModel = require('../models/productsModel');

const createNewProduct = async (name, quantity) => {
    const result = await productsModel.createNewProduct(name, quantity);
    const { _id } = result.ops[0];
    return { _id, name, quantity };
};

const getAllProducts = async () => {
    const result = await productsModel.getAllProducts();
    return result;
};

const getById = async (id) => {
    const product = await productsModel.getById(id);
    return product[0];
};

module.exports = {
    createNewProduct,
    getAllProducts,
    getById,
};
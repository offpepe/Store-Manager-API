const productsModel = require('../models/productsModel');

const createNewProduct = async (name, quantity) => {
    const result = await productsModel.createNewProduct(name, quantity);
    const { _id } = result.ops[0];
    return { _id, name, quantity };
};

module.exports = {
    createNewProduct,
};
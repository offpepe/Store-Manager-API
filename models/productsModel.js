const conn = require('../connections/connection');

const coll = 'products';

const createNewProduct = async (name, quantity) => {
    const db = await conn();
    const result = await db.collection(coll).insertOne({ name, quantity });
    return result;  
};

const getAllProducts = async () => {
    const db = await conn();
    const result = await db.collection(coll).find().toArray();
    return result;
};

module.exports = {
    createNewProduct,
    getAllProducts,
};
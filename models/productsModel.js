const conn = require('../connections/connection');

const coll = 'products';

const createNewProduct = async (name, quantity) => {
    const db = await conn();
    const result = await db.collection(coll).insertOne({ name, quantity });
    return result;  
};

module.exports = {
    createNewProduct,
};
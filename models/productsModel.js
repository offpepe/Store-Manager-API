const { ObjectId } = require('mongodb');
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

const getById = async (id) => {
    const db = await conn();
    const result = await db.collection(coll).find({ _id: ObjectId(id) }).toArray();
    return result;
};

const updateProduct = async (id, name, quantity) => {
    const db = await conn();
    const result = await db.collection(coll).findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, quantity } },
        { returnDocument: 'after' },
    );
    return result;
};

const deleteProduct = async (id) => {
    const db = await conn();
    const result = await db.collection(coll).findOneAndDelete(
      { _id: ObjectId(id) },
      { returnDocument: 'before' },
    );
    return result;
};

module.exports = {
    createNewProduct,
    getAllProducts,
    getById,
    updateProduct,
    deleteProduct,
};
const { ObjectId } = require('mongodb');
const conn = require('../connections/connection');

const coll = 'sales';

module.exports = {
    createNewSale: async (products) => {
        const db = await conn();
        const result = await db.collection(coll).insertOne({ itensSold: products });
        return result.ops[0];
    },
    getAllSales: async () => {
        const db = await conn();
        const result = await db.collection(coll).find().toArray();
        return result;
    },
    getSalesById: async (id) => {
        const db = await conn();
        const result = await db.collection(coll).find({ _id: ObjectId(id) }).toArray();
        return result;
    },
    updateSale: async (id, products) => {
        const db = await conn();
        const result = await db.collection(coll).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: { itensSold: products } },
            { returnDocument: 'after' },
        );
        return result;
    },
    deleteSale: async (id) => {
        const db = await conn();
        const result = await db.collection(coll).findOneAndDelete(
            { _id: ObjectId(id) },
            { returnDocument: 'before' },
        );
        return result;
    },
};
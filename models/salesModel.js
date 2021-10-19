const conn = require('../connections/connection');

const coll = 'sales';

module.exports = {
    createNewSale: async (products) => {
        const db = await conn();
        const result = await db.collection(coll).insertOne({ itensSold: products });
        return result.ops[0];
    },
};
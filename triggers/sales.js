const {
    getById: getProductById,
    getAllProducts,
    updateProduct,
 } = require('../services/productsService');
const { getSalesById } = require('../services/salesService');
const error = require('../errors/messages');

module.exports = {
    createSaleTrigger: async (req, res, next) => {
    const sales = req.body;
    const products = await getAllProducts();
    /* THIS MONSTER IS THAT BIGGER CAUSE turning string 
    into objectId is'nt working, that json stringfy just 
    before a parse makes turns a JSON string before comes 
    out as a string, and then i can say that is === and it works :)
     */
    const hasStock = sales
      .map(({ productId, quantity: qtd }) => {
        const product = products
        .filter(({ _id: id }) => JSON.parse(JSON.stringify(id)) === productId)[0];
        if (!product) return false;
        return qtd <= product.quantity;
      });
    if (hasStock.some((stock) => !stock)) return res.status(404).json({ err: error.outOfStock });
    await sales.forEach(async ({ productId, quantity }) => {
        const product = products
        .filter(({ _id: id }) => JSON.parse(JSON.stringify(id)) === productId)[0];
        const { _id: id, name, quantity: qtd } = product;
        const newQtd = qtd - quantity;
        await updateProduct(id, name, newQtd);
    });
    next();
},
    deleteSaleTrigger: async (req, res, next) => {
        const { id } = req.params;
        const sale = await getSalesById(id);
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
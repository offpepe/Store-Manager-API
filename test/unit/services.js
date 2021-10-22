const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sinon = require('sinon');

const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');

const productsMock = [
    { 
        name: 'Poção de cura pequena',
        quantity: 64,
    },
    {
        name: 'Poção de cura grande',
        quantity: 32,
    },
    {
        name: 'Poção de cura revigorante',
        quantity: 16,
    },
    {
        name: 'Poção de pontos de esforço',
        quantity: 22,
    },
    {
        name: 'Energético',
        quantity: 13,
    },
    {
        name: 'Macarrão instantâneo',
        quantity: 34,
    },
]

const fillProducts = async () => {
    for (let index = 0; index < productsMock.length; index++) {
        const { name, quantity } = productsMock[index];
        await productsService.createNewProduct(name, quantity);        
    }
};

const clearDB = async () => {
    const products = await productsService.getAllProducts();
    const sales = await salesService.getAllSales();
    await products.forEach(({ _id: id }) => productsService.deleteProduct(id));
    await sales.forEach(({ _id: id }) => salesService.deleteSale(id));
};

const fillSales = async () => {
    const products = await productsService.getAllProducts();
    const shuffledProd = products.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
    const sales = products.map(({ _id: id, quantity }) => ({ productId: id, quantity }) );
    const sales2 = shuffledProd.map(({ _id: id, quantity }) => ({ productId: id, quantity }) );
    await salesService.createNewSale(sales);
    await salesService.createNewSale(sales2);
}

describe('Testes da camada Service', () => {
    const DBServer = new MongoMemoryServer();
  
    beforeEach(async () => {
      const URLMock = await DBServer.getUri();
      
      const connectionMock = await MongoClient
      .connect(URLMock, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      await fillProducts();
  
    });
  
    afterEach(async () => {
      await clearDB();
      MongoClient.connect.restore();
    });

    describe('Products Service', () => {
        it ('Consegue cadastrar novo produto', async () => {
          const { name, quantity } = productsMock[0];
          const created = await productsService.createNewProduct(name, quantity);
          expect(created).to.be.an('object');
          expect(created.name).to.be.equal(name);
          expect(created.quantity).to.be.eq(quantity);
        });
        it ('Consegue encontrar todos os produtos e um certo produto', async () => {
            const allProducts = await productsService.getAllProducts();
            const { _id: id, name, quantity } = allProducts[3];
            const product = await productsService.getById(id);
            expect(product).to.be.an('object');
            expect(product.name).to.be.eq(name);
            expect(product.quantity).to.be.eq(quantity);
        });
        it ('Consegue atualizar um produto', async () => {
            const allProducts = await productsService.getAllProducts();
            const { _id: id } = allProducts[0];
            const { name, quantity } = allProducts[2];
            const updated = await productsService.updateProduct(id, name, quantity);
            expect(updated).to.be.an('object');
            expect(updated.name).to.be.eq(name);
            expect(updated.quantity).to.be.eq(quantity);
        });
        it ('Consegue deletar um produto', async () => {
            const allProducts = await productsService.getAllProducts();
            const { _id: id, name, quantity } = allProducts[2];
            await productsService.deleteProduct(id);
            const allProductsReborn = await productsService.getAllProducts();
            const { name: newName, quantity: newQuantity } = allProductsReborn[2];
            expect(allProductsReborn[2]).to.not.be.deep.eq(allProducts[2]);
            expect(newName).to.not.be.eq(name);
            expect(newQuantity).to.not.be.eq(quantity);            
        });
        it('Consegue cadastrar venda', async () => {
          const allProducts = await productsService.getAllProducts();
          const sales = allProducts.map(({ _id: id, quantity }) => ({ productId: id, quantity }));
          const created = await salesService.createNewSale(sales);
          expect(created).to.be.an('object');
          expect(created.itensSold).to.be.an('array');
          expect(created.itensSold).to.be.deep.eq(sales);
        });
        it('Consegue encontrar todas as vendas e uma certa venda', async () => {
            await fillSales();
            const sales = await salesService.getAllSales();
            const allProducts = await productsService.getAllProducts();
            const { _id: id } = sales[0];
            const sale = await salesService.getSalesById(id);
            const products = allProducts.map(({ _id: id, quantity }) => ({ productId: id, quantity }));
            expect(sales).to.be.an('array');
            expect(sale).to.be.an('object');
            expect(sales).to.have.length(2);
            expect(sale.itensSold).to.be.deep.eq(products);
        });
        it('Consegue atualizar uma venda', async () => {
            await fillSales();
            const sales = await salesService.getAllSales();
            const { _id: id, itensSold: oldItensSold } = sales[0];
            const { itensSold } = sales[1];
            const updated = await salesService.updateSale(id, itensSold);
            expect(updated).to.not.be.deep.eq(sales[0]);
            expect(updated.itensSold).to.be.deep.eq(itensSold);
            expect(updated['_id']).to.be.deep.eq(id);
        });
        it('Consegue deletar uma venda', async () => {
            await fillSales();
            const sales = await salesService.getAllSales();
            const { _id: id } = sales[0];
            await salesService.deleteSale(id);
            const salesReborn = await salesService.getAllSales();
            expect(salesReborn).to.not.be.eq(sales);
            expect(salesReborn[0]).to.not.be.deep.eq(sales[0]);
        })
    })
})
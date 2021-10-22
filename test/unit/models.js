const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sinon = require('sinon');

const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

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
        await productsModel.createNewProduct(name, quantity);        
    }
};

const clearDB = async () => {
    const products = await productsModel.getAllProducts();
    const sales = await salesModel.getAllSales();
    await products.forEach(({ _id: id }) => productsModel.deleteProduct(id));
    await sales.forEach(({ _id: id }) => salesModel.deleteSale(id));
};

const fillSales = async () => {
    const products = await productsModel.getAllProducts();
    const shuffledProd = products.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
    const sales = products.map(({ _id: id, quantity }) => ({ productId: id, quantity }) );
    const sales2 = shuffledProd.map(({ _id: id, quantity }) => ({ productId: id, quantity }) );
    await salesModel.createNewSale(sales);
    await salesModel.createNewSale(sales2);
}

describe('Testes da camada Model', async() => {
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

    describe('ProductModels', () => {
      it('Consegue inserir novo produto com sucesso', async () => {
        const { name, quantity } = productsMock[2]
        const rawResponse = await productsModel.createNewProduct(name, quantity);
        const response = rawResponse.ops[0];
        expect(response).to.be.an('object');
        expect(response.name).to.be.deep.equal(name);
        expect(response.quantity).to.be.deep.equal(quantity);
      });
      it('Consegue buscar todos os produtos da coleção', async () => {
        const products = await productsModel.getAllProducts();
        expect(products).to.be.an('array');
        expect(products).to.have.length(productsMock.length);
      });
      it('Consegue buscar certo produto da coleção', async () => {
        const products = await productsModel.getAllProducts();
        const { _id: id } = products[3];
        const product = await productsModel.getById(id);
        expect(product[0]).to.be.an('object');
        expect(product[0]).to.be.deep.equal(products[3]);
      });
      it('Atualiza o produto com sucesso', async () => {
        const products = await productsModel.getAllProducts();
        const { _id: id } = products[0];
        const newName = "Poção de viajante";
        const newQuantity = 92;
        const rawUpdatedProduct = await productsModel.updateProduct(id, newName, newQuantity);
        const updatedProduct = rawUpdatedProduct.value;
        expect(updatedProduct).to.be.not.deep.equal(products[0]);
        expect(updatedProduct.name).to.be.deep.equal(newName);
        expect(updatedProduct.quantity).to.be.deep.equal(newQuantity);
        expect(updatedProduct['_id']).to.be.deep.equal(id);
      });
      it('Deleta produto com sucesso', async () => {
        const products = await productsModel.getAllProducts();
        const { _id: id } = products[2];
        await productsModel.deleteProduct(id);
        const deleted = productsModel.getById(id);
        expect(deleted.name).to.be.undefined;
        expect(deleted.quantity).to.be.undefined;
        expect(deleted['_id']).to.be.undefined;
      })
    });

    describe('SalesModels', () => {
      it('Consegue cadastrar nova venda', async () => {
        const products = await productsModel.getAllProducts();
        const sales = products.map(({ _id: id, quantity }) => ({ productId: id, quantity }) );
        const created = await salesModel.createNewSale(sales);
        expect(created).to.be.not.undefined;
        expect(created.itensSold).to.be.deep.equal(sales);
      });
      it('Consegue listar todas as vendas', async () => {
        const products = await productsModel.getAllProducts();
        const shuffledProd = products.map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
        const sales = products.map(({ _id: id, quantity }) => ({ productId: id, quantity }) );
        const sales2 = shuffledProd.map(({ _id: id, quantity }) => ({ productId: id, quantity }) );
        await salesModel.createNewSale(sales);
        await salesModel.createNewSale(sales2);
        const allSales = await salesModel.getAllSales();
        expect(allSales).to.be.not.undefined;
        expect(allSales).to.be.an('array');
        expect(allSales).to.have.length(2);
        expect(allSales[0].itensSold).to.be.deep.eq(sales);
        expect(allSales[1].itensSold).to.be.deep.eq(sales2);
      });
      it('Consegue listar certa venda', async () => {
        await fillSales();
        const allSales = await salesModel.getAllSales();
        const { _id: id, itensSold } = allSales[0];
        const rawSale = await salesModel.getSalesById(id);
        const sale = rawSale[0];
        expect(sale).to.be.an('object');
        expect(sale.itensSold).to.not.be.undefined;
        expect(sale['_id']).to.be.deep.eq(id);
        expect(sale.itensSold).to.be.deep.eq(itensSold);
      });
      it('Consegue atualizar uma venda', async () => {
        await fillSales();
        const allSales = await salesModel.getAllSales();
        const { _id: id, itensSold: oldItensSold } = allSales[0];
        const { itensSold } = allSales[1];
        const updated = await salesModel.updateSale(id, itensSold);
        const { value } = updated;
        expect(value).to.not.be.undefined;
        expect(value['_id']).to.be.deep.eq(id);
        expect(value.itensSold).to.not.be.deep.eq(oldItensSold);
        expect(value.itensSold).to.be.deep.eq(itensSold);
      });
      it('Consegue deletar uma venda', async () => {
        await fillSales();
        const allSales = await salesModel.getAllSales();
        const { _id: id } = allSales[0];
        await salesModel.deleteSale(id);
        const allSalesReborn = await salesModel.getAllSales();
        expect(allSalesReborn[0]).to.not.be.deep.equal(allSales[0]);
      })
    });
});
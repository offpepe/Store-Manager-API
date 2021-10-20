const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sinon = require('sinon');
const conn = require('../../connections/connection');
const productsModel = require('../../models/productsModel');

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

const fillDB = async () => {
    for (let index = 0; index < productsMock.length; index++) {
        const { name, quantity } = productsMock[index];
        await productsModel.createNewProduct(name, quantity);        
    }
};

const clearDB = async () => {
    const products = await productsModel.getAllProducts();
    products.forEach(({ _id: id }) => productsModel.deleteProduct(id));
};

describe('Testes da camada Model', () => {
    const DBServer = new MongoMemoryServer();
  
    beforeEach(async () => {
      const URLMock = await DBServer.getUri();
  
      const connectionMock = await MongoClient
        .connect(URLMock, { 
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
  
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      await clearDB();
    });
  
    afterEach(async () => {
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
        await fillDB();
        const products = await productsModel.getAllProducts();
        expect(products).to.be.an('array');
        expect(products).to.have.length(productsMock.length);
      });
      it('Consegue buscar certo produto da coleção', async () => {
        await fillDB();
        const products = await productsModel.getAllProducts();
        const { _id: id } = products[3];
        const product = await productsModel.getById(id);
        expect(product[0]).to.be.an('object');
        expect(product[0]).to.be.deep.equal(products[3]);
      });
      it('Atualiza o produto com sucesso', async () => {
        await fillDB();
        const products = await productsModel.getAllProducts();
        const { _id: id, name, quantity } = products[0];
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
        await fillDB();
        const products = await productsModel.getAllProducts();
        const { _id: id } = products[2];
        await productsModel.deleteProduct(id);
        const deleted = productsModel.getById(id);
        expect(deleted.name).to.be.undefined;
        expect(deleted.quantity).to.be.undefined;
        expect(deleted['_id']).to.be.undefined;
      })
    });

})
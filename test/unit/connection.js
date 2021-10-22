const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const DB_NAME = 'StoreManager';

let db;

const mockConn = () => DBServer.getUri().then((DB_URL_MOCK) => db ? Promise.resolve(db) 
: MongoClient.connect(DB_URL_MOCK, OPTIONS)
.then((conn) => {
  db = conn.db(DB_NAME);
  return db
}));

console.log(mockConn());

module.export = mockConn


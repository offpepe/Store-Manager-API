const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = `mongodb+srv://offpepe:<${process.env.DB_PASSWORD}>@mongocluster.oex1m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const DB_NAME = 'StoreManager';

let db;

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => { 
        db = conn.db(DB_NAME);
        return db;
      }));

module.exports = connection;
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';

const dbName = 'Jobly';

const client = new MongoClient(url);

const connectDb = async () => {
    await client.connect();

    const db = client.db(dbName);
    console.log('Connected to database');
    return db
}

module.exports = connectDb;
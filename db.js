const { MongoClient } = require('mongodb');

mongoose = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';

const dbName = 'jobly';

const client = new MongoClient(url);

client.connect();
console.log('Connected to database');

const db = client.db(dbName);

module.exports = db;
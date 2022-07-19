const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://jake:${process.env.MONGO_PWD}@cluster0.3m3zv.mongodb.net/?retryWrites=true&w=majority`;;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
var db;
var quotesCollection;

module.exports = {
    connectToServer: async () => {
        await client.connect();
        db = client.db('quotes-presentation');
        quotesCollection = db.collection('quotes');
    },

    getDb:  () => {
        return db;
    },
    getCollection: () => {
        return quotesCollection
    }
};
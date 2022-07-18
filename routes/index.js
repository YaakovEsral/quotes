var express = require('express');
var router = express.Router();

// quick start: https://www.mongodb.com/docs/drivers/node/current/quick-start/
const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = `mongodb+srv://jake:${process.env.MONGO_PWD}@cluster0.3m3zv.mongodb.net/?retryWrites=true&w=majority`;;
const client = new MongoClient(uri);


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/quotes', async (req, res, next) => {
    let quotesArray = [];
    try {
        const database = client.db('quotes-presentation');
        const quotes = database.collection('quotes');
        quotesArray = await quotes.find().toArray()
    }
    catch (err) {
        console.error(err)
    }
    finally {
        res.json(quotesArray);
    }
})

router.post('/submit-quote', async (req, res, next) => {
    console.log(req.body);
    res.end();
})

module.exports = router;

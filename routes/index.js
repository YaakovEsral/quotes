var express = require('express');
var router = express.Router();

// quick start: https://www.mongodb.com/docs/drivers/node/current/quick-start/




/* GET home page. */
router.get('/', function (req, res, next) {
    const mongoDB = require('../mongoConnection');
    await mongoDB.connectToServer();
    const quotesArray = await mongoDB.getCollection().find().toArray();
    res.render('index', { quotes: quotesArray, title: 'Quotes App' });
});

router.get('/quotes', async (req, res, next) => {
    const mongoDB = require('../mongoConnection');
    await mongoDB.connectToServer();
    const quotesArray = await mongoDB.getCollection().find().toArray();

    // console.log('quotes', quotesArray);
    res.json(quotesArray);
})


module.exports = router;

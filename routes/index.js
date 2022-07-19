var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb');
// quick start: https://www.mongodb.com/docs/drivers/node/current/quick-start/




/* GET home page. */
router.get('/', async function (req, res, next) {
    const mongoDB = require('../mongoConnection');
    await mongoDB.connectToServer();
    const quotesArray = await mongoDB.getCollection().find().toArray();
    // console.log('quotes from server', quotesArray);
    res.render('index', { quotes: quotesArray, title: 'Quotes App' });
});

router.get('/quotes', async (req, res, next) => {
    const mongoDB = require('../mongoConnection');
    await mongoDB.connectToServer();
    const quotesArray = await mongoDB.getCollection().find().toArray();

    // console.log('quotes', quotesArray);
    res.json(quotesArray);
})

router.delete('/delete-quote/:id', async (req, res, next) => {
    console.log(req.params);
    const mongoDB = require('../mongoConnection');
    await mongoDB.connectToServer();
    console.log('deleting a quote', req.params.id);
    const id = new ObjectId(req.params.id);
    const status = await mongoDB.getCollection().deleteOne({_id: id});
    console.log(status);
    res.end('foo')
})
module.exports = router;

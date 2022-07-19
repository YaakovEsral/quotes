var express = require('express');
var router = express.Router();

// quick start: https://www.mongodb.com/docs/drivers/node/current/quick-start/

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/quotes', async (req, res, next) => {

    const mongoDB = require('../mongoConnection');
    const quotesArray = await mongoDB.getCollection().find().toArray();

    // console.log(quotesArray);
    res.json(quotesArray);
})


module.exports = router;

require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.io = require('socket.io')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { ObjectId } = require('mongodb');
let mongoDB;
let quotesCollection;
(async () => {
    mongoDB = require('./mongoConnection');
    // console.log(mongoDB);
    try {
        console.log('initializing mongodb connection');
        await mongoDB.connectToServer();
        quotesCollection = await mongoDB.getCollection();
    }
    catch (err) {
        console.error(err);
    }
})()

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.io.on('connection', function (socket) {
    // console.log('a user connected');

    socket.on('quote-submit', async (quote) => {
        // console.log(quote);
        console.log(quote.text, quote.author)
        await quotesCollection.insertOne(quote);
        app.io.emit('notification', { status: 'success', quote });
    });

    socket.on('quote-delete', async (id) => {
        console.log('deleting a quote', id);
        const objId = new ObjectId(id);
        const status = await quotesCollection.deleteOne({ _id: objId });
        console.log(status);
        if (status.deletedCount === 1) {
            return app.io.emit('quote-delete-status', {status: 'success', id})
        }
        socket.emit('quote-delete-status', {status: 'failure'})
    })
});

module.exports = app;

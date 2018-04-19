'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const helmet = require('helmet');
const DBURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const port = 3400;

require('./models/books');
require('./models/cars');
const db = require('./controllers/db');
const bookApi = require('./routes/bookapi');
const carApi = require('./routes/carapi');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

app.use(express.static('public'));

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods',
        'POST, GET, PATCH, DELETE');
    next();
});

// some user info
app.use((req, res, next) => {
    const reqPath = req.path;
    const ip = req.connection.remoteAddress || req.ip ||
        req.headers['x-forwarded-for'] || req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    console.log('Got to root with path: ' + reqPath +
        '. Timestamp: ' + moment().format() +
        '. User-agent: ' + req.headers['user-agent'] +
        '. Ip-address: ' + ip
    );
    next();
});

app.use('/bookapi', bookApi);
app.use('/carapi', carApi);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err);
})

db.connect(DBURL,app, port);
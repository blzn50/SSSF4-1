'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Car = mongoose.model('Car');

router.get('/', (req, res) => {
    Car.find().sort('year').then((data) => {
        res.json(data);
    }).catch(err => console.log(err));
});

router.post('/upload', (req, res) => {
    Car.create(req.body).then(car => console.log('Car posted to db'))
        .catch(err => {
            console.log(err)
        });
        res.send('Car posted to db');
});

module.exports = router;

'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

router.get('/all', (req, res) => {
    Book.find().then((data) => {
        res.json(data);
    }).catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    const id =req.params.id;
    Book.findById(id).then((data) => {
        res.json(data);
    }).catch(err => console.log(err));
});

router.post('/upload', (req, res) => {
    let book = new Book(req.body);
    book.save(err => {
        if (err) {
            console.log(err)
        }
        res.send('Book uploaded');
    });
});

router.patch('/:id', (req, res) => {
    const id =req.params.id;
    Book.findByIdAndUpdate(id, req.body, {new: true}, (err, book) => {
        if(err) console.log(err);
        res.json(book);
    });
});

router.delete('/:id', (req, res) => {
    const id =req.params.id;
    Book.findByIdAndRemove(id, (err, data) => {
        if(err) console.log(err);
        res.send('Book removed:' + data);
    })
})

module.exports = router;
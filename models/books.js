'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    publisher: String,
    year: Number,
    author: String,
});

module.exports = mongoose.model('Book', bookSchema);
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    BookID:  { type: Number, required: true },
    BookName: { type: String, required: true },
    NumberOfCopies:  { type: Number, required: true }
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book
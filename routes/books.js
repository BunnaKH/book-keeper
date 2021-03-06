const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Book = require('../models/Book');

// @route get /api/book
// @dec     get all users
// @acc     Private

router.get('/', auth, async (req, res) => {

    try {
        const books = await Book.find({ user: req.user.id }).sort({ date: -1 });
        res.json(books)

    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server error');
    }
})


// @route   post /api/book
// @dec     add new user
// @acc     Private


router.post('/', [auth, [
    body('title', 'Title is required').not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, isbn, type } = req.body;

    try {
        const newBook = await new Book({
            title,
            author,
            isbn,
            type,
            user: req.user.id
        });
        const book = await newBook.save();

        res.json(book)


    } catch (err) {
        console.error(err.message);
        res.status(401).json('Server Error')
    }
})

// @route   put /api/book:id
// @dec     update book
// @acc     Private


router.put('/:id', auth, async (req, res) => {
    const { title, author, isbn, type } = req.body;
    // Build book object
    const bookFields = {};

    if (title) bookFields.title = title;
    if (author) bookFields.author = author;
    if (isbn) bookFields.isbn = isbn;
    if (type) bookFields.type = type;

    try {
        let book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: "Book not found" })
        // Make sure user won the book
        if (book.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" })
        }

        book = await Book.findByIdAndUpdate(req.params.id, {
            $set: bookFields
        }, { new: true })

        res.json(book)

    } catch (err) {
        console.error(err.message);
        res.status(401).json('Server')
    }
})

// @route   delet /api/book:id
// @dec     update book
// @acc     Private


router.delete('/:id', auth, async (req, res) => {

    try {

        let book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ msg: "Book not found" })

        // Make sure user won the book

        if (book.user.toString() !== req.user.id) {

            return res.status(401).json({ msg: "Not authorized" })
        }

        await Book.findByIdAndRemove(req.params.id)

        res.json({ msg: "Book Removed" })

    } catch (err) {

        console.error(err.message);
        res.status(401).json('Server Error')
    }
})

module.exports = router;
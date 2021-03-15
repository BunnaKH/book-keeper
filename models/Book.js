const mongoose = require('mongoose');
const BookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true,

    },
    isbn: {
        type: String,

    },
    type: {
        type: String,
        default: 'finish'
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('book', BookSchema)
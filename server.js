const express = require('express');
const connectdb = require('./config/db')
const app = express();
const path = require('path');

// Connect to DB
connectdb();

//init middleware
// by doing this we allow to accept body request(req.body)
app.use(express.json({ extended: false }))
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));

if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5005

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

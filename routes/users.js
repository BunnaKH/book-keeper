const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');


// @route post /api/users
// @dec     register
// @acc     Public


router.post('/', [
    body('name', 'Please add name').not().isEmpty(),
    body('email', 'please includ a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more character').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' })
        }
        user = new User({
            name,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10);
        // to bcrypt the password ( plain text password + salt) = hash passowrd befor add to database
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Payload is the object that we want to send to token 
        const payload = {
            user: {
                id: user.id
            }
        }
        // jwt.sign(payload, secret, option, callback)

        jwt.sign(payload, config.get('jwtScrete'), {
            expiresIn: 3600000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })

        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

}
)


module.exports = router;
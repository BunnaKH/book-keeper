const express = require('express');
router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// @route get /api/auth
// @dec     get logged in user
// @acc     Private

router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


// @route   post /api/auth
// @dec     auth user & get token
// @acc     Public


router.post('/', [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credential" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credential" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtScrete'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;

            res.json({ token })
        })
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;
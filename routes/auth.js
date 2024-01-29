const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Regisistration
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Registration failed',
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({
                error: 'User not exists'
            });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            res.status(401).json({
                error: 'Invalid username or password'
            });
        }

        const userToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        });

        res.status(200).json({
            token: userToken
        });
    } catch (error) {
        res.status(500).json({
            message: 'Login failed',
            error: error.message
        });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');

const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
    
        res.status(200).json({
            users: users
        });
    } catch (error) {
        res.status(500).json({
            message: 'No users found'
        });
    }
});

module.exports = router;
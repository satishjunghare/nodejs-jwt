const jwt = require('jsonwebtoken');

const veryfyToken = (req, res, next) => {
    const token = req.header('Authentication');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = veryfyToken;
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../services/userService');

const authenticateToken = (req, res, next) => {
    // Expect header: "Authorization: Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Access Denied: Invalid Token' });
        }

        // Success! Attach user info to request (user.id, user.email)
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;

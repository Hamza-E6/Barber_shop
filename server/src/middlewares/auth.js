const jwt = require('jsonwebtoken');
require("dotenv").config();

const checkAuthBarber = (req, res, next) => {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Extract the token by removing the 'Bearer ' prefix
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.decoded = decoded; // Add decoded token data to the request object
        next(); // Proceed to the next middleware or route
    });
};

module.exports = checkAuthBarber;

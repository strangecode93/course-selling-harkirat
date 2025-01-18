const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Use 'Authorization' header
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Token missing or malformed' });
        }

        const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer '
        const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);

        req.userId = decoded.id; // Attach user ID to the request object
        next(); // Pass control to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = userMiddleware; // Export as a function directly

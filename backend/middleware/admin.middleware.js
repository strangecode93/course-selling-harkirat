const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Read the Authorization header
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Token missing or malformed' });
        }

        const token = authHeader.split(' ')[1]; // Extract the token part
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN); // Verify using the secret key

        req.adminId = decoded.id; // Attach admin ID to the request object
        next(); // Pass control to the next middleware/route handler
    } catch (error) {
        console.error('Authorization Error:', error.message);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = adminMiddleware;

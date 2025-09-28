const jwt = require('jsonwebtoken');

// Verify JWT and attach user info to request
const requireAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized access, no token provided' });
        }

        // Support 'Bearer <token>' and raw token in header (case-insensitive)
        let token = authHeader;
        if (/^Bearer\s+/i.test(authHeader)) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized access, token missing' });
        }

        if (!process.env.JWT_SECRET) {
            console.warn('Warning: JWT_SECRET is not set in environment variables. Token verification will fail.');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request in a consistent shape
        // Provide both `id` and `_id` for compatibility with different controller expectations
        const resolvedId = decoded.userId || decoded.id || decoded._id || null;
        req.user = {
            id: resolvedId,
            _id: resolvedId,
            userName: decoded.userName || null
        };
        return next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = requireAuth; 
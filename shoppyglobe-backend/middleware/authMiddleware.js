
import jwt from 'jsonwebtoken';

// Define a secret key used for signing and verifying tokens
const secret = 'Secret Key';

// Middleware function for authenticating users using JW
export const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, "Secret Key");
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

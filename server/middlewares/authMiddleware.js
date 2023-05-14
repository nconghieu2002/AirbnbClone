import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const authMiddleware = (req, res, next) => {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            req.userData = userData;
            next();
        }
    });
};

export default authMiddleware;

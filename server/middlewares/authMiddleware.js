import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const jwtSecret = 'MY_SECRET_KEY';

const authMiddleware = (req, res, next) => {
    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) {
            
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            req.userData = userData;
            next();
        }
    });
};

export default authMiddleware;

import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret_key';

export function verifyToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return response.status(401).json({ message: 'Access token missing' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return response.status(403).json({ message: 'Invalid token' });
        }
        request.user = user;
        next();
    });
}

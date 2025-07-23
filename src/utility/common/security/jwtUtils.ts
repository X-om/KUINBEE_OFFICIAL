import jwt, { SignOptions } from 'jsonwebtoken'
import { JWT_SECRET } from '../../../env';

export const generateAuthToken = (payload: object, expiresIn: SignOptions['expiresIn'] = '1h'): string => {
    try {
        return jwt.sign(payload, JWT_SECRET, { expiresIn });
    } catch (error) {
        console.error('Error generating JWT token:', error);
        throw new Error('Failed to generate token');
    }
}


export const verifyAuthToken = (token: string): string | jwt.JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}
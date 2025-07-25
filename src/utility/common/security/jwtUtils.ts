import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { JWT_SECRET } from '../../../env';

export const generateAuthToken = (payload: object, expiresIn: SignOptions['expiresIn'] = '1h'): string => {
    try {
        return jwt.sign(payload, JWT_SECRET, { expiresIn });
    } catch (error) {
        console.error('Error generating JWT token:', error);
        throw new Error('Failed to generate token');
    }
}

export const decodeAuthToken = <T>(token: string): { decodedToken: JwtPayload & T | null, message?: never } | { decodedToken?: never, message: string, error: unknown } => {
    try {
        const decodedToken = Buffer.from(token, 'base64').toString();
        return { decodedToken: jwt.verify(decodedToken, JWT_SECRET) as JwtPayload & T };
    } catch (error) {
        return { message: 'This link has been expired', error };
    }
};


// TODO CREATE A FUNCTION FOR SHIFTING JWT TOKEN USING CIPHER ALGORITHM
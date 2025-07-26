import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { JWT_SECRET } from '../../../env';
import { CIPHER_SHIFT } from '../../../constants/jwtConstants';

export const generateAuthToken = (payload: object, expiresIn: SignOptions['expiresIn'] = '1h'): string => {
    try {
        const jwtToken = jwt.sign(payload, JWT_SECRET, { expiresIn });
        return encryptData(jwtToken);
    } catch (error) {
        console.error('Error generating JWT token:', error);
        throw new Error('Failed to generate token');
    }
}

export const decodeAuthToken = <T>(token: string): { decodedToken: JwtPayload & T | null, message?: never } | { decodedToken?: never, message: string, error: unknown } => {
    try {
        const jwtToken = decryptData(token);
        const decodedToken = Buffer.from(jwtToken, 'base64').toString();
        return { decodedToken: jwt.verify(decodedToken, JWT_SECRET) as JwtPayload & T };
    } catch (error) {
        return { message: 'This link has been expired', error };
    }
};

export const encryptData = (data: string): string => [...data].map(char => String.fromCharCode(char.charCodeAt(0) + CIPHER_SHIFT)).join('');
export const decryptData = (data: string): string => [...data].map(char => String.fromCharCode(char.charCodeAt(0) - CIPHER_SHIFT)).join('');



// TODO CREATE A FUNCTION FOR SHIFTING JWT TOKEN USING CIPHER ALGORITHM
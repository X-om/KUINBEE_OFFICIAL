import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../../env';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => { return await bcrypt.compare(password, hashedPassword) };

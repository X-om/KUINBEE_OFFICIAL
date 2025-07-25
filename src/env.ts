import dotenv from 'dotenv';
dotenv.config();

const errorEnvVariables = {
    PORT: 'PORT',
    JWT_SECRET: 'JWT_SECRET',
    SALT_ROUNDS: 'SALT_ROUNDS',
};
const checkErrorEnvVariables = () => {
    const missingVars: string[] = [];
    Object.keys(errorEnvVariables).forEach((key) => { if (!process.env[key]) missingVars.push(key); });
    if (missingVars.length > 0) {
        const errorMessage = `Missing error environment variables: ${missingVars.join(', ')}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

checkErrorEnvVariables();

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
export const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 10;
export const KUINBEE_SUPER_ADMIN_IDENTITY_CODE = process.env.KUINBEE_SUPER_ADMIN_IDENTITY_CODE as string;
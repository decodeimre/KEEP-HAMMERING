import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// create a token
export const createToken = async (payload, secretKey, options) => {
    const asyncSignIn = promisify(jwt.sign);
    return asyncSignIn(payload, secretKey, options)
}

// verify a token
export const verifyToken = async (token, secretKey) => {
    const asyncVerify = promisify(jwt.verify);
    return asyncVerify(token, secretKey)
}
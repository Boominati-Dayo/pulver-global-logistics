import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export interface TokenData {
  userId: string;
  email: string;
  role: string;
}

export function generateToken(data: TokenData): string {
  return jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenData | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenData;
  } catch {
    return null;
  }
}

export function hashPassword(password: string): string {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function comparePassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
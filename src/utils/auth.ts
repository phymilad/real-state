import { hash, compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const hashPassword = async (password: string) => {
  const hashedPassword = hash(password, 12)
  return hashedPassword
}

export const comparePassword = async (password: string, hashedPassword: string) => {
  const isValid = await compare(password, hashedPassword)
  return isValid
}

export function generateAccessToken(email: string) {
  if(process.env.TOKEN_SECRET) {
    return jwt.sign({email}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }
}

export function verifyToken(token: string) {
  if(process.env.TOKEN_SECRET) {
    return jwt.verify(token, process.env.TOKEN_SECRET)
  }
}
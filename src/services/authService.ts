import prisma from '@/config/dbConfig';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET ?? 'Your secret key'

export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
};

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password');
  }

  return user;
};

export const registerUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return user;
};

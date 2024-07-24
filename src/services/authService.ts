import prisma from '@/config/dbConfig';
import { LoginRequest, RegisterRequest } from '@/validators/authValidator';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET ?? 'Your secret key'

export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
};

export const loginUser = async ({ username, password }: LoginRequest) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) throw new Error('Invalid username or password');

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) throw new Error('Invalid username or password');

  return user;
};

export const registerUser = async ({ username, password }: RegisterRequest) => {
  const existingUser = await prisma.user.findFirst({
    where: { username }
  })

  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return user;
};

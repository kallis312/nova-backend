import { NextFunction, Request, Response } from 'express';
import { generateToken, loginUser, registerUser } from '@/services/authService';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    next(error)
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    console.log(username, password)
    const newUser = await registerUser(username, password);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error)
  }
};
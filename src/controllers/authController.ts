import { NextFunction, Request, Response } from 'express';
import { generateToken, loginUser, registerUser } from '@/services/authService';
import { loginValidator, registerValidator } from '@/validators/authValidator';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    const body = loginValidator.parse(req.body);
    const user = await loginUser(body);
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    next(error)
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = registerValidator.parse(req.body);
    const newUser = await registerUser(body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error)
  }
};
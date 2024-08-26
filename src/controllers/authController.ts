import { NextFunction, Request, Response } from 'express';
import { generateToken, loginUser, registerUser } from '@/services/authService';
import { loginValidator, registerValidator } from '@/validators/authValidator';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = loginValidator.parse(req.body);
    const user = await loginUser(body);
    const token = generateToken(user);
    res.json({
      username: user.username,
      role: user.role,
      token
    });
  } catch (error) {
    next(error)
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = registerValidator.parse(req.body);
    const newUser = await registerUser(body);
    res.status(201).json({
      username: newUser.username,
      role: newUser.role
    });
  } catch (error) {
    next(error)
  }
};
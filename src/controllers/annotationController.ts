import { NextFunction, Request, Response } from 'express';

export const medSAMAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: ''
    });
  } catch (error) {
    next(error)
  }
};

export const monaiAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: ''
    });
  } catch (error) {
    next(error)
  }
};
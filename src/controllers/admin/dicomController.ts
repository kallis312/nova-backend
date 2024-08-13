import { NextFunction, Request, Response } from 'express';

export const dicomReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: string[] = []
    res.json(result);
  } catch (error) {
    next(error)
  }
}
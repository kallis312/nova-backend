import { Request, Response, NextFunction } from 'express';
import logger from '@/utils/logger';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occurred';
  const statusCode = 500;

  if (err instanceof Error) {
    errorMessage = err.message;
    logger.error(`Error: ${errorMessage}`);
  } else {
    logger.error('Unknown error');
  }

  res.status(statusCode).json({ error: errorMessage });
};

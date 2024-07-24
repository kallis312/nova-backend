import logger from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occurred';
  const statusCode = 500;
  // console.log("error message: ", err.errors[0].message )
  if (err instanceof ZodError) {
    errorMessage = err.errors[0].message;
  } else if (err instanceof Error) {
    errorMessage = err.message
  }

  logger.error(errorMessage);
  res.status(statusCode).json({ error: errorMessage });
};

import { Request, Response, NextFunction } from 'express';
import logger from '@/utils/logger';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
};

export default requestLogger;

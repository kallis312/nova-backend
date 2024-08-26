import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const userAuthenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = user;
    next();
  })(req, res, next);
};

export const adminAuthenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (user.role !== 'ADMIN') return res.status(401).json({ message: 'No access permission.' })
    req.user = user;
    next();
  })(req, res, next);
};

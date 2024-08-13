import { Router } from 'express';
import dicomRoutes from './dicomRoutes';
import userRoutes from './userRoutes';
import { adminAuthenticateJwt } from '@/middlewares/authMiddleware';

const router = Router();

router
  .use(adminAuthenticateJwt)
  .use('/users', userRoutes)
  .use('/dicoms', dicomRoutes);

export default router;

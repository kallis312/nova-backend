import { Router } from 'express';
import adminRoutes from './admin';
import annotationRoutes from './annotationRoutes';
import authRoutes from './authRoutes';
import dicomRoutes from './dicomRoutes';
import labelRoutes from './labelRoutes'

const router = Router();

router
  .use('/auth', authRoutes)
  .use('/annotation', annotationRoutes)
  .use('/dicom', dicomRoutes)
  .use('/admin', adminRoutes)
  .use('/label', labelRoutes)

export default router;

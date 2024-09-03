import { medSAMAction, monaiAction } from '@/controllers/annotationController';
import { userAuthenticateJwt } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const router = Router();

router.post('/MedSAM', userAuthenticateJwt, medSAMAction);
router.post('/Monai', userAuthenticateJwt, monaiAction);

export default router;

import { actionAnnotation, getAnnotation, getDicom, getDicomFromJupiter, getDicomList } from '@/controllers/dicomController';
import { userAuthenticateJwt } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/list/:page', userAuthenticateJwt, getDicomList);
router.get('/get/:id', userAuthenticateJwt, getDicom);
router.get('/annotation/:id', userAuthenticateJwt, getAnnotation);
router.post('/annotation/:id', userAuthenticateJwt, actionAnnotation);
router.get('/jupiter', userAuthenticateJwt, getDicomFromJupiter);

export default router;

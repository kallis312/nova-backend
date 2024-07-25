import { actionAnnotation, getAnnotation, getDicom, getDicomList } from '@/controllers/dicomController';
import { userAuthenticateJwt } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/list/:page', userAuthenticateJwt, getDicomList);
router.get('/get/:id', userAuthenticateJwt, getDicom);
router.get('/annotation/:id', userAuthenticateJwt, getAnnotation);
router.post('/annotation/:id', userAuthenticateJwt, actionAnnotation);

export default router;

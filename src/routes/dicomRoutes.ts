import { actionAnnotation, getAnnotation, getDicom, getDicomList } from '@/controllers/dicomController';
import { Router } from 'express';

const router = Router();

router.get('/list/:page', getDicomList);
router.post('/get/:id', getDicom);
router.get('/annotation/:id', getAnnotation);
router.post('/annotation/:id', actionAnnotation);

export default router;

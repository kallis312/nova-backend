import { medSAMAction, monaiAction } from '@/controllers/annotationController';
import { Router } from 'express';

const router = Router();

router.post('/MedSAM', medSAMAction);
router.post('/Monai', monaiAction);

export default router;

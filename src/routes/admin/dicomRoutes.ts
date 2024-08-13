import { dicomReview } from '@/controllers/admin/dicomController';
import { Router } from 'express';

const router = Router();

router.post('/:id/review', dicomReview);

export default router;

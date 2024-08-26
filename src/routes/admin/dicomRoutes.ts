import { dicomReview, getDicomAnalysis, getPendingList } from '@/controllers/admin/dicomController';
import { Router } from 'express';

const router = Router();

router.post('/:id/review', dicomReview);
router.get('/analysis', getDicomAnalysis);
router.get('/pending-list', getPendingList);

export default router;

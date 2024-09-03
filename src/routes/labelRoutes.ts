import { createLabel, deleteLable, getLabelList, updateLable } from '@/controllers/lableController';
import { userAuthenticateJwt } from '@/middlewares/authMiddleware';
import { Router } from 'express';

const router = Router();

router
  .use(userAuthenticateJwt)
  .get('/', getLabelList)
  .post('/', createLabel)
  .put('/:id', updateLable)
  .delete('/:id', deleteLable)

export default router;

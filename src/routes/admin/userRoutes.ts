import { createUser, deleteUser, getUser, getUserList, updateUser } from '@/controllers/admin/userController';
import { Router } from 'express';

const router = Router();

router
  .get('/', getUserList)
  .post('/', createUser)
  .get('/:id', getUser)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser)

export default router;

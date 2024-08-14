import { createUser, deleteUser, getUser, getUserList, updateUser, updateUserPassword } from '@/controllers/admin/userController';
import { Router } from 'express';

const router = Router();

router
  .get('/', getUserList)
  .post('/', createUser)
  .get('/:id', getUser)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser)
  .put('/:id/password', updateUserPassword)

export default router;

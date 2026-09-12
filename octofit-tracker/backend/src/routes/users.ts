import { Router } from 'express';
import User from '../models/user.js';
import { createCrudRouter } from './createCrudRouter.js';

const router = Router();
router.use('/', createCrudRouter(User));

export default router;

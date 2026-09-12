import { Router } from 'express';
import Activity from '../models/activity.js';
import { createCrudRouter } from './createCrudRouter.js';

const router = Router();
router.use('/', createCrudRouter(Activity));

export default router;

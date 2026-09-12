import { Router } from 'express';
import Workout from '../models/workout.js';
import { createCrudRouter } from './createCrudRouter.js';

const router = Router();
router.use('/', createCrudRouter(Workout));

export default router;

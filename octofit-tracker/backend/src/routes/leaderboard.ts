import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';
import { createCrudRouter } from './createCrudRouter.js';

const router = Router();
router.use('/', createCrudRouter(Leaderboard));

export default router;

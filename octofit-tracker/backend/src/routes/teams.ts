import { Router } from 'express';
import Team from '../models/team.js';
import { createCrudRouter } from './createCrudRouter.js';

const router = Router();
router.use('/', createCrudRouter(Team));

export default router;

import express from 'express';
import { getList , deleteRepo } from '../controllers/repo.controller.js';
import { requireAuth } from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/list', requireAuth, getList);
router.delete('/delete', requireAuth, deleteRepo);

export default router;

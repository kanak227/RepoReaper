import express from 'express';
import { getList, deleteRepo, archiveRepo, makePrivate, getStarred, unstarRepos } from '../controllers/repo.controller.js';
import { requireAuth } from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/list', requireAuth, getList);
router.delete('/delete', requireAuth, deleteRepo);
router.post('/archive', requireAuth, archiveRepo);
router.post('/make-private', requireAuth, makePrivate);
router.get('/starred', requireAuth, getStarred);
router.post('/unstar', requireAuth, unstarRepos);

export default router;

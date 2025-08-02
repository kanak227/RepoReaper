import express from 'express';
import { callback, checkAuth, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.get("/github", signup);
router.get('/github/callback', callback);
router.get('/me', checkAuth);

export default router;

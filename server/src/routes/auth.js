import express from 'express';
import { callback, checkAuth, signup, debug, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.get("/github", signup);
router.get('/github/callback', callback);
router.get('/me', checkAuth);
router.post('/logout', logout);
if ((process.env.NODE_ENV || 'development') !== 'production') {
	router.get('/debug', debug);
}

export default router;

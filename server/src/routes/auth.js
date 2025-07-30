import express from 'express';
import { callback, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.get("/github", signup);
router.get('/github/callback', callback);

export default router;

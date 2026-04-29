import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import repoRoutes from './routes/repo.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const isProd = NODE_ENV === 'production';
const FRONTEND = (process.env.FRONTEND_URL || '').trim().replace(/\/$/, '');
const COOKIE_DOMAIN = (process.env.COOKIE_DOMAIN || '').trim();

app.use(cors({
  origin: isProd ? [FRONTEND] : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true);


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, 
  message: { error: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/auth', apiLimiter, authRoutes);
app.use('/repos', apiLimiter, repoRoutes);


app.listen(PORT, () => {
  console.log(`RepoReaper backend running on port ${PORT}`);
  console.log(`Env -> NODE_ENV=${NODE_ENV} | CORS_ORIGIN=${FRONTEND || '(none)'} | secureCookies=${isProd} | cookieDomain=${COOKIE_DOMAIN || '(host default)'}`);
});


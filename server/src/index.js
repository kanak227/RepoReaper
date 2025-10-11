import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import repoRoutes from './routes/repo.js';
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';
const FRONTEND = (process.env.FRONTEND_URL || '').trim();
const COOKIE_DOMAIN = (process.env.COOKIE_DOMAIN || '').trim();

app.use(cors({
  origin: isProd ? [FRONTEND] : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());
// Trust upstream proxies (load balancers/CDNs) so req.secure is correct behind HTTPS
// Using `true` handles multiple proxies across hosts like Vercel/Render/Cloudflare.
app.set('trust proxy', true);


app.use(session({
  secret: process.env.SESSION_SECRET || 'reapersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
  secure: isProd,
  sameSite: isProd ? 'None' : 'Lax',
  domain: isProd && COOKIE_DOMAIN ? COOKIE_DOMAIN : undefined,
    maxAge: 1000 * 60 * 60
  },
}));

app.use('/auth', authRoutes);
app.use('/repos', repoRoutes);


app.listen(PORT, () => {
  console.log(`RepoReaper backend running on port ${PORT}`);
  console.log(`Env -> NODE_ENV=${NODE_ENV} | CORS_ORIGIN=${FRONTEND || '(none)'} | secureCookies=${isProd} | cookieDomain=${COOKIE_DOMAIN || '(host default)'}`);
});


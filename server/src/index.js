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

app.use(cors({
  origin: isProd ? [FRONTEND] : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', 1);


app.use(session({
  secret: process.env.SESSION_SECRET || 'reapersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
  secure: isProd,
  sameSite: isProd ? 'None' : 'Lax',
    maxAge: 1000 * 60 * 60
  },
}));

app.use('/auth', authRoutes);
app.use('/repos', repoRoutes);


app.listen(PORT, () => {
  console.log(` RepoReaper backend running at http://localhost:${PORT}`);
});


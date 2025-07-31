import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.js';
import repoRoutes from './routes/repo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS settings for frontend (React on port 5173)
app.use(cors({
  origin: process.env.FRONTEND_URL, // Use env variable for frontend URL
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'reapersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true in production
    httpOnly: true,
    sameSite: 'lax', // Prevent CSRF
    maxAge: 1000 * 60 * 60
  },
}));

// Routes
app.use('/auth', authRoutes);
app.use('/repos', repoRoutes);

// Optional: Serve React build if you're deploying full stack
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, 'client/dist')));
// app.get('*', (_, res) => {
//   res.sendFile(path.join(__dirname, 'client/dist/index.html'));
// });

app.listen(PORT, () => {
  console.log(`🚀 RepoReaper backend running at http://localhost:${PORT}`);
});

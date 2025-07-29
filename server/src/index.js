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
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Express session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'reapersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,            // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60    // 1 hour
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

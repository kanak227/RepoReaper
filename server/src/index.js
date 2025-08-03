import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import repoRoutes from './routes/repo.js';

// import path from 'path';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [process.env.FRONTEND_URL], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'reapersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: 'None', 
    maxAge: 1000 * 60 * 60
  },
}));

app.use('/auth', authRoutes);
app.use('/repos', repoRoutes);


  // const __dirname = path.resolve();
  // app.use(express.static(path.join(__dirname, '/client/dist')));
  // app.get(/(.*)/, (_, res) => {
  //   res.sendFile(path.resolve(__dirname, "client" , "dist" , "index.html"));
  // });

  


app.listen(PORT, () => {
  console.log(`🚀 RepoReaper backend running at http://localhost:${PORT}`);
});


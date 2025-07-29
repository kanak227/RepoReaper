import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

const router = express.Router();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const redirectUri = "http://localhost:3000/auth/github/callback";

// 1️⃣ Redirect user to GitHub for OAuth login
router.get("/github", (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,delete_repo&redirect_uri=${redirectUri}`;
  res.redirect(githubAuthUrl);
});
console.log(CLIENT_ID);

// 2️⃣ GitHub redirects back here → exchange `code` for access token
router.get('/github/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('No code found in callback');
  }

  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return res.status(401).send('Failed to retrieve access token');
    }

    // Store the token in session (or JWT if you're using it)
    req.session.token = accessToken;

    // Redirect back to your frontend
    res.redirect('http://localhost:5173/dashboard');
  } catch (error) {
    console.error('OAuth error:', error.response?.data || error.message);
    res.status(500).send('OAuth failed');
  }
});

export default router;

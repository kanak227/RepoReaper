import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const redirectUri = process.env.GITHUB_REDIRECT_URI;

export const signup =  (req, res) => {
    try {
          const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,delete_repo&redirect_uri=${redirectUri}`;
          res.redirect(githubAuthUrl);
    } catch (error) {
        console.error('OAuth error:', error.response?.data || error.message);
        res.status(500).send('OAuth failed');
    }
}

export const callback = async (req, res) => {
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

    req.session.token = accessToken;
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);

    
  } catch (error) {
    console.error('OAuth error:', error.response?.data || error.message);
    res.status(500).send('OAuth failed');
  }
}

export const checkAuth = (req, res) => {
  if (req.session && req.session.token) {
    res.json({ user: true });
  } else {
    res.json({ user: null });
  }
}
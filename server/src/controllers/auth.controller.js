import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const redirectUri = process.env.GITHUB_REDIRECT_URI;

export const signup =  (req, res) => {
    try {
          const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,delete_repo&redirect_uri=${encodeURIComponent(redirectUri)}`;
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
    const isProd = (process.env.NODE_ENV || 'development') === 'production';
    const cookieDomain = (process.env.COOKIE_DOMAIN || '').trim();
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'None' : 'Lax',
      domain: isProd && cookieDomain ? cookieDomain : undefined,
      path: '/',
      maxAge: 86400000,
    });

    const fe = (process.env.FRONTEND_URL || 'http://localhost:5173').trim();
    // Use an HTML redirect to improve cookie persistence reliability on some browsers (e.g., Firefox)
    const target = `${fe}/dashboard`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Cache-Control" content="no-store" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta name="referrer" content="no-referrer" />
    <title>Signing you in…</title>
  </head>
  <body>
    <noscript>
      <a href="${target}">Continue</a>
    </noscript>
    <script>
      // Small delay to ensure cookies are committed before navigation
      setTimeout(function(){ window.location.replace(${JSON.stringify(target)}); }, 10);
    </script>
  </body>
</html>`);

    
  } catch (error) {
    console.error('OAuth error:', error.response?.data || error.message);
    res.status(500).send('OAuth failed');
  }
}

export const checkAuth = (req, res) => {
  const token = req.session?.token || req.cookies?.token;
  if (token && !req.session?.token) {
    req.session.token = token;
  }
  res.json({ user: token ? true : null });
}

export const debug = (req, res) => {
  const env = (process.env.NODE_ENV || 'development');
  if (env === 'production') {
    return res.status(404).json({});
  }
  res.json({
    env,
    isProd: env === 'production',
    cookieDomain: (process.env.COOKIE_DOMAIN || '').trim() || null,
    frontend: (process.env.FRONTEND_URL || '').trim() || null,
    hasCookieToken: Boolean(req.cookies?.token),
    hasSessionToken: Boolean(req.session?.token),
    origin: req.headers.origin || null,
    referer: req.headers.referer || null,
    secureReq: req.secure === true,
  });
}
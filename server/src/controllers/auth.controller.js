import axios from 'axios';

export const signup =  (req, res) => {
    try {
          const CLIENT_ID = (process.env.GITHUB_CLIENT_ID || '').trim();
          const redirectUri = (process.env.GITHUB_REDIRECT_URI || '').trim();
          if (!CLIENT_ID) {
            return res.status(500).send('Missing GITHUB_CLIENT_ID. Check your server/.env (or repo-root .env) and restart the backend.');
          }
          const resolvedRedirectUri =
            (redirectUri && redirectUri.trim()) ||
            `${req.protocol}://${req.get('host')}/auth/github/callback`;
          const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,delete_repo&redirect_uri=${encodeURIComponent(resolvedRedirectUri)}`;
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
    const CLIENT_ID = (process.env.GITHUB_CLIENT_ID || '').trim();
    const CLIENT_SECRET = (process.env.GITHUB_CLIENT_SECRET || '').trim();
    if (!CLIENT_ID || !CLIENT_SECRET) {
      return res.status(500).send('Missing GitHub OAuth env vars (GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET). Check your server/.env and restart the backend.');
    }
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
    const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
    const isProd = NODE_ENV === 'production';
    const cookieDomain = (process.env.COOKIE_DOMAIN || '').trim();

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'None' : 'Lax',
      domain: cookieDomain || undefined,
      path: '/',
      maxAge: 86400000,
    });

    const fe = (process.env.FRONTEND_URL || 'http://localhost:5173').trim();
    // Use an HTML redirect to improve cookie persistence reliability on some browsers (e.g., Firefox)
    // Also include the token in the URL as a fallback for cross-site cookie blocking
    const target = `${fe}/dashboard?token=${accessToken}`;
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
  const cookieToken = req.cookies?.token;
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  
  const token = cookieToken || headerToken;
  res.json({ user: token ? true : null });
}

export const logout = (req, res) => {
  const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
  const isProd = NODE_ENV === 'production';
  const cookieDomain = (process.env.COOKIE_DOMAIN || '').trim();
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'None' : 'Lax',
    domain: cookieDomain || undefined,
    path: '/'
  });
  res.json({ message: 'Logged out successfully' });
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
    origin: req.headers.origin || null,
    referer: req.headers.referer || null,
    secureReq: req.secure === true,
  });
}

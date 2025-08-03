export const requireAuth = (req, res, next) => {
  const sessionToken = req.session?.token;
  const cookieToken = req.cookies?.token;

  if (!sessionToken && !cookieToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Optional: unify token in session for consistency
  if (!sessionToken && cookieToken) {
    req.session.token = cookieToken;
  }

  next();
};

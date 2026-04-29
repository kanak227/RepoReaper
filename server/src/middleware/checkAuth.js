export const requireAuth = (req, res, next) => {
  const cookieToken = req.cookies?.token;

  if (!cookieToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

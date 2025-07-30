export const requireAuth = (req, res, next) => {
  if (!req.session?.token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

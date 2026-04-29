export const requireAuth = (req, res, next) => {
  const cookieToken = req.cookies?.token;
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  
  const token = cookieToken || headerToken;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.token = token;
  next();
};

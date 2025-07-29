import express from 'express';
import axios from 'axios';

const router = express.Router();

// Middleware to check if token exists in session
const requireAuth = (req, res, next) => {
  if (!req.session?.token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// 1️⃣ GET /repos → Get all user repos
router.get('/list', requireAuth, async (req, res) => {
  try {
    const token = req.session.token;



    const { data: repos } = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
      },
      params: {
        per_page: 100, // adjust as needed
        affiliation: 'owner',
      },
    });

    // Send minimal data to frontend
    const simplifiedRepos = repos.map(repo => ({
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      id: repo.id,
    }));

    res.json(simplifiedRepos);
  } catch (error) {
    console.error('Error fetching repos:', error.message);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// 2️⃣ DELETE /repos → Delete multiple repos by full_name
router.delete('/delete', requireAuth, async (req, res) => {
  const token = req.session.token;
  const reposToDelete = req.body.repos;

  if (!Array.isArray(reposToDelete) || reposToDelete.length === 0) {
    return res.status(400).json({ error: 'No repositories specified' });
  }

  const results = [];

  for (const fullName of reposToDelete) {
    console.log(`Attempting to delete: ${fullName}`);
    try {
      const response = await axios.delete(`https://api.github.com/repos/${fullName}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github+json',
        },
      });

      console.log(`✅ Deleted: ${fullName}`);
      results.push({ repo: fullName, status: 'deleted' });
    } catch (error) {
      console.error(`❌ Failed to delete ${fullName}:`, error.response?.data || error.message);
      results.push({
        repo: fullName,
        status: 'failed',
        message: error.response?.data?.message || error.message,
      });
    }
  }

  res.json({ results });
});


export default router;

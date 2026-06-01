import axios from 'axios';
import { bulkRepoAction } from '../services/bulkRepoAction.service.js';

export const getList = async (req, res) => {
  try {
    const token = req.token;

    let allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const { data: repos } = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github+json',
        },
        params: {
          per_page: 100,
          page: page,
          affiliation: 'owner',
        },
      });

      allRepos = allRepos.concat(repos);

      if (repos.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    const simplifiedRepos = allRepos.map(repo => ({
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      user: repo.owner.login,
      id: repo.id,
      fork: repo.fork,
      avatar: repo.owner.avatar_url,
      updated_at: repo.updated_at,
      size: repo.size,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
    }));
    const username = allRepos[0]?.owner?.login;
    const avatar = allRepos[0]?.owner?.avatar_url;

    res.json({repos:simplifiedRepos , user:username , avatar:avatar});
  } catch (error) {
    console.error('Error fetching repos:', error.message);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
}

export const deleteRepo =  async (req, res) => {
  const token = req.token;
  const reposToDelete = req.body.repos;

  if (!Array.isArray(reposToDelete) || reposToDelete.length === 0) {
    return res.status(400).json({ error: 'No repositories specified' });
  }

  const results = await bulkRepoAction({
    repos: reposToDelete,
    token,
    successStatus: 'deleted',
    action: (fullName, token) => {
      console.log(`Attempting to delete: ${fullName}`);
      return axios.delete(`https://api.github.com/repos/${fullName}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github+json',
        },
      }).then(response => {
        console.log(`Deleted: ${fullName}`);
        return response;
      }).catch(error => {
        console.error(`Failed to delete ${fullName}:`, error.response?.data || error.message);
        throw error;
      });
    },
  });

  res.json({ results });
}

export const archiveRepo = async (req, res) => {
  const token = req.token;
  const reposToArchive = req.body.repos;

  if (!Array.isArray(reposToArchive) || reposToArchive.length === 0) {
    return res.status(400).json({ error: 'No repositories specified' });
  }

  const results = await bulkRepoAction({
    repos: reposToArchive,
    token,
    successStatus: 'archived',
    action: (fullName, token) => {
      console.log(`Attempting to archive: ${fullName}`);
      return axios.patch(
        `https://api.github.com/repos/${fullName}`,
        { archived: true },
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github+json',
          },
        }
      ).then(response => {
        console.log(`Archived: ${fullName}`);
        return response;
      }).catch(error => {
        console.error(`Failed to archive ${fullName}:`, error.response?.data || error.message);
        throw error;
      });
    },
  });

  res.json({ results });
}

export const makePrivate = async (req, res) => {
  const token = req.token;
  const reposToUpdate = req.body.repos;

  if (!Array.isArray(reposToUpdate) || reposToUpdate.length === 0) {
    return res.status(400).json({ error: 'No repositories specified' });
  }

  const results = await bulkRepoAction({
    repos: reposToUpdate,
    token,
    successStatus: 'private',
    action: (fullName, token) => {
      console.log(`Attempting to make private: ${fullName}`);
      return axios.patch(
        `https://api.github.com/repos/${fullName}`,
        { private: true },
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github+json',
          },
        }
      ).then(response => {
        console.log(`Made private: ${fullName}`);
        return response;
      }).catch(error => {
        console.error(`Failed to make private ${fullName}:`, error.response?.data || error.message);
        throw error;
      });
    },
  });

  res.json({ results });
}

export const getStarred = async (req, res) => {
  try {
    const token = req.token;

    let allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const { data: repos } = await axios.get('https://api.github.com/user/starred', {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github+json',
        },
        params: {
          per_page: 100,
          page: page,
        },
      });

      allRepos = allRepos.concat(repos);

      if (repos.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    const simplifiedRepos = allRepos.map(repo => ({
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      user: repo.owner.login,
      id: repo.id,
      fork: repo.fork,
      avatar: repo.owner.avatar_url,
      updated_at: repo.updated_at,
      size: repo.size,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
    }));
    
    const { data: userData } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
      }
    });

    res.json({repos:simplifiedRepos , user:userData.login , avatar:userData.avatar_url});
  } catch (error) {
    console.error('Error fetching starred repos:', error.message);
    res.status(500).json({ error: 'Failed to fetch starred repositories' });
  }
}

export const unstarRepos = async (req, res) => {
  const token = req.token;
  const reposToUnstar = req.body.repos;

  if (!Array.isArray(reposToUnstar) || reposToUnstar.length === 0) {
    return res.status(400).json({ error: 'No repositories specified' });
  }

  const results = await bulkRepoAction({
    repos: reposToUnstar,
    token,
    successStatus: 'unstarred',
    action: (fullName, token) => {
      console.log(`Attempting to unstar: ${fullName}`);
      return axios.delete(`https://api.github.com/user/starred/${fullName}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github+json',
        },
      }).then(response => {
        console.log(`Unstarred: ${fullName}`);
        return response;
      }).catch(error => {
        console.error(`Failed to unstar ${fullName}:`, error.response?.data || error.message);
        throw error;
      });
    },
  });

  res.json({ results });
}
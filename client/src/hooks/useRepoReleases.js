import { useState, useEffect } from 'react';
import api from '../utils/api';

/**
 * Hook to fetch release data for repositories
 * @param {Array} repos - Array of repo full_names
 * @param {boolean} enabled - Whether to fetch releases
 * @returns {Object} - { releases: Map, loading: boolean, error: Error|null }
 */
export const useRepoReleases = (repos, enabled = true) => {
  const [releases, setReleases] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !repos || repos.length === 0) {
      return;
    }

    const fetchReleases = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch releases count for selected repos
        const response = await api.post('/repos/analyze-risks', {
          repos: repos,
        });

        // Convert array to Map for easy lookup
        const releasesMap = new Map();
        if (response.data?.risks) {
          response.data.risks.forEach(({ fullName, releases_count }) => {
            releasesMap.set(fullName, releases_count);
          });
        }

        setReleases(releasesMap);
      } catch (err) {
        console.error('Error fetching releases:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
  }, [repos, enabled]);

  return { releases, loading, error };
};

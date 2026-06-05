import { differenceInDays } from 'date-fns';

/**
 * Analyzes a repository for potential risks before deletion
 * @param {Object} repo - Repository object
 * @returns {Object} Risk analysis with indicators
 */
export const analyzeRepositoryRisks = (repo) => {
  const risks = [];
  const warnings = [];

  // Check if recently updated
  if (repo.updated_at) {
    const daysAgo = differenceInDays(new Date(), new Date(repo.updated_at));
    if (daysAgo <= 7) {
      risks.push({
        type: 'recent',
        severity: 'high',
        label: 'Recently Updated',
        description: `Updated ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`,
      });
    } else if (daysAgo <= 30) {
      warnings.push({
        type: 'recent',
        severity: 'medium',
        label: 'Recently Active',
        description: `Updated ${daysAgo} days ago`,
      });
    }
  }

  // Check if high star count
  if (repo.stargazers_count && repo.stargazers_count >= 50) {
    const severity = repo.stargazers_count >= 100 ? 'high' : 'medium';
    (severity === 'high' ? risks : warnings).push({
      type: 'stars',
      severity,
      label: 'High Star Count',
      description: `${repo.stargazers_count} stars`,
    });
  } else if (repo.stargazers_count && repo.stargazers_count >= 10) {
    warnings.push({
      type: 'stars',
      severity: 'low',
      label: 'Popular Repository',
      description: `${repo.stargazers_count} stars`,
    });
  }

  // Check if forked
  if (repo.fork) {
    warnings.push({
      type: 'fork',
      severity: 'low',
      label: 'Forked Repository',
      description: 'This is a fork of another repository',
    });
  }

  // Check if has releases
  if (repo.releases_count && repo.releases_count > 0) {
    risks.push({
      type: 'releases',
      severity: 'high',
      label: 'Has Releases',
      description: `${repo.releases_count} release${repo.releases_count !== 1 ? 's' : ''}`,
    });
  }

  // Calculate overall risk level
  const riskLevel = risks.length > 0 ? 'high' : warnings.length > 0 ? 'medium' : 'low';

  return {
    riskLevel,
    risks,
    warnings,
    hasCriticalRisks: risks.length > 0,
  };
};

/**
 * Analyzes multiple repositories for risks
 * @param {Array} repos - Array of repository objects
 * @returns {Array} Array of risk analyses
 */
export const analyzeMultipleRepositories = (repos) => {
  return repos.map((repo) => ({
    repo,
    analysis: analyzeRepositoryRisks(repo),
  }));
};

/**
 * Gets high-risk repositories from a list
 * @param {Array} repos - Array of repository objects
 * @returns {Array} Array of high-risk repositories
 */
export const getHighRiskRepositories = (repos) => {
  return analyzeMultipleRepositories(repos).filter(
    ({ analysis }) => analysis.riskLevel === 'high'
  );
};

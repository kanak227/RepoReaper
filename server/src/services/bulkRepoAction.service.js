/**
 * Executes a bulk action on multiple GitHub repositories
 * @param {Object} params - Parameters object
 * @param {Array<string>} params.repos - Array of repository full names (owner/repo)
 * @param {string} params.token - GitHub authentication token
 * @param {Function} params.action - Async function that performs the action on a single repo
 *   Takes (fullName, token) and returns axios response
 * @param {string} params.successStatus - Status value to use on success
 * @returns {Promise<Array>} Array of results in format: { repo, status, message? }
 */
export const bulkRepoAction = async ({ repos, token, action, successStatus }) => {
  if (!Array.isArray(repos)) {
    throw new Error('repos must be an array');
  }

  const results = [];
  let rateLimitInfo = null;

  for (let i = 0; i < repos.length; i++) {
    const fullName = repos[i];
    try {
      await action(fullName, token);
      results.push({ repo: fullName, status: successStatus });
    } catch (error) {
      if (error.response && (error.response.status === 429 || error.response.status === 403)) {
        const headers = error.response.headers;
        const resetTime = headers['x-ratelimit-reset'];
        const retryAfter = headers['retry-after'];
        
        if (resetTime || retryAfter || (error.response.data?.message && error.response.data.message.toLowerCase().includes('rate limit'))) {
          rateLimitInfo = {
            resetTime: resetTime ? parseInt(resetTime, 10) : null,
            retryAfter: retryAfter ? parseInt(retryAfter, 10) : null,
            remainingRepos: repos.slice(i), // include the one that failed
          };
          break; // bail out
        }
      }

      results.push({
        repo: fullName,
        status: 'failed',
        message: error.response?.data?.message || error.message,
      });
    }
  }

  return { results, rateLimitInfo };
};

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

  for (const fullName of repos) {
    try {
      await action(fullName, token);
      results.push({ repo: fullName, status: successStatus });
    } catch (error) {
      results.push({
        repo: fullName,
        status: 'failed',
        message: error.response?.data?.message || error.message,
      });
    }
  }

  return results;
};

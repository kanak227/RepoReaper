/** 
 *  A Clean utility function to pause loop execution for a given number of miliseconds
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
      // 1. Execute the action for the current repository
      await action(fullName, token);
      results.push({ repo: fullName, status: successStatus });
      // Humane practice : Add a tiny 200ms operational breathing room between bulk loops
      // This is to avoid hitting secondary rate limits in the first place.
      await sleep(200);

    } catch (error) {
      // 2. Intercept context : Did we trigger a Github API Rate limit (HTTP 429)?
      if (error.response && error.response.status === 429) {
        // Read how many seconds Github wants us to wait before retrying
        const retryAfterHeader = error.response.headers['retry-after'];
        const SecondsToWait = parseInt(retryAfterHeader, 10) || 60; // fallback to 60 seconds 
         
        console.warn(`[Rate Limit Guard] Hit 429 on ${fullName}. Cooling down for ${SecondsToWait}s..`);

        // 3. Wait out the required penalty timer right here inside the loop sequence!
          await sleep(SecondsToWait * 1000);

        // 4. Automatic Retry : Retry the exact repository action that just failed
        try {
          await action(fullName, token);
          results.push({ repo: fullName, status: successStatus });
          continue; // Successfully  recovered! Move to the next repository in the loop.
        } catch (retryError) {
          // If it fails a second time, catch it amd log it below.
          error = retryError; 
        }  
      }
      // Standard failure fallback if it was not a rate limit error or if retry failed
      
      results.push({
        repo: fullName,
        status: 'failed',
        message: error.response?.data?.message || error.message,
      });
    }
  }

  return results;
};

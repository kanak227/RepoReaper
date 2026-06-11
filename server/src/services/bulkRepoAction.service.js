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
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRateLimitPauseSeconds = (headers = {}) => {
  const retryAfter = Number(headers['retry-after']);
  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    return retryAfter;
  }

  const reset = Number(headers['x-ratelimit-reset']);
  if (Number.isFinite(reset) && reset > 0) {
    const now = Math.floor(Date.now() / 1000);
    return Math.max(1, reset - now + 1);
  }

  return 60;
};

const isRateLimitError = (error) => {
  const status = error?.response?.status;
  const remaining = Number(error?.response?.headers?.['x-ratelimit-remaining']);
  return (
    status === 429 ||
    (status === 403 && Number.isFinite(remaining) && remaining <= 0)
  );
};

export const bulkRepoAction = async ({ repos, token, action, successStatus }) => {
  if (!Array.isArray(repos)) {
    throw new Error('repos must be an array');
  }

  const results = [];
  let rateLimit = null;

  for (const fullName of repos) {
    let retriedAfterRateLimit = false;

    try {
      // Keep trying the same repo once after a rate limit pause so users
      // do not lose their bulk action progress mid-flight.
      while (true) {
        try {
          const response = await action(fullName, token);
          results.push({ repo: fullName, status: successStatus });

          const remaining = Number(response?.headers?.['x-ratelimit-remaining']);
          if (!rateLimit && Number.isFinite(remaining) && remaining <= 1) {
            const pauseSeconds = getRateLimitPauseSeconds(response?.headers);
            rateLimit = {
              repo: fullName,
              pauseSeconds,
              remaining,
            };
          }

          break;
        } catch (error) {
          if (!retriedAfterRateLimit && isRateLimitError(error)) {
            const pauseSeconds = getRateLimitPauseSeconds(error?.response?.headers);
            rateLimit = {
              repo: fullName,
              pauseSeconds,
              remaining: Number(error?.response?.headers?.['x-ratelimit-remaining']),
            };
            retriedAfterRateLimit = true;
            await sleep(pauseSeconds * 1000);
            continue;
          }

          results.push({
            repo: fullName,
            status: 'failed',
            message: error.response?.data?.message || error.message,
          });
          break;
        }
      }
    } catch (error) {
      results.push({
        repo: fullName,
        status: 'failed',
        message: error.response?.data?.message || error.message,
      });
    }
  }

  return { results, rateLimit };
};

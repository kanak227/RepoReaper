export const getFriendlyErrorMessage = (err) => {
  const status = err?.response?.status;

  const rawMessage =
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.message ||
    "";

  const message = rawMessage.toLowerCase();

  if (
    !navigator.onLine ||
    message.includes("network") ||
    message.includes("failed to fetch")
  ) {
    return "Network connection issue. Please check your internet connection and try again.";
  }

  if (status === 401) {
    return "Your authentication session has expired. Please log in again to continue.";
  }

  if (
    status === 429 ||
    (status === 403 &&
      (message.includes("rate limit") ||
        message.includes("api rate limit exceeded") ||
        String(err?.response?.headers?.["x-ratelimit-remaining"]) === "0"))
  ) {
    return "GitHub API rate limit exceeded. Please wait a few minutes or authenticate to increase your limit.";
  }

  if (status === 403) {
    return "You are not authorized to perform this action.";
  }

  if (status === 404) {
    return "The requested resource could not be found.";
  }

  if (status >= 500) {
    return "A server error occurred. Please try again later.";
  }

  return rawMessage || "Something went wrong. Please try again.";
};
const isDevelopment = (process.env.NODE_ENV || 'development').trim() === 'development';

const runInDevelopment = (callback) => {
  if (isDevelopment) {
    callback();
  }
};

const logger = {
  debug: (...args) => runInDevelopment(() => console.debug(...args)),
  info: (...args) => runInDevelopment(() => console.info(...args)),
  warn: (...args) => runInDevelopment(() => console.warn(...args)),
  error: (...args) => console.error(...args),
};

export default logger;

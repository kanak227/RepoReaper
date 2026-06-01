const isDev = (process.env.NODE_ENV || 'development').trim() !== 'production';

export const logger = {
  debug: (...args) => {
    if (isDev) {
      console.log('[DEBUG]', ...args);
    }
  },
  info: (...args) => {
    console.log('[INFO]', ...args);
  },
  error: (...args) => {
    console.error(...args);
  },
};

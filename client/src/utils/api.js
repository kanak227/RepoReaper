import axios from "axios";
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || '').replace(/\/$/, ''),
  withCredentials: true,
});

let handlingSessionExpiry = false;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url || '';

    if (status === 401 && !requestUrl.includes('/auth/logout')) {
      localStorage.removeItem('token');

      if (!handlingSessionExpiry) {
        handlingSessionExpiry = true;
        toast.error('Session expired. Please log in again.');
        window.setTimeout(() => {
          const nextPath = window.location.pathname === '/dashboard' ? '/' : window.location.pathname;
          window.location.href = nextPath === '/' ? '/' : '/';
          handlingSessionExpiry = false;
        }, 150);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

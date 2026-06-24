import axios from "axios";
import{ useAppStore } from "../store/app.store"; 

const api = axios.create({
  baseURL:  (import.meta.env.VITE_API_URL || "").replace(/\/$/, ""), 
  withCredentials: true,
});
// Outgoing request interceptor (Existing code)

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Incoming response interceptor (New rate-limiting layer)
api.interceptors.response.use(
  (response) => {
    // If the backend request succeeds, pass it on seamlessly
    return response;
  }, 
  (error) => {
    // Context check: Did our backend flag a 429 rate limit cooldown?
    if (error.response && error.response.status === 429) {
      // Pull out the cooldown seconds sent by the server, or fallback to 60s
      const duation = error.response.data?.cooldownDuration || 60;
       
      // Update our global Zustand store state instantly
      useAppStore.getState().intiateSystemCooldown(duation);
    }
     // Pass the error down normally so our components can gracefully reject 
    return Promise.reject(error);
  }
);

export default api;

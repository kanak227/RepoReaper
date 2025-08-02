import axios from "axios";

const api = axios.create({
  // Use relative URL to work with both development and production environments
  baseURL: '/', 
  withCredentials: true,
});

export default api;

import axios from 'axios';

// Create an axios instance with the base backend URL
export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Automatically add the JWT token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// src/api.ts
import axios from 'axios';
import { store } from '../app/store';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

apiClient.interceptors.request.use(config => {
  const token = store.getState().auth.token;
  const refreshToken=store.getState().auth.refreshToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }else if(refreshToken){
    config.headers.Authorization = `Bearer ${refreshToken}`;
  }
  return config;
});

export default apiClient;
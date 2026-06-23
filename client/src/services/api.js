import axios from 'axios';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const authApi = { register: (data) => api.post('/auth/register', data), login: (data) => api.post('/auth/login', data), me: () => api.get('/auth/me') };
export const userApi = { search: (q) => api.get(`/users/search?q=${encodeURIComponent(q)}`) };
export const chatApi = { list: () => api.get('/chats'), access: (userId) => api.post('/chats', { userId }), group: (data) => api.post('/chats/group', data) };
export const messageApi = { list: (chatId) => api.get(`/messages/${chatId}`), send: (data) => api.post('/messages', data), read: (chatId) => api.patch(`/messages/${chatId}/read`) };

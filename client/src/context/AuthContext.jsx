import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { const token = localStorage.getItem('token'); if (!token) return setLoading(false); authApi.me().then(({ data }) => setUser(data)).catch(() => localStorage.removeItem('token')).finally(() => setLoading(false)); }, []);
  const saveSession = ({ user, token }) => { localStorage.setItem('token', token); setUser(user); };
  const login = async (form) => { const { data } = await authApi.login(form); saveSession(data); toast.success('Welcome back!'); };
  const register = async (form) => { const { data } = await authApi.register(form); saveSession(data); toast.success('Account created!'); };
  const logout = () => { localStorage.removeItem('token'); setUser(null); toast.success('Logged out'); };
  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

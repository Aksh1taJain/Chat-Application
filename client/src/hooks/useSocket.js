import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
export function useSocket(user) {
  const [socket, setSocket] = useState(null); const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => { if (!user) return; const s = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', { auth: { token: localStorage.getItem('token') } }); setSocket(s); s.on('online-users', setOnlineUsers); return () => s.disconnect(); }, [user]);
  return { socket, onlineUsers };
}

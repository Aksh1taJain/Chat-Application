export const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
export const initials = (name = '') => name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();

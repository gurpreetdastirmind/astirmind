// Central API configuration
// Set VITE_API_BASE in .env to override for production
export const API_BASE = import.meta.env.VITE_API_BASE || 'https://astirmind-backend.onrender.com/api';
export const MEDIA_BASE = import.meta.env.VITE_MEDIA_BASE || 'https://astirmind-backend.onrender.com';
// Shared CSRF token helper
export function getCSRFToken() {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : '';
}

// Shared apiFetch — injects CSRF + credentials, handles JSON vs FormData
export async function apiFetch(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const headers = {
    'X-CSRFToken': getCSRFToken(),
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {}),
  };
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  });
  return res;
}

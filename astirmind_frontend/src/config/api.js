// Central API configuration
// Set VITE_API_BASE in .env to override for production
const BASE_URL = import.meta.env.VITE_API_URL || 'https://astirmind-backend.onrender.com';

export const API_BASE = `${BASE_URL}/api`;
export const MEDIA_BASE = BASE_URL;

// Optional: Add other API endpoints
export const ENDPOINTS = {
    CAPTCHA: `${API_BASE}/captcha/`,
    HIRING: `${API_BASE}/hiring/`,
    CONTACT: `${API_BASE}/messages/`,
    VERIFY: `${API_BASE}/verify/`,
    QUOTES: `${API_BASE}/quotes/`,
};
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

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  ADMIN_LOGIN: '/auth/admin/login',
  LOGOUT: '/auth/logout',

  // Events
  EVENTS: '/events',
  EVENT: (id: string) => `/events/${id}`,
  EVENT_PROPOSALS: (id: string) => `/events/${id}/proposals`,
  EVENT_VOTING: (id: string) => `/events/${id}/voting`,

  // Themes
  THEMES: '/themes',
  THEME: (id: string) => `/themes/${id}`,
  THEME_VOTES: (id: string) => `/themes/${id}/votes`,

  // Sessions
  SESSIONS: '/sessions',
  SESSION: (id: string) => `/sessions/${id}`,
  SESSION_PARTICIPANTS: (id: string) => `/sessions/${id}/participants`,
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};
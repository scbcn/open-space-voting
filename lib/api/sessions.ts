import { ApiResponse, API_ENDPOINTS } from './config';
import { fetchApi } from './fetch';
import { Session } from '@/lib/types';

export async function getSessions(eventId: string): Promise<ApiResponse<Session[]>> {
  return fetchApi(API_ENDPOINTS.SESSIONS, {
    params: { eventId },
  });
}

export async function getSession(id: string): Promise<ApiResponse<Session>> {
  return fetchApi(API_ENDPOINTS.SESSION(id));
}

export async function joinSession(id: string, username: string): Promise<ApiResponse<Session>> {
  return fetchApi(API_ENDPOINTS.SESSION_PARTICIPANTS(id), {
    method: 'POST',
    body: { username },
  });
}

export async function leaveSession(id: string, username: string): Promise<ApiResponse<Session>> {
  return fetchApi(API_ENDPOINTS.SESSION_PARTICIPANTS(id), {
    method: 'DELETE',
    body: { username },
  });
}

export async function updateSessionNotes(id: string, notes: string): Promise<ApiResponse<Session>> {
  return fetchApi(API_ENDPOINTS.SESSION(id), {
    method: 'PATCH',
    body: { notes },
  });
}
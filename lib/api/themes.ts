import { ApiResponse, API_ENDPOINTS } from './config';
import { fetchApi } from './fetch';
import { Theme } from '@/lib/types';

export async function getThemes(eventId: string): Promise<ApiResponse<Theme[]>> {
  return fetchApi(API_ENDPOINTS.THEMES, {
    params: { eventId },
  });
}

export async function createTheme(theme: Omit<Theme, 'id' | 'votes' | 'votedBy'>): Promise<ApiResponse<Theme>> {
  return fetchApi(API_ENDPOINTS.THEMES, {
    method: 'POST',
    body: theme,
  });
}

export async function voteTheme(id: string, username: string, remove?: boolean): Promise<ApiResponse<Theme>> {
  return fetchApi(API_ENDPOINTS.THEME_VOTES(id), {
    method: remove ? 'DELETE' : 'POST',
    body: { username },
  });
}
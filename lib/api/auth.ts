import { ApiResponse, API_ENDPOINTS } from './config';
import { fetchApi } from './fetch';
import { OpenSpaceAccess } from '@/lib/types';

export async function login(spaceId: string, username: string): Promise<ApiResponse<OpenSpaceAccess>> {
  return fetchApi(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: { spaceId, username },
  });
}

export async function adminLogin(username: string, password: string): Promise<ApiResponse<OpenSpaceAccess>> {
  return fetchApi(API_ENDPOINTS.ADMIN_LOGIN, {
    method: 'POST',
    body: { username, password },
  });
}

export async function logout(): Promise<ApiResponse<void>> {
  return fetchApi(API_ENDPOINTS.LOGOUT, {
    method: 'POST',
  });
}
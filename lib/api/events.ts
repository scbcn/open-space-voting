import { ApiResponse, API_ENDPOINTS } from './config';
import { fetchApi } from './fetch';
import { OpenSpaceEvent } from '@/lib/types';

export async function getEvents(): Promise<ApiResponse<OpenSpaceEvent[]>> {
  return fetchApi(API_ENDPOINTS.EVENTS);
}

export async function getEvent(id: string): Promise<ApiResponse<OpenSpaceEvent>> {
  return fetchApi(API_ENDPOINTS.EVENT(id));
}

export async function createEvent(event: Omit<OpenSpaceEvent, 'id'>): Promise<ApiResponse<OpenSpaceEvent>> {
  return fetchApi(API_ENDPOINTS.EVENTS, {
    method: 'POST',
    body: event,
  });
}

export async function updateEvent(id: string, event: Partial<OpenSpaceEvent>): Promise<ApiResponse<OpenSpaceEvent>> {
  return fetchApi(API_ENDPOINTS.EVENT(id), {
    method: 'PUT',
    body: event,
  });
}

export async function deleteEvent(id: string): Promise<ApiResponse<void>> {
  return fetchApi(API_ENDPOINTS.EVENT(id), {
    method: 'DELETE',
  });
}

export async function toggleEventProposals(id: string, allow: boolean): Promise<ApiResponse<OpenSpaceEvent>> {
  return fetchApi(API_ENDPOINTS.EVENT_PROPOSALS(id), {
    method: 'PUT',
    body: { allow },
  });
}

export async function toggleEventVoting(id: string, allow: boolean): Promise<ApiResponse<OpenSpaceEvent>> {
  return fetchApi(API_ENDPOINTS.EVENT_VOTING(id), {
    method: 'PUT',
    body: { allow },
  });
}
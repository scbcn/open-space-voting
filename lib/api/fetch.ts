import { API_BASE_URL, ApiResponse } from './config';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  params?: Record<string, string>;
  headers?: Record<string, string>;
};

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const {
      method = 'GET',
      body,
      params,
      headers: customHeaders = {},
    } = options;

    const url = new URL(API_BASE_URL + endpoint);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include', // Include cookies for authentication
    });

    const data = await response.json();

    return {
      data: data.data,
      error: data.error,
      status: response.status,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500,
    };
  }
}
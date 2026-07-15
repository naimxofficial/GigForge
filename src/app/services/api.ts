import { API_BASE_URL } from '@/app/lib/constants';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  token?: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request(endpoint: string, options: RequestOptions = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (options.token) {
      headers['Authorization'] = `Bearer ${options.token}`;
      headers['x-user-id'] = options.token.split(':')[0] || options.token;
    }

    const config: RequestInit = {
      method: options.method || 'GET',
      headers,
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Network error');
    }
  }

  async get(endpoint: string, token?: string) {
    return this.request(endpoint, { method: 'GET', token });
  }

  async post(endpoint: string, body: any, token?: string) {
    return this.request(endpoint, { method: 'POST', body, token });
  }

  async put(endpoint: string, body: any, token?: string) {
    return this.request(endpoint, { method: 'PUT', body, token });
  }

  async delete(endpoint: string, token?: string) {
    return this.request(endpoint, { method: 'DELETE', token });
  }
}

export const apiClient = new ApiClient();

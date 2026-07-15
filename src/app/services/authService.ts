import { apiClient } from './api';
import { LoginPayload, RegisterPayload, User } from '@/app/types';

export const authService = {
  async register(data: RegisterPayload): Promise<{ user: User; token?: string }> {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  async login(data: LoginPayload): Promise<{ user: User; token: string }> {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  async getMe(token: string): Promise<User> {
    const response = await apiClient.get('/auth/me', token);
    return response.data;
  },

  async updateProfile(token: string, updates: Partial<User>): Promise<User> {
    const response = await apiClient.put('/auth/profile', updates, token);
    return response.data;
  },

  async getUser(userId: string): Promise<User> {
    const response = await apiClient.get(`/auth/user/${userId}`);
    return response.data;
  },

  getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('gigforge_token');
  },

  saveToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('gigforge_token', token);
  },

  removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('gigforge_token');
  },
};

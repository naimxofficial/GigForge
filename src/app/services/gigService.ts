import { apiClient } from './api';
import { Gig, PaginatedResponse, PaginationQuery } from '@/app/types';

export const gigService = {
  async createGig(data: Partial<Gig>, token: string): Promise<Gig> {
    const response = await apiClient.post('/gigs', data, token);
    return response.data;
  },

  async getGigs(filters: PaginationQuery = {}): Promise<PaginatedResponse<Gig>> {
    const params = new URLSearchParams();
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', String(filters.minPrice));
    if (filters.maxPrice) params.append('maxPrice', String(filters.maxPrice));
    if (filters.sort) params.append('sort', filters.sort);

    const endpoint = `/gigs?${params.toString()}`;
    const response = await apiClient.get(endpoint);
    return response;
  },

  async getGigById(gigId: string): Promise<Gig> {
    const response = await apiClient.get(`/gigs/${gigId}`);
    return response.data;
  },

  async updateGig(gigId: string, data: Partial<Gig>, token: string): Promise<Gig> {
    const response = await apiClient.put(`/gigs/${gigId}`, data, token);
    return response.data;
  },

  async deleteGig(gigId: string, token: string): Promise<void> {
    await apiClient.delete(`/gigs/${gigId}`, token);
  },

  async getFreelancerGigs(freelancerId: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Gig>> {
    const endpoint = `/gigs/freelancer/${freelancerId}?page=${page}&limit=${limit}`;
    const response = await apiClient.get(endpoint);
    return response;
  },

  async getTrendingGigs(): Promise<Gig[]> {
    const response = await apiClient.get('/gigs/trending');
    return response.data;
  },

  async getCategoryGigs(category: string): Promise<Gig[]> {
    const response = await apiClient.get(`/gigs/category/${category}`);
    return response.data;
  },

  async getRelatedGigs(gigId: string): Promise<Gig[]> {
    const response = await apiClient.get(`/gigs/${gigId}/related`);
    return response.data;
  },
};

import { apiClient } from './api';
import { ContactMessage } from '@/app/types';

export const contactService = {
  async sendMessage(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<ContactMessage> {
    const response = await apiClient.post('/contact', data);
    return response.data;
  },

  async getMessages(page: number = 1, limit: number = 10): Promise<any> {
    const response = await apiClient.get(`/contact?page=${page}&limit=${limit}`);
    return response;
  },

  async deleteMessage(messageId: string): Promise<void> {
    await apiClient.delete(`/contact/${messageId}`);
  },
};

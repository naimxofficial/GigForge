import useSWR, { SWRConfiguration } from 'swr';
import { apiClient } from '@/app/services/api';

export const useFetch = <T,>(url: string | null, options: SWRConfiguration = {}) => {
  const fetcher = async (endpoint: string) => {
    try {
      const data = await apiClient.get(endpoint);
      return data.data || data;
    } catch (error) {
      throw error;
    }
  };

  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
    ...options,
  });

  return {
    data: data || null,
    isLoading,
    error: error?.message,
    mutate,
  };
};

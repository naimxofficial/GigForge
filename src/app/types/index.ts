// User types
export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  skills?: string[];
  hourlyRate?: number;
  totalEarnings?: number;
  rating?: number;
  reviewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Gig types
export interface Gig {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar?: string;
  freelancerRating?: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  deliveryTime?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Review types
export interface Review {
  _id?: string;
  id?: string;
  gigId: string;
  freelancerId: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Contact message types
export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Auth types
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Toast types
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

// Pagination
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

// Freelancer types
export interface Freelancer {
  _id?: string;
  name: string;
  title?: string;
  avatar?: string;
  rating: number;
  completedGigs?: number;
  hourlyRate?: number;
  description?: string;
}

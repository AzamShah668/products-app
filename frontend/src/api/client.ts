import axios, { AxiosResponse, AxiosError } from 'axios';

// Types based on backend schemas
export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
}

export interface UserCreate {
  username: string;
  email: string;
  full_name?: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  in_stock: boolean;
  image_url?: string;
  category: string;
}

export interface ProductCreate {
  name: string;
  description?: string;
  price: number;
  in_stock?: boolean;
  image_url?: string;
  category?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ApiError {
  detail: string;
}

// In production (Docker), nginx proxies /api to backend:8000
// In development, vite proxy handles /api requests
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance with better configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: UserCreate): Promise<AxiosResponse<User>> =>
    api.post('/auth/register', userData),

  login: (username: string, password: string): Promise<AxiosResponse<LoginResponse>> =>
    api.post(
      '/auth/login',
      new URLSearchParams({
        username,
        password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    ),

  getCurrentUser: (): Promise<AxiosResponse<User>> => api.get('/auth/me'),
};

// Products API
export const productsAPI = {
  getProducts: (skip = 0, limit = 100): Promise<AxiosResponse<Product[]>> =>
    api.get(`/products/?skip=${skip}&limit=${limit}`),

  getProduct: (id: number): Promise<AxiosResponse<Product>> =>
    api.get(`/products/${id}`),

  createProduct: (productData: ProductCreate): Promise<AxiosResponse<Product>> =>
    api.post('/products/', productData),

  updateProduct: (id: number, productData: ProductCreate): Promise<AxiosResponse<Product>> =>
    api.put(`/products/${id}`, productData),

  deleteProduct: (id: number): Promise<AxiosResponse<{ message: string }>> =>
    api.delete(`/products/${id}`),
};

export default api;

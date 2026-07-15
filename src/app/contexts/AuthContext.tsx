'use client';

import React, { createContext, useState, useEffect } from 'react';
import { User, AuthState, LoginPayload, RegisterPayload } from '@/app/types';
import { authService } from '@/app/services/authService';

export interface AuthContextType extends AuthState {
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    error: null,
  });

  // Initialize from localStorage
  useEffect(() => {
    const token = authService.getStoredToken();
    if (token) {
      setState((prev) => ({ ...prev, token }));
      // Optionally verify token with backend
    }
    setState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  const login = async (data: LoginPayload) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const result = await authService.login(data);
      authService.saveToken(result.token);
      setState({
        user: result.user,
        token: result.token,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Login failed',
      }));
      throw error;
    }
  };

  const register = async (data: RegisterPayload) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const result = await authService.register(data);
      if (result.token) {
        authService.saveToken(result.token);
        setState({
          user: result.user,
          token: result.token,
          isLoading: false,
          error: null,
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Registration failed',
      }));
      throw error;
    }
  };

  const logout = () => {
    authService.removeToken();
    setState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    isAuthenticated: !!state.token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

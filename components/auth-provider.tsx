"use client";

import {
  authApi,
  UserData,
  storeAuthToken,
  clearAuthToken,
  isAuthenticated,
} from "@/lib/api";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

  // Check authentication status and load user data on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);

      if (isAuthenticated()) {
        try {
          const response = await authApi.getUserData();
          if (response.success && response.data) {
            setUser(response.data);
            setIsAuthenticatedState(true);
          } else {
            // Token might be invalid, clear it
            clearAuthToken();
            setUser(null);
            setIsAuthenticatedState(false);
          }
        } catch (error) {
          console.error("Failed to load user data:", error);
          clearAuthToken();
          setUser(null);
          setIsAuthenticatedState(false);
        }
      } else {
        setUser(null);
        setIsAuthenticatedState(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ) => {
    try {
      const response = await authApi.login({
        email,
        password,
        remember_me: rememberMe,
      });

      if (response.success && response.data) {
        // Store the access token
        storeAuthToken(response.data.access_token, rememberMe);

        // Load user data
        await refreshUser();

        setIsAuthenticatedState(true);
        return { success: true };
      } else {
        return {
          success: false,
          error: response.error?.message || "Login failed. Please try again.",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "Network error occurred. Please try again.",
      };
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const response = await authApi.register({
        email,
        password,
        firstName,
        lastName,
      });

      if (response.success && response.data) {
        // Store the access token (assuming register also returns a token)
        storeAuthToken(response.data.access_token, false);

        // Load user data
        await refreshUser();

        setIsAuthenticatedState(true);
        return { success: true };
      } else {
        return {
          success: false,
          error:
            response.error?.message || "Registration failed. Please try again.",
        };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: "Network error occurred. Please try again.",
      };
    }
  };

  const logout = async () => {
    try {
      // Call logout API
      await authApi.logout();
    } catch (error) {
      console.error("Logout API error:", error);
      // Continue with local logout even if API fails
    } finally {
      // Clear local state and tokens
      clearAuthToken();
      setUser(null);
      setIsAuthenticatedState(false);
    }
  };

  const refreshUser = async () => {
    if (!isAuthenticated()) {
      setUser(null);
      setIsAuthenticatedState(false);
      return;
    }

    try {
      const response = await authApi.getUserData();
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticatedState(true);
      } else {
        // Token might be invalid, clear it
        clearAuthToken();
        setUser(null);
        setIsAuthenticatedState(false);
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      clearAuthToken();
      setUser(null);
      setIsAuthenticatedState(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: isAuthenticatedState,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

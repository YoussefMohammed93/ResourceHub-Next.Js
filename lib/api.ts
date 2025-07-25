// API service utilities for authentication and other endpoints
import axios from "axios";
import { encryptPassword, generateTimestampToken } from "./utils";

// Base API URL - you should set this in environment variables
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies for session management
});

// API response types based on swagger documentation
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    id: number | string;
    message: string;
  };
}

export interface LoginResponse {
  access_token: string;
  email: string;
  message: string;
}

export interface RegisterResponse {
  access_token: string;
  email: string;
  message: string;
}

export interface UserAccount {
  email: string;
  picture?: string;
  firstName: string;
  lastName: string;
}

export interface Subscription {
  active: boolean;
  plan: string | null;
  credits: {
    remaining: number;
    plan: number;
  };
  until: string | null;
  allowed_sites: string[];
}

export interface UserData {
  account: UserAccount;
  subscription: Subscription;
}

// Credit Analytics Types
export interface CreditStatistics {
  total_credits_issued: number;
  total_credits_used: number;
  total_remaining_credits: number;
  average_daily_usage: number;
  credits_by_plan: Record<string, number>;
  last_updated: string;
}

export interface CreditAnalyticsResponse {
  success: boolean;
  statistics: CreditStatistics;
}

// Credit History Types
export interface CreditHistoryEntry {
  id: number;
  user_email: string;
  action: string;
  credits_changed: number;
  credits_before: number;
  credits_after: number;
  plan_name?: string;
  timestamp: string;
  description?: string;
}

export interface CreditHistoryResponse {
  success: boolean;
  history: CreditHistoryEntry[];
}

// Credit Management Request Types
export interface AddSubscriptionRequest {
  email: string;
  plan_name: string;
}

export interface UpgradeSubscriptionRequest {
  email: string;
  plan_name: string;
}

export interface ExtendSubscriptionRequest {
  email: string;
  days: number;
}

export interface DeleteSubscriptionRequest {
  email: string;
}

// Credit Management Response Types
export interface SubscriptionResponse {
  success: boolean;
  account?: UserAccount;
  subscription?: Subscription;
}

// User Management Types
export interface UsersStatistics {
  total_users: number;
  online_users: number;
  users: UserAccount[];
}

export interface UsersStatisticsResponse {
  success: boolean;
  total_users: number;
  online_users: number;
  users: UserAccount[];
}

export interface DownloadHistoryEntry {
  from: string;
  type: "photo" | "video" | "vector";
  price: number;
  date: string;
  file: string;
}

export interface DownloadHistoryResponse {
  success: boolean;
  downloads: DownloadHistoryEntry[];
}

// Login request data
export interface LoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

// Register request data
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Generic API request function using axios
async function apiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: Record<string, unknown>
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.request({
      url: endpoint,
      method,
      data,
    });

    return response.data;
  } catch (error) {
    console.error("API request failed:", error);

    // Handle axios errors
    if (axios.isAxiosError(error)) {
      if (error.response?.data) {
        return error.response.data;
      }

      return {
        success: false,
        error: {
          id: error.code || "network_error",
          message: error.message || "Network error occurred. Please try again.",
        },
      };
    }

    return {
      success: false,
      error: {
        id: "unknown_error",
        message: "An unexpected error occurred. Please try again.",
      },
    };
  }
}

// Authentication API functions
export const authApi = {
  // Login user
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const encryptedPassword = encryptPassword(credentials.password);
    const token = generateTimestampToken();

    return apiRequest<LoginResponse>("/v1/auth/login", "POST", {
      email: credentials.email,
      password: encryptedPassword,
      token,
      remember_me: credentials.remember_me || false,
    });
  },

  // Register user
  async register(
    userData: RegisterRequest
  ): Promise<ApiResponse<RegisterResponse>> {
    const encryptedPassword = encryptPassword(userData.password);
    const token = generateTimestampToken();

    return apiRequest<RegisterResponse>("/v1/auth/register", "POST", {
      email: userData.email,
      password: encryptedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      token,
    });
  },

  // Logout user
  async logout(): Promise<
    ApiResponse<{ access_token: string; message: string }>
  > {
    return apiRequest("/v1/auth/logout", "POST");
  },

  // Get current user data
  async getUserData(): Promise<ApiResponse<UserData>> {
    return apiRequest<UserData>("/v1/user/data", "GET");
  },
};

// User Management API functions
export const userApi = {
  // Get user data (line 481 from swagger)
  async getUserData(): Promise<ApiResponse<UserData>> {
    return apiRequest<UserData>("/v1/user/data", "GET");
  },

  // Get users statistics (line 511 from swagger)
  async getUsersStatistics(): Promise<ApiResponse<UsersStatisticsResponse>> {
    return apiRequest<UsersStatisticsResponse>("/v1/user/users", "GET");
  },

  // Get download history (line 547 from swagger)
  async getDownloadHistory(): Promise<ApiResponse<DownloadHistoryResponse>> {
    return apiRequest<DownloadHistoryResponse>("/v1/user/history", "GET");
  },
};

// Credit Management API functions
export const creditApi = {
  // Add subscription (line 220 from swagger)
  async addSubscription(
    data: AddSubscriptionRequest
  ): Promise<ApiResponse<SubscriptionResponse>> {
    return apiRequest<SubscriptionResponse>("/v1/credit/subscribe", "POST", {
      email: data.email,
      plan_name: data.plan_name,
    });
  },

  // Upgrade subscription (line 266 from swagger)
  async upgradeSubscription(
    data: UpgradeSubscriptionRequest
  ): Promise<ApiResponse<SubscriptionResponse>> {
    return apiRequest<SubscriptionResponse>("/v1/credit/upgrade", "POST", {
      email: data.email,
      plan_name: data.plan_name,
    });
  },

  // Extend subscription (line 312 from swagger)
  async extendSubscription(
    data: ExtendSubscriptionRequest
  ): Promise<ApiResponse<SubscriptionResponse>> {
    return apiRequest<SubscriptionResponse>("/v1/credit/extend", "POST", {
      email: data.email,
      days: data.days,
    });
  },

  // Delete subscription (line 359 from swagger)
  async deleteSubscription(
    data: DeleteSubscriptionRequest
  ): Promise<ApiResponse<{ success: boolean }>> {
    return apiRequest<{ success: boolean }>("/v1/credit/delete", "POST", {
      email: data.email,
    });
  },

  // Get credit analytics (line 397 from swagger)
  async getCreditAnalytics(): Promise<ApiResponse<CreditAnalyticsResponse>> {
    return apiRequest<CreditAnalyticsResponse>("/v1/credit/analytics", "GET");
  },

  // Get credit history (line 450 from swagger)
  async getCreditHistory(): Promise<ApiResponse<CreditHistoryResponse>> {
    return apiRequest<CreditHistoryResponse>("/v1/credit/history", "GET");
  },
};

// Helper function to check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  // Check for access token in localStorage or sessionStorage
  const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");
  return !!token;
}

// Helper function to store authentication token
export function storeAuthToken(
  token: string,
  rememberMe: boolean = false
): void {
  if (typeof window === "undefined") return;

  if (rememberMe) {
    localStorage.setItem("access_token", token);
  } else {
    sessionStorage.setItem("access_token", token);
  }
}

// Helper function to clear authentication token
export function clearAuthToken(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("access_token");
  sessionStorage.removeItem("access_token");
}

// Site Management Types
export interface SiteInput {
  SiteName: string;
  SiteUrl: string;
  price?: string;
  icon?: string;
}

export interface SiteResponse {
  name: string;
  url: string;
  price: string;
}

export interface Site {
  name: string;
  url: string;
  icon?: string;
  total_downloads: number;
  today_downloads: number;
  price: number;
  last_reset: string;
}

export interface SitesResponse {
  success: boolean;
  data: {
    sites: Site[];
  };
}

export interface SiteActionResponse {
  success: boolean;
  data: {
    message: string;
    site: SiteResponse;
  };
}

export interface DeleteSiteRequest {
  SiteUrl: string;
}

export interface DeleteSiteResponse {
  success: boolean;
  data: {
    message: string;
    site: {
      Url: string;
    };
  };
}

// Site Management API functions
export const siteApi = {
  // Get all sites (line 868 from swagger)
  async getSites(): Promise<ApiResponse<SitesResponse>> {
    return apiRequest<SitesResponse>("/v1/sites/get", "GET");
  },

  // Add new site (line 737 from swagger)
  async addSite(data: SiteInput): Promise<ApiResponse<SiteActionResponse>> {
    return apiRequest<SiteActionResponse>("/v1/sites/add", "POST", {
      SiteName: data.SiteName,
      SiteUrl: data.SiteUrl,
      price: data.price || "1",
      icon: data.icon,
    });
  },

  // Edit existing site (line 777 from swagger)
  async editSite(data: SiteInput): Promise<ApiResponse<SiteActionResponse>> {
    return apiRequest<SiteActionResponse>("/v1/sites/edit", "POST", {
      SiteName: data.SiteName,
      SiteUrl: data.SiteUrl,
      price: data.price || "1",
      icon: data.icon,
    });
  },

  // Delete site (line 817 from swagger)
  async deleteSite(
    data: DeleteSiteRequest
  ): Promise<ApiResponse<DeleteSiteResponse>> {
    return apiRequest<DeleteSiteResponse>("/v1/sites/delete", "POST", {
      SiteUrl: data.SiteUrl,
    });
  },
};

// Pricing Management Types
export interface PricingPlanInput {
  PlanName: string;
  PlanPrice?: string;
  DaysValidity: string;
  Sites: string[];
  PlanDescription: string;
  ContactUsUrl: string;
  credits: string;
}

export interface PricingPlan {
  id?: number;
  name: string;
  description: string;
  price?: string;
  credits: number;
  daysValidity: number;
  contactUsUrl?: string;
  supportedSites?: string[];
  features?: string[];
}

export interface PricingPlanResponse {
  success: boolean;
  message: string;
}

export interface GetPricingPlansResponse {
  success: boolean;
  data: {
    plans: PricingPlan[];
  };
}

export interface DeletePricingPlanRequest {
  PlanName: string;
}

// Pricing Management API functions
export const pricingApi = {
  // Get all pricing plans (line 708 from swagger)
  async getPricingPlans(): Promise<ApiResponse<GetPricingPlansResponse>> {
    return apiRequest<GetPricingPlansResponse>("/v1/pricing/get", "GET");
  },

  // Add new pricing plan (line 597 from swagger)
  async addPricingPlan(
    data: PricingPlanInput
  ): Promise<ApiResponse<PricingPlanResponse>> {
    return apiRequest<PricingPlanResponse>("/v1/pricing/add", "POST", {
      PlanName: data.PlanName,
      PlanPrice: data.PlanPrice,
      DaysValidity: data.DaysValidity,
      Sites: data.Sites,
      PlanDescription: data.PlanDescription,
      ContactUsUrl: data.ContactUsUrl,
      credits: data.credits,
    });
  },

  // Edit existing pricing plan (line 632 from swagger)
  async editPricingPlan(
    data: PricingPlanInput
  ): Promise<ApiResponse<PricingPlanResponse>> {
    return apiRequest<PricingPlanResponse>("/v1/pricing/edit", "POST", {
      PlanName: data.PlanName,
      PlanPrice: data.PlanPrice,
      DaysValidity: data.DaysValidity,
      Sites: data.Sites,
      PlanDescription: data.PlanDescription,
      ContactUsUrl: data.ContactUsUrl,
      credits: data.credits,
    });
  },

  // Delete pricing plan (line 667 from swagger)
  async deletePricingPlan(
    data: DeletePricingPlanRequest
  ): Promise<ApiResponse<PricingPlanResponse>> {
    return apiRequest<PricingPlanResponse>("/v1/pricing/delete", "POST", {
      PlanName: data.PlanName,
    });
  },
};

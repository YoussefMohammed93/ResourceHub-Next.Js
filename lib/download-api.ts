import axios from "axios";

// Get API base URL - same logic as in api.ts
const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    if (process.env.NODE_ENV === "production") {
      return process.env.NEXT_PUBLIC_PRODUCTION_API_URL || "https://stockaty.virs.tech";
    }
    if (process.env.NEXT_PUBLIC_API_BASE_URL) {
      return process.env.NEXT_PUBLIC_API_BASE_URL;
    }
  }
  return process.env.NEXT_PUBLIC_PRODUCTION_API_URL || 
         process.env.NEXT_PUBLIC_API_URL || 
         "https://stockaty.virs.tech";
};

// Create authenticated axios instance for download API
const createAuthenticatedRequest = () => {
  const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
  
  return axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 30000,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        "Authorization": `Bearer ${token}`,
        "X-Access-Token": token
      })
    }
  });
};

// Download API Types
export interface DownloadTask {
  id: string;
  url: string;
  platform: string;
  filename?: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  progress: number;
  created_at: string;
  updated_at: string;
  download_url?: string;
  error_message?: string;
  file_size?: number;
  duration?: number;
}

export interface CreateDownloadRequest {
  url: string;
}

export interface CreateDownloadResponse {
  task_id: string;
  message: string;
}

export interface DownloadTasksResponse {
  tasks: DownloadTask[];
  total: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    id: number | string;
    message: string;
    type?: string;
  };
}

// Helper function to get status color for UI
export function getStatusColor(status: DownloadTask["status"]): string {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "in_progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "failed":
      return "bg-red-100 text-red-800 border-red-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

// Helper function to get status text for UI
export function getStatusText(status: DownloadTask["status"]): string {
  switch (status) {
    case "completed":
      return "Completed";
    case "in_progress":
      return "In Progress";
    case "failed":
      return "Failed";
    case "pending":
      return "Pending";
    default:
      return "Unknown";
  }
}

// Download API functions using the authenticated apiClient
export const downloadApi = {
  // Get user download tasks
  async getTasks(): Promise<ApiResponse<DownloadTasksResponse>> {
    try {
      console.log("[Download API] Fetching download tasks...");
      
      // Check if user is authenticated
      const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
      if (!token) {
        console.error("[Download API] No authentication token found");
        return {
          success: false,
          error: {
            id: "authentication_required",
            message: "Authentication required. Please log in to access this resource.",
            type: "authentication_required"
          }
        };
      }

      console.log("[Download API] Token found, making request with token:", token.substring(0, 20) + "...");

      const apiClient = createAuthenticatedRequest();
      const response = await apiClient.get("/download/tasks");
      
      console.log("[Download API] Response received:", {
        status: response.status,
        data: response.data
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("[Download API] Error fetching tasks:", error);

      if (axios.isAxiosError(error)) {
        console.error("[Download API] Axios error details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          url: error.config?.url,
          method: error.config?.method,
          requestHeaders: error.config?.headers,
        });

        // Handle authentication errors specifically
        if (error.response?.status === 401 || error.response?.status === 403) {
          return {
            success: false,
            error: {
              id: "authentication_required",
              message: "Authentication required. Please log in to access this resource.",
              type: "authentication_required"
            }
          };
        }

        // Return the actual backend error if available
        if (error.response?.data) {
          return {
            success: false,
            error: {
              id: error.response.data.error?.id || error.response.status,
              message: error.response.data.error?.message || error.response.data.message || "Failed to fetch download tasks",
              type: error.response.data.error?.type || "api_error"
            }
          };
        }

        return {
          success: false,
          error: {
            id: error.code || "network_error",
            message: error.message || "Network error occurred. Please try again.",
            type: "network_error"
          }
        };
      }

      return {
        success: false,
        error: {
          id: "unknown_error",
          message: "An unexpected error occurred. Please try again.",
          type: "unknown_error"
        }
      };
    }
  },

  // Create a new download task
  async createTask(data: CreateDownloadRequest): Promise<ApiResponse<CreateDownloadResponse>> {
    try {
      console.log("[Download API] Creating download task for URL:", data.url);
      
      // Check if user is authenticated
      const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
      if (!token) {
        console.error("[Download API] No authentication token found");
        return {
          success: false,
          error: {
            id: "authentication_required",
            message: "Authentication required. Please log in to access this resource.",
            type: "authentication_required"
          }
        };
      }

      console.log("[Download API] Token found, making request with token:", token.substring(0, 20) + "...");

      const apiClient = createAuthenticatedRequest();
      const response = await apiClient.post("/download/create", {
        url: data.url
      });

      console.log("[Download API] Create response received:", {
        status: response.status,
        data: response.data
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("[Download API] Error creating task:", error);

      if (axios.isAxiosError(error)) {
        console.error("[Download API] Axios error details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          url: error.config?.url,
          method: error.config?.method,
          requestHeaders: error.config?.headers,
          requestData: error.config?.data,
        });

        // Handle authentication errors specifically
        if (error.response?.status === 401 || error.response?.status === 403) {
          return {
            success: false,
            error: {
              id: "authentication_required",
              message: "Authentication required. Please log in to access this resource.",
              type: "authentication_required"
            }
          };
        }

        // Return the actual backend error if available
        if (error.response?.data) {
          return {
            success: false,
            error: {
              id: error.response.data.error?.id || error.response.status,
              message: error.response.data.error?.message || error.response.data.message || "Failed to create download task",
              type: error.response.data.error?.type || "api_error"
            }
          };
        }

        return {
          success: false,
          error: {
            id: error.code || "network_error",
            message: error.message || "Network error occurred. Please try again.",
            type: "network_error"
          }
        };
      }

      return {
        success: false,
        error: {
          id: "unknown_error",
          message: "An unexpected error occurred. Please try again.",
          type: "unknown_error"
        }
      };
    }
  },

  // Retry a failed download task
  async retryTask(taskId: string): Promise<ApiResponse<{ message: string }>> {
    try {
      console.log("[Download API] Retrying download task:", taskId);
      
      // Check if user is authenticated
      const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
      if (!token) {
        console.error("[Download API] No authentication token found");
        return {
          success: false,
          error: {
            id: "authentication_required",
            message: "Authentication required. Please log in to access this resource.",
            type: "authentication_required"
          }
        };
      }

      const apiClient = createAuthenticatedRequest();
      const response = await apiClient.post(`/download/retry`, {
        task_id: taskId
      });

      console.log("[Download API] Retry response received:", {
        status: response.status,
        data: response.data
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("[Download API] Error retrying task:", error);

      if (axios.isAxiosError(error)) {
        // Handle authentication errors specifically
        if (error.response?.status === 401 || error.response?.status === 403) {
          return {
            success: false,
            error: {
              id: "authentication_required",
              message: "Authentication required. Please log in to access this resource.",
              type: "authentication_required"
            }
          };
        }

        // Return the actual backend error if available
        if (error.response?.data) {
          return {
            success: false,
            error: {
              id: error.response.data.error?.id || error.response.status,
              message: error.response.data.error?.message || error.response.data.message || "Failed to retry download task",
              type: error.response.data.error?.type || "api_error"
            }
          };
        }

        return {
          success: false,
          error: {
            id: error.code || "network_error",
            message: error.message || "Network error occurred. Please try again.",
            type: "network_error"
          }
        };
      }

      return {
        success: false,
        error: {
          id: "unknown_error",
          message: "An unexpected error occurred. Please try again.",
          type: "unknown_error"
        }
      };
    }
  }
};

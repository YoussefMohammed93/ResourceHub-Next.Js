// Mock data for development and testing
import {
  UserData,
  DownloadHistoryEntry,
  ApiResponse,
  LoginResponse,
  RegisterResponse,
  DownloadHistoryResponse,
} from "./api";

// Mock user data
export const mockUser: UserData = {
  account: {
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    picture: "/placeholder.svg",
  },
  subscription: {
    plan: "Premium",
    active: true,
    until: "2024-12-31",
    credits: {
      plan: 1000,
      remaining: 750,
    },
    allowed_sites: ["shutterstock", "freepik", "unsplash", "pexels"],
  },
  role: "user",
};

// Mock download history
export const mockDownloadHistory: DownloadHistoryEntry[] = [
  {
    from: "shutterstock",
    type: "photo",
    price: 5,
    date: "2024-01-15",
    file: "https://shutterstock.com/410883247",
  },
  {
    from: "freepik",
    type: "vector",
    price: 3,
    date: "2024-01-14",
    file: "https://freepik.com/987654321",
  },
  {
    from: "shutterstock",
    type: "video",
    price: 15,
    date: "2024-01-13",
    file: "https://shutterstock.com/2174049579",
  },
  {
    from: "freepik",
    type: "photo",
    price: 8,
    date: "2024-01-12",
    file: "https://freepik.com/111222333",
  },
  {
    from: "shutterstock",
    type: "photo",
    price: 12,
    date: "2024-01-11",
    file: "https://shutterstock.com/555666777",
  },
];

// Mock API responses
export const mockApiResponses = {
  // Login response
  login: (
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "test@example.com" && password === "password") {
          resolve({
            success: true,
            data: {
              access_token: "mock_access_token_12345",
              email: email,
              message: "Login successful",
            },
          });
        } else {
          resolve({
            success: false,
            error: {
              id: "invalid_credentials",
              message: "Invalid email or password",
            },
          });
        }
      }, 1000); // Simulate network delay
    });
  },

  // Register response
  register: (userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }): Promise<ApiResponse<RegisterResponse>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            access_token: "mock_access_token_12345",
            email: userData.email,
            message: "Registration successful",
          },
        });
      }, 1500);
    });
  },

  // Get user data response
  getUserData: (): Promise<ApiResponse<UserData>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockUser,
        });
      }, 500);
    });
  },

  // Get download history response
  getDownloadHistory: (): Promise<ApiResponse<DownloadHistoryResponse>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            success: true,
            downloads: mockDownloadHistory,
          },
        });
      }, 800);
    });
  },

  // Logout response
  logout: (): Promise<
    ApiResponse<{ access_token: string; message: string }>
  > => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            access_token: "",
            message: "Logout successful",
          },
        });
      }, 300);
    });
  },
};

// Helper function to check if mock data should be used
export function shouldUseMockData(): boolean {
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";
}

// Helper function to simulate network delay
export function simulateNetworkDelay(ms: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

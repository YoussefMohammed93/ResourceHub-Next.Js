// Mock data for development and testing
import {
  UserData,
  DownloadHistoryEntry,
  ApiResponse,
  LoginResponse,
  RegisterResponse,
  DownloadHistoryResponse,
} from "./api";

// Mock user data - Regular user
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

// Mock admin user data
export const mockAdminUser: UserData = {
  account: {
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    picture: "/placeholder.svg",
  },
  subscription: {
    plan: "Enterprise",
    active: true,
    until: "2025-12-31",
    credits: {
      plan: 10000,
      remaining: 9500,
    },
    allowed_sites: [
      "shutterstock",
      "freepik",
      "unsplash",
      "pexels",
      "adobe",
      "getty",
    ],
  },
  role: "admin",
};

// Mock download history
export const mockDownloadHistory: DownloadHistoryEntry[] = [
  {
    from: "freepik",
    type: "photo",
    price: 2,
    date: "2024-01-15",
    file: "/image-1.jpg", // Use local image that exists in public folder
    downloadUrl:
      "https://www.freepik.com/free-photo/side-view-hand-wearing-bracelet_31842933.htm",
  },
  {
    from: "freepik",
    type: "video",
    price: 5,
    date: "2024-01-14",
    file: "/image-2.webp", // Use local image for video preview
    downloadUrl:
      "https://www.freepik.com/free-video/close-up-cat-s-face-eyes_171159",
  },
  {
    from: "freepik",
    type: "vector",
    price: 3,
    date: "2024-01-13",
    file: "/freepik-1.jpg", // Keep this one as it exists
    downloadUrl:
      "https://www.freepik.com/free-vector/flat-design-spring-landscape-concept_6718313.htm",
  },
  {
    from: "freepik",
    type: "photo",
    price: 1,
    date: "2024-01-12",
    file: "/office.webp", // Add another local image
    downloadUrl:
      "https://www.freepik.com/free-photo/modern-office-space_12345678.htm",
  },
  {
    from: "freepik",
    type: "vector",
    price: 2,
    date: "2024-01-11",
    file: "/placeholder.png", // Add placeholder image
    downloadUrl:
      "https://www.freepik.com/free-vector/business-illustration_87654321.htm",
  },
];

// Mock API responses
// Test credentials:
// Regular user: test@example.com / password
// Admin user: admin@example.com / admin
export const mockApiResponses = {
  // Login response
  login: (
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          (email === "test@example.com" && password === "password") ||
          (email === "admin@example.com" && password === "admin")
        ) {
          // Store the current user email for mock data
          setCurrentMockUserEmail(email);

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
        // Check which user is currently logged in based on stored email
        const currentUserEmail = getCurrentMockUserEmail();
        const userData =
          currentUserEmail === "admin@example.com" ? mockAdminUser : mockUser;

        resolve({
          success: true,
          data: userData,
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
        // Clear the current user email for mock data
        clearCurrentMockUserEmail();

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
  // In production, never use mock data unless explicitly enabled
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";
  }

  // In development, use mock data by default unless explicitly disabled
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";
}

// Helper function to simulate network delay
export function simulateNetworkDelay(ms: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper functions to track current mock user
export function setCurrentMockUserEmail(email: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("mock_current_user_email", email);
  }
}

export function getCurrentMockUserEmail(): string {
  if (typeof window !== "undefined") {
    return (
      sessionStorage.getItem("mock_current_user_email") || "test@example.com"
    );
  }
  return "test@example.com";
}

export function clearCurrentMockUserEmail(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("mock_current_user_email");
  }
}

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const getApiBaseUrl = () => {
  // In production, use the production API URL
  if (process.env.NODE_ENV === "production") {
    if (process.env.NEXT_PUBLIC_PRODUCTION_API_URL) {
      return process.env.NEXT_PUBLIC_PRODUCTION_API_URL;
    }
  }

  // In development, use the configured proxy URL
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // Fallback to localhost
  return "http://localhost:3000/api/proxy";
};

const API_BASE_URL = getApiBaseUrl();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { downloadUrl } = body;

    if (!downloadUrl) {
      return NextResponse.json(
        { error: { message: "Download URL is required" } },
        { status: 400 }
      );
    }

    // Get the authorization token from the request headers
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        {
          error: {
            message:
              "Authentication required. Please log in to access this resource.",
            type: "authentication_required",
          },
        },
        { status: 401 }
      );
    }

    // Call the real backend API for download verification with proper authentication
    const apiClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(
      `[Download Verification] Calling backend API: ${API_BASE_URL}/v1/download/verify`
    );
    console.log(`[Download Verification] Request payload:`, { downloadUrl });

    const response = await apiClient.post("/v1/download/verify", {
      downloadUrl: downloadUrl,
    });

    console.log(`[Download Verification] Backend response:`, response.data);

    // Transform backend response to match frontend expectations
    const backendData = response.data;

    if (!backendData.success) {
      return NextResponse.json(
        {
          error: {
            message:
              backendData.error?.message || "Download verification failed",
          },
        },
        { status: 400 }
      );
    }

    // Map backend response structure to frontend expected structure
    const transformedResponse = {
      success: true,
      data: {
        is_supported: backendData.data?.is_supported || false,
        is_allowed: backendData.data?.is_allowed || false,
        can_afford: backendData.data?.can_afford || false,
        site: {
          name: backendData.data?.site?.name || "Unknown Site",
          icon: backendData.data?.site?.icon || "",
          pricing: backendData.data?.site?.pricing || "N/A",
          is_external: backendData.data?.site?.is_external || false,
        },
        subscription: {
          active: backendData.data?.subscription?.active || false,
          plan_name: backendData.data?.subscription?.plan_name || "Free Plan",
          credits_remaining:
            backendData.data?.subscription?.credits_remaining || 0,
          credits_total: backendData.data?.subscription?.credits_total || 0,
          validity_date: backendData.data?.subscription?.validity_date || "",
          allowed_sites: backendData.data?.subscription?.allowed_sites || [],
        },
        warnings: backendData.data?.warnings || [],
      },
    };

    return NextResponse.json(transformedResponse);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Download verification API error:", error);

    // Handle different types of errors
    if (error.response) {
      // Backend returned an error response
      console.error("Backend error response:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      return NextResponse.json(
        {
          error: {
            message:
              error.response.data?.error?.message || "Backend service error",
            details: error.response.data,
          },
        },
        { status: error.response.status || 500 }
      );
    } else if (error.request) {
      // Network error - backend not reachable
      console.error("Network error - backend not reachable:", error.message);

      return NextResponse.json(
        {
          error: {
            message:
              "Unable to connect to backend service. Please try again later.",
            type: "network_error",
          },
        },
        { status: 503 }
      );
    } else {
      // Other error
      console.error("Unexpected error:", error.message);

      return NextResponse.json(
        {
          error: {
            message: "An unexpected error occurred",
            type: "unknown_error",
          },
        },
        { status: 500 }
      );
    }
  }
}

import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const API_BASE_URL = "https://stockaty.virs.tech/v1";

// Simple in-memory cache for search responses to speed up repeat queries during a session
const searchCache = new Map<string, { data: unknown; expiresAt: number }>();
const SEARCH_CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes

// Define a type for the fallback data structure
interface FallbackData {
  data?: {
    query?: string;
    page?: string;
  };
  [key: string]: unknown;
}

// Load search.json as fallback data
let fallbackData: FallbackData | null = null;
try {
  const fallbackPath = join(process.cwd(), "search.json");
  fallbackData = JSON.parse(readFileSync(fallbackPath, "utf8")) as FallbackData;
} catch (error) {
  console.warn("Could not load search.json fallback data:", error);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") || "1";

  try {
    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    // Cache key
    const cacheKey = `${query}::${page}`;
    const now = Date.now();
    const cached = searchCache.get(cacheKey);
    if (cached && cached.expiresAt > now) {
      return NextResponse.json(cached.data, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=300",
        },
      });
    }

    // Make the request to the external API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(
      `${API_BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "ResourceHub-Search/1.0",
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Save in cache
    searchCache.set(cacheKey, { data, expiresAt: now + SEARCH_CACHE_TTL_MS });

    // Return the data with proper CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Search API proxy error:", error);

    // Try to use fallback data if available
    if (fallbackData) {
      console.log("Using fallback search.json data due to API error");

      // Modify fallback data to match the query and page
      const modifiedFallback = {
        ...fallbackData,
        data: {
          query: query || fallbackData.data?.query || "fallback",
          page: page || "1",
        },
      };

      return NextResponse.json(modifiedFallback, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // Handle different types of errors
    let errorMessage = "Failed to fetch search results";
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        errorMessage = "Search request timed out. Please try again.";
        statusCode = 408; // Request Timeout
      } else if (error.message.includes("fetch")) {
        errorMessage =
          "Unable to connect to search service. Please check your connection.";
        statusCode = 503; // Service Unavailable
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: statusCode }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

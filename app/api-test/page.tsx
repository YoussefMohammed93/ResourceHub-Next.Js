"use client";

import { ApiDebugPanel } from "@/components/api-debug";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Info, Server, Globe } from "lucide-react";

export default function ApiTestPage() {
  const apiBaseUrl =
    typeof window !== "undefined"
      ? process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PRODUCTION_API_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL
      : "Unknown";

  const environment = process.env.NODE_ENV;
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";
  const enableLogging = process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === "true";

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold">API Testing Dashboard</h1>
          <p className="text-muted-foreground">
            Test and debug API connectivity for the Resource Hub application
          </p>
        </div>

        {/* Environment Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Environment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Environment:</span>
                  <Badge
                    variant={
                      environment === "production" ? "default" : "secondary"
                    }
                  >
                    {environment}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mock Data:</span>
                  <Badge variant={useMockData ? "destructive" : "default"}>
                    {useMockData ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Logging:</span>
                  <Badge variant={enableLogging ? "default" : "secondary"}>
                    {enableLogging ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  <span className="text-sm font-medium">API Base URL:</span>
                </div>
                <div className="text-sm text-muted-foreground break-all">
                  {apiBaseUrl}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warnings */}
        {useMockData && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">
                  Warning: Mock Data is Enabled
                </span>
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                The application is using mock data instead of real API calls.
                Set NEXT_PUBLIC_USE_MOCK_DATA=false to test real API endpoints.
              </p>
            </CardContent>
          </Card>
        )}

        {environment === "production" && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-blue-800">
                <Globe className="w-5 h-5" />
                <span className="font-medium">
                  Production Environment Detected
                </span>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                You are testing in production. Make sure the API server at{" "}
                <code className="bg-blue-100 px-1 rounded">
                  {process.env.NEXT_PUBLIC_PRODUCTION_API_URL}
                </code>{" "}
                is accessible and configured for CORS.
              </p>
            </CardContent>
          </Card>
        )}

        {/* API Debug Panel */}
        <ApiDebugPanel />

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. Basic API Tests</h3>
              <p className="text-sm text-muted-foreground">
                Click &quot;Run API Tests&quot; to test all major endpoints.
                This will help identify connectivity issues, authentication
                problems, or response format mismatches.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">2. Authentication Required</h3>
              <p className="text-sm text-muted-foreground">
                Some endpoints require authentication. If you see authentication
                errors, try logging in through the main application first, then
                return to this page.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">3. CORS Issues</h3>
              <p className="text-sm text-muted-foreground">
                If you see CORS errors in production, ensure the API server is
                configured to allow requests from your domain. Check the browser
                console for detailed error messages.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">4. Response Format</h3>
              <p className="text-sm text-muted-foreground">
                The tests verify that API responses match the expected format
                from the Swagger documentation. Any format mismatches will be
                highlighted in the results.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

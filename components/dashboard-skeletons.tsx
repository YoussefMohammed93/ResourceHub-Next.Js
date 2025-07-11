import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Dashboard Header Skeleton
export function DashboardHeaderSkeleton() {
  return (
    <header className="bg-background border-b border-border px-4 sm:px-5 py-4 lg:ml-72">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile Hamburger Menu */}
          <div className="cursor-pointer lg:hidden p-2 hover:bg-muted rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center">
            <Skeleton className="w-5 h-5" />
          </div>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
          </div>
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </header>
  );
}

// Stats Cards Skeleton
export function DashboardStatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {Array.from({ length: 3 }, (_, i) => (
        <Card key={i} className="group dark:bg-muted/50">
          <CardContent>
            <div className="flex items-start justify-between">
              <div className="space-y-3 sm:space-y-4 flex-1">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Users Management Table Skeleton
export function DashboardUsersTableSkeleton() {
  return (
    <Card className="dark:bg-muted/50">
      <CardHeader className="w-full flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="w-full max-w-lg">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-1" />
        </div>
        <div className="w-full flex flex-col sm:flex-row items-stretch md:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <Skeleton className="h-10 w-full md:w-64" />
          <Skeleton className="h-10 w-full md:w-48" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto max-h-[278px] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {Array.from({ length: 5 }, (_, i) => (
                  <th key={i} className="text-left py-4 px-6">
                    <Skeleton className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Array.from({ length: 5 }, (_, i) => (
                <tr
                  key={i}
                  className="hover:bg-muted/50 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="min-w-0 flex-1 space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </td>
                  <td className="py-4 px-6">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="py-4 px-6">
                    <Skeleton className="h-8 w-20" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3 max-h-[400px] overflow-y-auto">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-3 space-y-4"
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }, (_, j) => (
                  <div key={j} className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-border">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
        {/* Table Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-border space-y-3 sm:space-y-0">
          <Skeleton className="h-4 w-48" />
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Bottom Section Cards Skeleton (Add Subscription, Credit Analytics, Extend Subscription)
export function DashboardBottomCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
      {Array.from({ length: 3 }, (_, i) => (
        <Card key={i} className="dark:bg-muted/50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Form fields skeleton */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            {/* Special content for Credit Analytics card */}
            {i === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }, (_, j) => (
                    <div key={j} className="text-center p-4 rounded-xl border">
                      <Skeleton className="h-8 w-12 mx-auto mb-2" />
                      <Skeleton className="h-3 w-16 mx-auto" />
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Button skeleton */}
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Complete Dashboard Skeleton
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <DashboardHeaderSkeleton />
      <div className="flex">
        {/* Sidebar placeholder */}
        <div className="hidden lg:block w-72 h-screen bg-background border-r border-border fixed left-0 top-0">
          <div className="p-4 space-y-4">
            <Skeleton className="h-8 w-32" />
            <div className="space-y-2">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-4 sm:p-5 space-y-4 sm:space-y-5 bg-secondary/50">
          <DashboardStatsCardsSkeleton />
          <DashboardUsersTableSkeleton />
          <DashboardBottomCardsSkeleton />
        </main>
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

// Header Skeleton
export function HeaderSkeleton() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-5">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Menu Button */}
            <div className="cursor-pointer md:hidden p-2 hover:bg-muted rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center">
              <Skeleton className="w-5 h-5" />
            </div>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
            </div>
            <Skeleton className="h-6 w-32" />
          </div>
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-28" />
          </nav>
          {/* User Dropdown */}
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </header>
  );
}

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/20 via-primary/5 to-primary/20 py-12 md:pb-20 md:pt-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-35 dark:opacity-100"></div>

      <div className="w-full container mx-auto max-w-7xl px-4 sm:px-5 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[85vh] sm:min-h-[80vh] text-center space-y-6 sm:space-y-8 lg:space-y-12 py-8 sm:py-0">
          {/* Centered Content */}
          <div className="space-y-4 sm:space-y-6 max-w-4xl px-4 sm:px-0 w-full">
            {/* Heading Skeleton - matches h1 structure with better visibility */}
            <div className="space-y-3">
              <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-16 xl:h-20 w-full max-w-3xl mx-auto bg-white dark:bg-accent border border-border/20" />
            </div>
            {/* Paragraph Skeleton - matches p structure with better visibility */}
            <div className="space-y-2 mt-4 sm:mt-6">
              <Skeleton className="h-4 sm:h-5 md:h-6 lg:h-7 w-full max-w-3xl mx-auto bg-white dark:bg-accent/80 border border-border/15" />
              <Skeleton className="h-4 sm:h-5 md:h-6 lg:h-7 w-5/6 max-w-2xl mx-auto bg-white dark:bg-accent/80 border border-border/15" />
              <Skeleton className="h-4 sm:h-5 md:h-6 lg:h-7 w-4/5 max-w-xl mx-auto bg-white dark:bg-accent/80 border border-border/15" />
            </div>
          </div>

          {/* Centered Search Bar */}
          <div className="w-full max-w-4xl px-4 sm:px-0">
            {/* Mobile Layout */}
            <div className="sm:hidden space-y-4">
              {/* Search Type Dropdown for Mobile */}
              <Skeleton className="h-14 w-full rounded-xl bg-white dark:bg-accent/80" />
              {/* Search Input */}
              <Skeleton className="h-16 w-full rounded-xl bg-white dark:bg-accent/80" />
              {/* Action Buttons */}
              <div className="flex gap-3">
                <Skeleton className="h-14 flex-1 rounded-xl bg-white dark:bg-accent/80" />
                <Skeleton className="h-14 w-24 rounded-xl bg-white dark:bg-accent/80" />
              </div>
            </div>
            {/* Desktop Layout */}
            <div className="hidden sm:block">
              <div className="flex items-center gap-5">
                <Skeleton className="h-16 w-full rounded-xl bg-white dark:bg-accent/80" />
                <Skeleton className="h-16 w-24 rounded-xl bg-white dark:bg-accent/80" />
              </div>
            </div>
          </div>

          {/* Popular Searches - Centered */}
          <div className="space-y-4 max-w-4xl px-4 sm:px-0">
            <Skeleton className="h-4 sm:h-5 w-32 mx-auto bg-white dark:bg-accent/80" />
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton
                  key={i}
                  className="h-8 sm:h-10 w-20 sm:w-24 rounded-full bg-white dark:bg-accent/80"
                />
              ))}
            </div>
          </div>

          {/* CTA Buttons - Centered */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0 w-full max-w-md sm:max-w-none">
            <Skeleton className="h-12 sm:h-14 w-full sm:w-40 rounded-xl bg-white dark:bg-accent/80" />
            <Skeleton className="h-12 sm:h-14 w-full sm:w-36 rounded-xl bg-white dark:bg-accent/80" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section Skeleton
export function FeaturesSkeleton() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-secondary via-secondary/50 to-secondary relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-5 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="space-y-4">
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-3/4 max-w-xl mx-auto" />
          </div>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 lg:p-8"
            >
              <div className="space-y-6">
                {/* Icon */}
                <Skeleton className="w-14 h-14 rounded-2xl" />
                {/* Content */}
                <div className="space-y-3">
                  <Skeleton className="h-7 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Supported Platforms Section Skeleton
export function SupportedPlatformsSkeleton() {
  return (
    <section className="py-16 lg:py-20 lg:pb-28 bg-gradient-to-br from-secondary via-secondary/50 to-secondary relative overflow-hidden">
      <div className="px-5 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="space-y-4">
            <Skeleton className="h-12 w-80 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
        </div>
        {/* Platforms Grid - Modern Card Design */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-5 max-w-[1400px] mx-auto">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="bg-card shadow-xs dark:bg-muted backdrop-blur-sm border border-border/30 rounded-xl"
            >
              <div className="flex items-center justify-center gap-2 p-2">
                <Skeleton className="w-8 h-8 rounded hidden md:block" />
                <Skeleton className="w-[90px] h-8 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Categories Section Skeleton
export function CategoriesSkeleton() {
  return (
    <section className="py-12 pb-16 bg-gradient-to-br from-secondary/10 via-secondary/20 to-secondary/10 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <div className="space-y-4">
            <Skeleton className="h-12 w-80 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-3/4 max-w-xl mx-auto" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="bg-background/50 border border-border/50 rounded-2xl p-6 dark:bg-muted/20"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Category icon */}
                <Skeleton className="w-14 h-14 rounded-xl" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section Skeleton
export function PricingSkeleton() {
  return (
    <section className="py-16 bg-gradient-to-br from-secondary via-secondary/50 to-secondary relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-5 relative z-10">
        <div className="text-center mb-12">
          <div className="space-y-4">
            <Skeleton className="h-12 w-72 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-3/4 max-w-xl mx-auto" />
          </div>
        </div>
        <div className="grid mx-auto max-w-[1700px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="bg-background dark:bg-muted/20 border border-border/50 rounded-2xl p-6 lg:p-8"
            >
              <div className="space-y-6">
                {/* Plan Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
                {/* Plan Features */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    {Array.from({ length: 4 }, (_, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-between"
                      >
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border">
                    <Skeleton className="h-5 w-32 mb-3" />
                    <div className="space-y-2">
                      {Array.from({ length: 5 }, (_, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Skeleton className="w-4 h-4 rounded-sm" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* CTA Button */}
                <div className="mt-auto pt-4">
                  <Skeleton className="w-full h-12 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer Skeleton
export function FooterSkeleton() {
  return (
    <footer className="bg-foreground dark:bg-muted py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-24 bg-background/20" />
              <div className="space-y-2">
                {Array.from({ length: 4 }, (_, j) => (
                  <Skeleton key={j} className="h-4 w-full bg-background/20" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Skeleton className="h-4 w-48 bg-background/20" />
            <div className="flex gap-4">
              {Array.from({ length: 3 }, (_, i) => (
                <Skeleton
                  key={i}
                  className="w-8 h-8 rounded bg-background/20"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// FAQ Section Skeleton
export function FAQSkeleton() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-35 dark:opacity-100"></div>
      <div className="container mx-auto max-w-4xl px-4 sm:px-5 relative z-10">
        {/* Section Header Skeleton */}
        <div className="text-center mb-12 lg:mb-16">
          <Skeleton className="h-12 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* FAQ Items Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6"
            >
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  X,
  Search,
  Heart,
  Share2,
  Download,
  ChevronLeft,
  ChevronRight,
  Menu,
  ImageIcon,
  File,
  Eye,
  ShoppingCart,
  Shield,
  Sparkles,
  Crown,
  Users,
  Star,
  Zap,
  Camera,
  Palette,
  AlertCircle,
  WifiOff,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/components/i18n-provider";
import { HeaderControls } from "@/components/header-controls";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type definitions
interface Provider {
  id: string;
  name: string;
  logo: string;
  count: number;
  isOnline: boolean;
}

interface SearchResult {
  id: number;
  title: string;
  thumbnail: string;
  provider: Provider;
  type: string;
  width: number;
  height: number;
  isFavorite: boolean;
  isPremium: boolean;
  creditRequired: number;
  imageId: string;
  resolution: string;
  fullImageUrl: string;
}

// Mock data for providers
const providers = [
  {
    id: "shutterstock",
    name: "Shutterstock",
    logo: "/adobe.jpg",
    count: 1250,
    isOnline: true,
  },
  {
    id: "vexels",
    name: "Vexels",
    logo: "/nexus.png",
    count: 750,
    isOnline: false,
  },
  {
    id: "freepik",
    name: "Freepik",
    logo: "/shutterstock.png",
    count: 980,
    isOnline: true,
  },
  {
    id: "vectory",
    name: "Vectory",
    logo: "/freepik.webp",
    count: 620,
    isOnline: true,
  },
  { id: "ui8", name: "UI8", logo: "/raw.png", count: 450, isOnline: false },
  {
    id: "rawpixel",
    name: "RawPixel",
    logo: "/shutterstock.png",
    count: 320,
    isOnline: true,
  },
  {
    id: "pngtree1",
    name: "PNGTree",
    logo: "/freepik.webp",
    count: 380,
    isOnline: true,
  },
  {
    id: "pngtree2",
    name: "PNGTree",
    logo: "/freepik.webp",
    count: 380,
    isOnline: true,
  },
  {
    id: "pngtree3",
    name: "PNGTree",
    logo: "/freepik.webp",
    count: 380,
    isOnline: true,
  },
  {
    id: "adobestock",
    name: "Adobe Stock",
    logo: "/nexus.png",
    count: 280,
    isOnline: false,
  },
];

// Mock data for file types
const fileTypes = [
  { id: "photos", count: 2450 },
  { id: "vectors", count: 1890 },
  { id: "illustrations", count: 1200 },
  { id: "icons", count: 950 },
  { id: "templates", count: 680 },
];

// Mock data for search results
const generateMockResults = (query: string): SearchResult[] => {
  const results: SearchResult[] = [];
  for (let i = 1; i <= 24; i++) {
    results.push({
      id: i,
      title: `${query || "Sample"} Image ${i}`,
      thumbnail: "/placeholder.png",
      provider: providers[Math.floor(Math.random() * providers.length)],
      type: fileTypes[Math.floor(Math.random() * fileTypes.length)].id,
      width: Math.floor(Math.random() * 400) + 200,
      height: Math.floor(Math.random() * 400) + 200,
      isFavorite: Math.random() > 0.8,
      isPremium: Math.random() > 0.7,
      creditRequired: Math.floor(Math.random() * 3) + 1,
      imageId: `#${17486346 + i}`,
      resolution: "300 dpi",
      fullImageUrl: "/image-1.jpg", // In real app, this would be the full resolution image
    });
  }
  return results;
};

// Mock suggestions
const suggestions = [
  "Radiant hologram",
  "Luminous dimension",
  "Shimmering illusion",
  "Luminous depth",
];

// Search content component that uses useSearchParams
function SearchContent() {
  const { t } = useTranslation("common");
  const { isRTL, isLoading } = useLanguage();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<SearchResult | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isFullImageDialogOpen, setIsFullImageDialogOpen] = useState(false);

  const resultsPerPage = 24;
  const mockResults = generateMockResults(searchQuery);
  const totalResults = 1247; // Mock total
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Update URL without page reload
      const url = new URL(window.location.href);
      url.searchParams.set("q", searchQuery);
      window.history.pushState({}, "", url.toString());
    }
  };

  const toggleProvider = (providerId: string) => {
    setSelectedProviders((prev) =>
      prev.includes(providerId)
        ? prev.filter((id) => id !== providerId)
        : [...prev, providerId]
    );
  };

  const toggleFileType = (typeId: string) => {
    setSelectedFileTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const getImageFlex = (index: number) => {
    // Create varied flex values for different widths (flex-grow values)
    const flexValues = [1.2, 1.6, 1.4, 2.0, 1.1, 1.8, 1.3, 1.5, 1.7, 1.45];
    return flexValues[index % flexValues.length];
  };

  const handleImageClick = (result: SearchResult) => {
    setSelectedImage(result);
    setIsImageDialogOpen(true);
  };

  // Show loading skeleton while language data is loading
  if (isLoading) {
    return (
      <div
        className={`min-h-screen bg-background font-sans ${isRTL ? "font-tajawal" : ""}`}
      >
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="px-4 sm:px-5 mx-auto max-w-[1600px] search-container-3xl">
            <div className="flex items-center justify-between h-16">
              <div
                className={`flex items-center gap-1 sm:gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {/* Mobile menu button skeleton */}
                <Skeleton className="w-8 h-8 rounded-lg lg:hidden" />
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="w-32 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="w-8 h-8 rounded-lg" />
              </div>
            </div>
          </div>
        </header>

        <div className="relative dark:bg-secondary">
          {/* Sidebar - Fixed position always */}
          <aside
            className={`
            fixed ${isRTL ? "right-0 !border-l" : "left-0 !border-r"} top-16 w-96 sidebar-3xl h-[calc(100vh-4rem)] bg-gradient-to-br from-primary/50 via-primary/20 to-primary/65 backdrop-blur-sm border-border z-50 transition-transform duration-300 ease-in-out overflow-y-auto shadow-lg lg:shadow-none lg:border-r lg:border-l-0
            ${isRTL ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
          >
            <div className="p-0 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto bg-gradient-to-b from-background/80 via-background/60 to-background/80 backdrop-blur-sm">
              {/* Providers Filter Skeleton */}
              <div className="space-y-4 p-4 bg-muted/40 dark:bg-card/30 border-b border-border">
                <div
                  className={`flex items-center gap-3 ${isRTL ? "flex-row" : ""}`}
                >
                  <Skeleton className="w-9 h-9 rounded-lg" />
                  <Skeleton className="w-24 h-5" />
                  <Skeleton className="w-4 h-4 ml-auto" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-16 rounded-lg" />
                  ))}
                </div>
              </div>

              {/* File Type Filter Skeleton */}
              <div className="space-y-4 p-4 bg-muted/40 dark:bg-card/30">
                <div
                  className={`flex items-center gap-3 ${isRTL ? "flex-row" : ""}`}
                >
                  <Skeleton className="w-9 h-9 rounded-lg" />
                  <Skeleton className="w-20 h-5" />
                  <Skeleton className="w-4 h-4 ml-auto" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="w-16 h-8 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - 9 columns on desktop, full width on mobile */}
          <main
            className={`relative col-span-12 lg:col-span-9 min-w-0 bg-gradient-to-br from-primary/15 via-primary/5 to-primary/20 overflow-hidden ${isRTL ? "lg:mr-96 main-content-3xl rtl" : "lg:ml-96 main-content-3xl"}`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-35 dark:opacity-80"></div>

            {/* Floating Decorative Elements - Skeleton versions */}
            <div
              className={`absolute top-20 ${isRTL ? "right-5/12" : "left-5/12"} transform -translate-x-1/2 md:top-32`}
            >
              <Skeleton className="w-[120px] h-[120px] rounded-lg opacity-30" />
            </div>

            <div
              className={`hidden md:block absolute top-1/3 ${isRTL ? "left-4 md:left-8" : "right-4 md:right-8"}`}
            >
              <Skeleton className="w-[100px] h-[120px] rounded-lg opacity-40" />
            </div>

            <div
              className={`absolute bottom-32 ${isRTL ? "left-1/4" : "right-1/4"} transform translate-x-1/2`}
            >
              <Skeleton className="w-[80px] h-[80px] rounded-lg opacity-25" />
            </div>

            <div
              className={`hidden lg:block absolute top-16 ${isRTL ? "left-1/4" : "right-1/4"}`}
            >
              <Skeleton className="w-[60px] h-[60px] rounded-lg opacity-35" />
            </div>

            {/* Floating Icon Skeletons */}
            <div
              className={`hidden md:block absolute top-8 ${isRTL ? "left-1/3 md:left-2/12" : "right-1/3 md:right-2/5"} md:top-12`}
            >
              <Skeleton className="w-10 h-10 rounded-lg" />
            </div>

            <div
              className={`hidden sm:block absolute top-32 ${isRTL ? "right-20" : "left-20"}`}
            >
              <Skeleton className="w-10 h-10 rounded-lg" />
            </div>

            <div
              className={`hidden md:block absolute top-64 ${isRTL ? "left-32" : "right-32"}`}
            >
              <Skeleton className="w-12 h-12 rounded-lg" />
            </div>

            <div
              className={`hidden sm:block absolute bottom-40 ${isRTL ? "right-32" : "left-32"}`}
            >
              <Skeleton className="w-9 h-9 rounded-lg" />
            </div>

            <div
              className={`hidden lg:block absolute top-1/2 ${isRTL ? "right-16" : "left-16"} transform -translate-y-1/2`}
            >
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>

            <div
              className={`hidden md:block absolute top-1/3 ${isRTL ? "right-1/2" : "left-1/2"} transform -translate-x-1/2`}
            >
              <Skeleton className="w-10 h-10 rounded-lg" />
            </div>

            <div
              className={`hidden md:block absolute top-40 ${isRTL ? "left-16" : "right-16"}`}
            >
              <Skeleton className="w-11 h-11 rounded-lg" />
            </div>

            <div
              className={`hidden sm:block absolute bottom-20 ${isRTL ? "left-1/4" : "right-1/4"}`}
            >
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>

            <div
              className={`hidden lg:block absolute bottom-32 ${isRTL ? "right-1/3" : "left-1/3"}`}
            >
              <Skeleton className="w-9 h-9 rounded-lg" />
            </div>

            <div
              className={`hidden md:block absolute top-2 ${isRTL ? "right-5/8" : "left-5/8"}`}
            >
              <Skeleton className="w-10 h-10 rounded-lg" />
            </div>

            <div className="relative z-10 p-4 sm:p-6 space-y-6">
              <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center max-w-3xl mx-auto search-container-3xl search-section-3xl">
                {/* Search Bar - Centered */}
                <div className="flex justify-center w-full sm:w-3/4">
                  <div className="w-full max-w-2xl search-bar-3xl">
                    <Skeleton className="w-full h-14 rounded-xl" />
                  </div>
                </div>

                {/* Filter Section Behind Search Bar */}
                <div className="flex justify-center w-full sm:w-1/4">
                  <div className="w-full max-w-md">
                    <Skeleton className="w-full h-14 rounded-xl" />
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                {/* Platforms Grid Skeleton - Modern Card Design */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-7 platforms-grid-3xl gap-1 sm:gap-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="w-full h-[45px] rounded-xl platform-card"
                    />
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div
                className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center ${isRTL ? "space-x-reverse sm:space-x-3" : "space-x-3"}`}
              >
                <Skeleton className="w-24 h-4" />
                <div className="grid place-content-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-fit">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="w-20 h-10 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Search Results Count */}
              <div className="text-center space-y-2">
                <Skeleton className="w-64 h-6 mx-auto" />
                <Skeleton className="w-80 h-4 mx-auto" />
              </div>

              {/* Results Grid - Mobile: Grid (1 item per row), SM+: Flex with varied widths */}
              <div className="space-y-4 results-grid-3xl">
                {/* Mobile Layout - Grid with 1 column */}
                <div className="grid grid-cols-1 gap-4 sm:hidden">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-64 rounded-lg" />
                  ))}
                </div>

                {/* Desktop Layout - Flex with varied widths */}
                <div className="hidden sm:flex sm:flex-col sm:w-full">
                  {Array.from({ length: 3 }).map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex gap-2 sm:gap-4 justify-center flex-wrap mb-4"
                    >
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton
                          key={i}
                          className="rounded-lg"
                          style={{
                            flex: `${1.2 + i * 0.2} 1 0`,
                            height: "250px",
                            minWidth: "150px",
                            maxWidth: "400px",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Pagination Skeleton */}
              <div className="flex justify-center pt-8">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl" />
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl"
                      />
                    ))}
                  </div>
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-background font-sans ${isRTL ? "font-tajawal" : ""}`}
    >
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="px-4 sm:px-5 mx-auto max-w-[1600px] search-container-3xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div
              className={`flex items-center gap-1 sm:gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {/* Mobile Sidebar Toggle */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="cursor-pointer lg:hidden p-2 hover:bg-muted rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label={t("search.toggleFilters")}
              >
                <Menu className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
              </div>
              <Link
                href="/"
                className="text-base sm:text-xl font-semibold text-foreground"
              >
                {t("header.logo")}
              </Link>
            </div>
            <HeaderControls />
          </div>
        </div>
      </header>

      <div className="relative dark:bg-secondary">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Filters - Fixed position always */}
        <aside
          className={`
          fixed ${isRTL ? "right-0 !border-l" : "left-0 !border-r"} top-16 w-96 sidebar-3xl h-[calc(100vh-4rem)] bg-gradient-to-br from-primary/50 via-primary/20 to-primary/65 backdrop-blur-sm border-border z-50 transition-transform duration-300 ease-in-out overflow-y-auto shadow-lg lg:shadow-none lg:border-r lg:border-l-0
          ${isSidebarOpen ? "translate-x-0" : `${isRTL ? "translate-x-full" : "-translate-x-full"} lg:translate-x-0`}
        `}
        >
          <div className="p-0 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto bg-gradient-to-b from-background/80 via-background/60 to-background/80 backdrop-blur-sm">
            {/* Mobile Close Button */}
            <div
              className={`lg:hidden flex justify-between items-center mb-4 p-4 bg-muted/50 rounded-lg border border-border ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <h2 className="text-lg font-semibold text-foreground">
                {t("search.filters.title")}
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Providers Filter */}
            <div className="space-y-4 p-4 bg-muted/40 dark:bg-card/30 border-b border-border">
              <div
                className={`flex items-center gap-3 ${isRTL ? "flex-row" : ""}`}
              >
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/10">
                  <ImageIcon className="size-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">
                  {t("search.filters.providers")}
                </h3>
                <button
                  className={`${isRTL ? "mr-auto" : "ml-auto"} p-1 hover:bg-secondary rounded transition-colors`}
                >
                  <ChevronRight
                    className={`w-4 h-4 text-muted-foreground hover:text-foreground ${isRTL ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    onClick={() =>
                      provider.isOnline && toggleProvider(provider.id)
                    }
                    className={`
                      w-full p-3 rounded-lg border group dark:bg-muted/35 relative
                      ${
                        !provider.isOnline
                          ? "opacity-60 cursor-not-allowed border-border bg-muted/30"
                          : selectedProviders.includes(provider.id)
                            ? "border-primary bg-primary/10 shadow-sm cursor-pointer"
                            : "border-border hover:border-primary/50 bg-background hover:bg-muted/50 cursor-pointer"
                      }
                    `}
                  >
                    {/* Status Indicator */}
                    <div
                      className={`absolute top-2 ${isRTL ? "left-2" : "right-2"} z-10`}
                    >
                      {provider.isOnline ? (
                        <div
                          className="w-3 h-3 bg-green-500 rounded-full border-2 border-background shadow-sm"
                          title={t("search.status.online")}
                        />
                      ) : (
                        <div
                          className="w-3 h-3 bg-red-500 rounded-full border-2 border-background shadow-sm"
                          title={t("search.status.offline")}
                        />
                      )}
                    </div>

                    <div
                      className={`relative ${!provider.isOnline ? "grayscale" : ""}`}
                    >
                      <Image
                        src={provider.logo}
                        alt={provider.name}
                        width={150}
                        height={56}
                        className={`w-full h-14 rounded object-cover transition-opacity ${
                          provider.isOnline ? "group-hover:opacity-90" : ""
                        }`}
                      />

                      {/* Offline Overlay */}
                      {!provider.isOnline && (
                        <div className="absolute inset-0 bg-black/20 rounded flex items-center justify-center">
                          <WifiOff className="w-6 h-6 text-red-500" />
                        </div>
                      )}
                    </div>

                    <div
                      className={`mt-2 text-sm text-center transition-colors ${
                        !provider.isOnline
                          ? "text-muted-foreground/60"
                          : selectedProviders.includes(provider.id)
                            ? "text-primary hover:text-primary"
                            : "text-muted-foreground group-hover:text-primary"
                      }`}
                    >
                      {provider.count} {t("search.filters.items")}
                      {!provider.isOnline && (
                        <div className="text-xs text-red-500 mt-1">
                          {t("search.status.offline")}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* File Type Filter */}
            <div className="space-y-4 p-4 bg-muted/40 dark:bg-card/30">
              <div
                className={`flex items-center gap-3 ${isRTL ? "flex-row" : ""}`}
              >
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/10">
                  <File className="size-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">
                  {t("search.filters.fileType")}
                </h3>
                <button
                  className={`${isRTL ? "mr-auto" : "ml-auto"} p-1 hover:bg-secondary rounded transition-colors`}
                >
                  <ChevronRight
                    className={`w-4 h-4 text-muted-foreground hover:text-foreground ${isRTL ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={
                    selectedFileTypes.length === 0 ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedFileTypes([])}
                  className="text-sm sm:text-lg font-medium px-5 !h-10"
                >
                  {t("search.filters.all")}
                </Button>
                {fileTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={
                      selectedFileTypes.includes(type.id)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => toggleFileType(type.id)}
                    className="text-sm sm:text-lg font-medium relative group px-5 !h-10"
                  >
                    {t(`search.fileTypes.${type.id}`)},
                    <span className="pl-1 text-[11px] sm:text-base">
                      {type.count} {t("search.filters.items")}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - 9 columns on desktop, full width on mobile */}
        <main
          className={`relative col-span-12 lg:col-span-9 min-w-0 bg-gradient-to-br from-primary/15 via-primary/5 to-primary/20 overflow-hidden ${isRTL ? "lg:mr-96 main-content-3xl rtl" : "lg:ml-96 main-content-3xl"}`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-35 dark:opacity-80"></div>

          {/* Floating Decorative Elements */}
          {/* Shape 1 - Grid Dots Pattern (Top Left) */}
          <div
            className={`absolute top-20 ${isRTL ? "right-5/12" : "left-5/12"} transform -translate-x-1/2 md:top-32`}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              className="text-primary/30"
            >
              {Array.from({ length: 6 }, (_, row) =>
                Array.from({ length: 6 }, (_, col) => (
                  <circle
                    key={`dot-${row}-${col}`}
                    cx={10 + col * 18}
                    cy={10 + row * 18}
                    r="2"
                    fill="currentColor"
                    className="animate-pulse-slow"
                    style={{
                      animationDelay: `${(row + col) * 0.1}s`,
                      opacity: Math.random() * 0.6 + 0.3,
                    }}
                  />
                ))
              )}
            </svg>
          </div>

          {/* Shape 2 - Square Grid Pattern (Right Side) */}
          <div
            className={`hidden md:block absolute top-1/3 ${isRTL ? "left-4 md:left-8" : "right-4 md:right-8"}`}
          >
            <svg
              width="100"
              height="120"
              viewBox="0 0 100 120"
              fill="none"
              className="text-primary/40"
            >
              {Array.from({ length: 8 }, (_, row) =>
                Array.from({ length: 8 }, (_, col) => (
                  <rect
                    key={`square-${row}-${col}`}
                    x={8 + col * 16}
                    y={8 + row * 14}
                    width="3"
                    height="3"
                    fill="currentColor"
                    className="animate-pulse-slow"
                    style={{
                      animationDelay: `${(row + col) * 0.08}s`,
                      opacity: Math.random() * 0.5 + 0.25,
                    }}
                  />
                ))
              )}
            </svg>
          </div>

          {/* Shape 3 - Circle Pattern (Bottom) */}
          <div
            className={`absolute bottom-32 ${isRTL ? "left-1/4" : "right-1/4"} transform translate-x-1/2`}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              className="text-primary/25"
            >
              {Array.from({ length: 5 }, (_, row) =>
                Array.from({ length: 5 }, (_, col) => (
                  <circle
                    key={`circle-${row}-${col}`}
                    cx={8 + col * 16}
                    cy={8 + row * 16}
                    r="1.5"
                    fill="currentColor"
                    className="animate-pulse-slow"
                    style={{
                      animationDelay: `${(row + col) * 0.15}s`,
                      opacity: Math.random() * 0.4 + 0.2,
                    }}
                  />
                ))
              )}
            </svg>
          </div>

          {/* Shape 4 - Diamond Pattern (Top Right) */}
          <div
            className={`hidden lg:block absolute top-16 ${isRTL ? "left-1/4" : "right-1/4"}`}
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              className="text-primary/35"
            >
              {Array.from({ length: 4 }, (_, row) =>
                Array.from({ length: 4 }, (_, col) => (
                  <polygon
                    key={`diamond-${row}-${col}`}
                    points={`${8 + col * 14},${5 + row * 14} ${11 + col * 14},${8 + row * 14} ${8 + col * 14},${11 + row * 14} ${5 + col * 14},${8 + row * 14}`}
                    fill="currentColor"
                    className="animate-pulse-slow"
                    style={{
                      animationDelay: `${(row + col) * 0.12}s`,
                      opacity: Math.random() * 0.5 + 0.3,
                    }}
                  />
                ))
              )}
            </svg>
          </div>

          {/* Floating Icon 1 - Top Right */}
          <div
            className={`hidden md:block absolute top-8 ${isRTL ? "left-1/3 md:left-2/12" : "right-1/3 md:right-2/5"} md:top-12`}
          >
            <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center animate-float">
              <Shield className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Floating Icon 2 - Top Left */}
          <div
            className={`hidden sm:block absolute top-32 ${isRTL ? "right-20" : "left-20"} animate-float-delayed`}
          >
            <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Floating Icon 3 - Middle Right */}
          <div
            className={`hidden md:block absolute top-64 ${isRTL ? "left-32" : "right-32"} animate-float`}
          >
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Floating Icon 4 - Bottom Left */}
          <div
            className={`hidden sm:block absolute bottom-40 ${isRTL ? "right-32" : "left-32"} animate-float-delayed`}
          >
            <div className="w-9 h-9 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-primary" />
            </div>
          </div>

          {/* Floating Icon 5 - Center Left */}
          <div
            className={`hidden lg:block absolute top-1/2 ${isRTL ? "right-16" : "left-16"} transform -translate-y-1/2 animate-float`}
          >
            <div className="w-8 h-8 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-primary" />
            </div>
          </div>

          {/* Floating Icon 6 - Middle Center */}
          <div
            className={`hidden md:block absolute top-1/3 ${isRTL ? "right-1/2" : "left-1/2"} transform -translate-x-1/2 animate-float-delayed`}
          >
            <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Floating Icon 7 - Top Right Corner */}
          <div
            className={`hidden md:block absolute top-40 ${isRTL ? "left-16" : "right-16"} animate-float-delayed`}
          >
            <div className="w-11 h-11 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Floating Icon 8 - Bottom Right */}
          <div
            className={`hidden sm:block absolute bottom-20 ${isRTL ? "left-1/4" : "right-1/4"} animate-float`}
          >
            <div className="w-8 h-8 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
          </div>

          {/* Floating Icon 9 - Bottom Center */}
          <div
            className={`hidden lg:block absolute bottom-32 ${isRTL ? "right-1/3" : "left-1/3"} animate-float-delayed`}
          >
            <div className="w-9 h-9 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
              <Palette className="w-4 h-4 text-primary" />
            </div>
          </div>

          {/* Floating Icon 10 - Top Center */}
          <div
            className={`hidden md:block absolute top-2 ${isRTL ? "right-5/8" : "left-5/8"} animate-float`}
          >
            <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
          </div>

          <div className="relative z-10 p-4 sm:p-6 space-y-6">
            <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center max-w-3xl mx-auto search-container-3xl search-section-3xl">
              {/* Search Bar - Centered */}
              <div className="flex justify-center w-full sm:w-3/4">
                <div className="w-full max-w-2xl search-bar-3xl">
                  <div className="relative">
                    <Search
                      className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5`}
                    />
                    <Input
                      type="text"
                      placeholder={t("search.searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className={`${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"} placeholder:text-base py-3 !h-14 text-base border-2 border-border focus:border-primary rounded-xl bg-background`}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    <Button
                      onClick={handleSearch}
                      className={`absolute ${isRTL ? "left-0.5" : "right-0.5"} top-1/2 transform -translate-y-1/2 !px-6 h-[52px] bg-primary hover:bg-primary/90 rounded-xl`}
                    >
                      <span>{t("search.searchButton")}</span>
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filter Section Behind Search Bar */}
              <div className="flex justify-center w-full sm:w-1/4">
                <div className="w-full max-w-md">
                  <Select
                    value={selectedFilter}
                    onValueChange={setSelectedFilter}
                  >
                    <SelectTrigger className="w-full !h-14 bg-background/80 rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-200">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          <span>All Content</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="images">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          <span>Images</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="vectors">
                        <div className="flex items-center gap-2">
                          <Palette className="w-4 h-4" />
                          <span>Vectors</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="videos">
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          <span>Videos</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="templates">
                        <div className="flex items-center gap-2">
                          <File className="w-4 h-4" />
                          <span>Templates</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="icons">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          <span>Icons</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              {/* Platforms Grid - Modern Card Design */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-7 platforms-grid-3xl gap-1 sm:gap-2">
                {/* Freepik Card 1 */}
                <div className="flex items-center justify-center group relative bg-card shadow-xs dark:bg-muted backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:scale-105 platform-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-fit flex items-center justify-center gap-2">
                    <Image
                      src="/freepik-small.png"
                      alt={t("supportedPlatforms.platforms.freepik")}
                      width={20}
                      height={20}
                      className="object-contain hidden md:block"
                    />
                    <Image
                      src="/freepik-big.png"
                      alt=""
                      width={80}
                      height={100}
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Shutterstock Card 1 */}
                <div className="flex items-center justify-center group relative bg-card shadow-xs dark:bg-muted backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:scale-105 platform-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-fit flex items-center justify-center gap-2">
                    <Image
                      src="/shutterstock-small.webp"
                      alt={t("supportedPlatforms.platforms.shutterstock")}
                      width={20}
                      height={20}
                      className="object-contain hidden md:block"
                    />
                    <Image
                      src="/shutterstock-big.png"
                      alt=""
                      width={80}
                      height={100}
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Freepik Card 2 */}
                <div className="flex items-center justify-center group relative bg-card shadow-xs dark:bg-muted backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:scale-105 platform-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-fit flex items-center justify-center gap-2">
                    <Image
                      src="/freepik-small.png"
                      alt={t("supportedPlatforms.platforms.freepik")}
                      width={20}
                      height={20}
                      className="object-contain hidden md:block"
                    />
                    <Image
                      src="/freepik-big.png"
                      alt=""
                      width={80}
                      height={100}
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Shutterstock Card 2 */}
                <div className="flex items-center justify-center group relative bg-card shadow-xs dark:bg-muted backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:scale-105 platform-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-fit flex items-center justify-center gap-2">
                    <Image
                      src="/shutterstock-small.webp"
                      alt={t("supportedPlatforms.platforms.shutterstock")}
                      width={20}
                      height={20}
                      className="object-contain hidden md:block"
                    />
                    <Image
                      src="/shutterstock-big.png"
                      alt=""
                      width={80}
                      height={100}
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Freepik Card 3 */}
                <div className="flex items-center justify-center group relative bg-card shadow-xs dark:bg-muted backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:scale-105 platform-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-fit flex items-center justify-center gap-2">
                    <Image
                      src="/freepik-small.png"
                      alt={t("supportedPlatforms.platforms.freepik")}
                      width={20}
                      height={20}
                      className="object-contain hidden md:block"
                    />
                    <Image
                      src="/freepik-big.png"
                      alt=""
                      width={80}
                      height={100}
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Shutterstock Card 3 */}
                <div className="flex items-center justify-center group relative bg-card shadow-xs dark:bg-muted backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-fit flex items-center justify-center gap-2">
                    <Image
                      src="/shutterstock-small.webp"
                      alt={t("supportedPlatforms.platforms.shutterstock")}
                      width={20}
                      height={20}
                      className="object-contain hidden md:block"
                    />
                    <Image
                      src="/shutterstock-big.png"
                      alt=""
                      width={80}
                      height={100}
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Freepik Card 4 */}
                <div className="flex items-center justify-center group relative bg-card shadow-xs dark:bg-muted backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-fit flex items-center justify-center gap-2">
                    <Image
                      src="/freepik-small.png"
                      alt={t("supportedPlatforms.platforms.freepik")}
                      width={20}
                      height={20}
                      className="object-contain hidden md:block"
                    />
                    <Image
                      src="/freepik-big.png"
                      alt=""
                      width={80}
                      height={120}
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div
              className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center ${isRTL ? "space-x-reverse sm:space-x-3" : "space-x-3"}`}
            >
              <h3 className="text-sm font-medium text-muted-foreground">
                {t("search.suggestions.title")}
              </h3>
              <div className="grid place-content-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-fit">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    className="cursor-pointer flex items-center border-2 rounded-full px-3 py-2 gap-3 hover:bg-card transition-all duration-150"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      handleSearch();
                    }}
                  >
                    <Search className="w-5 h-5" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Results Count */}
            <div className="text-center space-y-2">
              <div
                className={`flex items-center justify-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <h2 className="text-lg font-semibold text-foreground">
                  {t("search.results.stockImages")}{" "}
                  <span className="text-primary">
                    {searchQuery || t("search.results.defaultQuery")}
                  </span>
                  .
                </h2>
              </div>
              <p className="text-muted-foreground">
                {t("search.results.description", {
                  count: totalResults,
                  query: searchQuery || t("search.results.defaultQuery"),
                })}{" "}
                {t("search.results.vectorsText")}{" "}
              </p>
            </div>

            {/* Offline Providers Notification */}
            {(() => {
              const offlineProviders = providers.filter((p) => !p.isOnline);
              if (offlineProviders.length > 0) {
                return (
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                      <div
                        className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                            {t("search.status.someProvidersOffline")}
                          </h3>
                          <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                            {t("search.status.offlineProvidersMessage")}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {offlineProviders.map((provider) => (
                              <span
                                key={provider.id}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200 text-xs rounded-full"
                              >
                                <WifiOff className="w-3 h-3" />
                                {provider.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* Results Grid - Mobile: Grid (1 item per row), SM+: Flex with varied widths */}
            <div className="space-y-4 results-grid-3xl">
              {/* Mobile Layout - Grid with 1 column */}
              <div className="grid grid-cols-1 gap-4 sm:hidden">
                {mockResults.map((result) => (
                  <div
                    key={result.id}
                    className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer h-64"
                    onMouseEnter={() => setHoveredImage(result.id)}
                    onMouseLeave={() => setHoveredImage(null)}
                    onClick={() => handleImageClick(result)}
                  >
                    {/* Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={result.thumbnail}
                        alt={result.title}
                        fill
                        className="object-cover"
                      />

                      {/* Provider Logo - Top Left/Right - Always visible */}
                      <div
                        className={`absolute top-2 ${isRTL ? "right-2" : "left-2"} w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 relative`}
                      >
                        <Image
                          src={result.provider.logo}
                          alt={result.provider.name}
                          width={44}
                          height={44}
                          className={`w-11 h-11 object-cover rounded-lg ${!result.provider.isOnline ? "grayscale opacity-60" : ""}`}
                        />

                        {/* Provider Status Indicator */}
                        <div
                          className={`absolute -top-1 ${isRTL ? "-left-1" : "-right-1"} z-10`}
                        >
                          {result.provider.isOnline ? (
                            <div
                              className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"
                              title={`${result.provider.name} - ${t("search.status.online")}`}
                            />
                          ) : (
                            <div
                              className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                              title={`${result.provider.name} - ${t("search.status.offline")}`}
                            >
                              <WifiOff className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div
                        className={`absolute inset-0 bg-black/20 transition-all duration-300 ${hoveredImage === result.id ? "opacity-100" : "opacity-0"}`}
                      >
                        {/* Love Button - Top Right - Appears on hover */}
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`absolute top-2 ${isRTL ? "left-2" : "right-2"} w-11 h-11 p-0 bg-white/90 hover:bg-white transition-all duration-300 ${hoveredImage === result.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                          aria-label={t("search.actions.favorite")}
                        >
                          <Heart
                            className={`w-5 h-5 ${result.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                          />
                        </Button>

                        {/* Share Button - Under Logo - Appears on hover */}
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`absolute top-12 ${isRTL ? "right-2" : "left-2"} w-11 h-11 p-0 bg-white/90 hover:bg-white transition-all duration-300 ${hoveredImage === result.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                          aria-label={t("search.actions.share")}
                        >
                          <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                        </Button>

                        {/* Download Button - Bottom Center - Appears on hover */}
                        <Button
                          size="sm"
                          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary hover:bg-primary/90 transition-all duration-300 ${hoveredImage === result.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                        >
                          <Download className="w-4 h-4" />
                          {t("search.actions.download")}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Layout - Flex with varied widths (SM and up) */}
              <div className="hidden sm:flex sm:flex-col sm:w-full">
                {Array.from(
                  { length: Math.ceil(mockResults.length / 4) },
                  (_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex gap-2 sm:gap-4 justify-center flex-wrap mb-4"
                    >
                      {mockResults
                        .slice(rowIndex * 4, (rowIndex + 1) * 4)
                        .map((result, index) => {
                          const actualIndex = rowIndex * 4 + index;
                          const flexValue = getImageFlex(actualIndex);
                          return (
                            <div
                              key={result.id}
                              className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
                              style={{
                                flex: `${flexValue} 1 0`,
                                height: "250px",
                                minWidth: "150px",
                                maxWidth: "400px",
                              }}
                              onMouseEnter={() => setHoveredImage(result.id)}
                              onMouseLeave={() => setHoveredImage(null)}
                              onClick={() => handleImageClick(result)}
                            >
                              {/* Image */}
                              <div className="relative w-full h-full">
                                <Image
                                  src={result.thumbnail}
                                  alt={result.title}
                                  fill
                                  className="object-cover"
                                />

                                {/* Provider Logo - Top Left/Right - Always visible */}
                                <div
                                  className={`absolute top-2 ${isRTL ? "right-2" : "left-2"} w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 relative`}
                                >
                                  <Image
                                    src={result.provider.logo}
                                    alt={result.provider.name}
                                    width={44}
                                    height={44}
                                    className={`w-11 h-11 object-cover rounded-lg ${!result.provider.isOnline ? "grayscale opacity-60" : ""}`}
                                  />

                                  {/* Provider Status Indicator */}
                                  <div
                                    className={`absolute -top-1 ${isRTL ? "-left-1" : "-right-1"} z-10`}
                                  >
                                    {result.provider.isOnline ? (
                                      <div
                                        className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"
                                        title={`${result.provider.name} - ${t("search.status.online")}`}
                                      />
                                    ) : (
                                      <div
                                        className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                                        title={`${result.provider.name} - ${t("search.status.offline")}`}
                                      >
                                        <WifiOff className="w-2 h-2 text-white" />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Hover Overlay */}
                                <div
                                  className={`absolute inset-0 bg-black/20 transition-all duration-300 ${hoveredImage === result.id ? "opacity-100" : "opacity-0"}`}
                                >
                                  {/* Love Button - Top Right - Appears on hover */}
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className={`absolute top-2 ${isRTL ? "left-2" : "right-2"} w-11 h-11 p-0 bg-white/90 hover:bg-white transition-all duration-300 ${hoveredImage === result.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                                    aria-label={t("search.actions.favorite")}
                                  >
                                    <Heart
                                      className={`w-6 h-6 ${result.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                                    />
                                  </Button>

                                  {/* Share Button - Under Logo - Appears on hover */}
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className={`absolute top-14 ${isRTL ? "right-2" : "left-2"} w-11 h-11 p-0 bg-white/90 hover:bg-white transition-all duration-300 ${hoveredImage === result.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                                    aria-label={t("search.actions.share")}
                                  >
                                    <Share2 className="w-6 h-6 text-gray-600" />
                                  </Button>

                                  {/* Download Button - Bottom Center - Appears on hover */}
                                  <Button
                                    size="sm"
                                    className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary hover:bg-primary/90 transition-all duration-300 ${hoveredImage === result.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                                  >
                                    <Download className="w-4 h-4" />
                                    {t("search.actions.download")}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Bottom Pagination with Page Numbers */}
            <div className="flex justify-center pt-8">
              <div
                className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="lg"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className="w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-xl border-2"
                >
                  <ChevronLeft
                    className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                  />
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="lg"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-xl border-2 font-semibold ${
                          currentPage === pageNum
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="lg"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className="w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-xl border-2"
                >
                  <ChevronRight
                    className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Image Detail Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogTitle className="sr-only"></DialogTitle>
        <DialogContent
          className="sm:!max-w-5xl !max-w-[380px] w-full h-[85vh] sm:h-auto p-0 overflow-hidden border-none sm:rounded-xl"
          showCloseButton={false}
        >
          {selectedImage && (
            <div
              className={`flex flex-col sm:flex-row h-full  ${isRTL ? "" : ""}`}
            >
              {/* Left Side - Image */}
              <div className="flex-1 relative bg-muted/20">
                <Image
                  src={selectedImage.fullImageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-fill"
                />
              </div>

              {/* Right Side - Details and Actions */}
              <div
                className={`w-full sm:w-80 bg-background ${isRTL ? "border-r" : "border-l"} border-border flex flex-col`}
              >
                {/* Header with provider logo and close button */}
                <div
                  className={`flex items-center justify-between p-4 border-b border-border ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Image
                      src={selectedImage.provider.logo}
                      alt={selectedImage.provider.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="font-medium text-foreground">
                      {selectedImage.provider.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsImageDialogOpen(false)}
                    className="w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 space-y-4">
                  {/* Credit Required */}
                  <div className="text-sm text-muted-foreground">
                    {t("search.imageDialog.creditRequired")}{" "}
                    <span className="font-medium text-foreground">
                      {selectedImage.creditRequired}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {/* Download Button */}
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Download className={`w-4 h-4`} />
                      {t("search.actions.download")}
                    </Button>

                    <Button className="w-full">
                      <Eye className={`w-4 h-4`} />
                      {t("search.actions.simillars")}
                    </Button>

                    {/* View Full Image Button */}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsFullImageDialogOpen(true)}
                    >
                      <Eye className={`w-4 h-4`} />
                      {t("search.imageDialog.viewFullImage")}
                    </Button>

                    {/* Add to Queue Button */}
                    <Button variant="outline" className="w-full">
                      <ShoppingCart className={`w-4 h-4`} />
                      {t("search.imageDialog.addToCart")}
                    </Button>

                    {/* Like Button */}
                    <Button variant="outline" className="w-full">
                      <Heart
                        className={`w-4 h-4 ${selectedImage.isFavorite ? "fill-red-500 text-red-500" : ""}`}
                      />
                      {t("search.imageDialog.like")}
                    </Button>
                  </div>
                </div>

                {/* Footer - Image Name and ID */}
                <div className="p-4 border-t border-border space-y-2">
                  <div className="font-medium text-foreground">
                    {selectedImage.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedImage.imageId}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedImage.resolution}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Full Screen Image Dialog */}
      <Dialog
        open={isFullImageDialogOpen}
        onOpenChange={setIsFullImageDialogOpen}
      >
        <DialogTitle className="sr-only">Full Image View</DialogTitle>
        <DialogContent
          className="!max-w-[95vw] !max-h-[95vh] w-full h-full p-0 overflow-hidden border-none rounded-xl bg-black/95"
          showCloseButton={false}
        >
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullImageDialogOpen(false)}
                className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} z-10 w-10 h-10 p-0 bg-black/50 hover:bg-black/70 text-white hover:text-white border rounded-none border-white/40`}
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Full Size Image */}
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                  src={selectedImage.fullImageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Image Info Overlay */}
              <div
                className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"} bg-black/70 text-white p-3 rounded-lg border border-white/20 max-w-sm`}
              >
                <div className="font-medium text-sm mb-1">
                  {selectedImage.title}
                </div>
                <div className="text-xs text-white/80">
                  {selectedImage.imageId} • {selectedImage.provider.name}
                </div>
                <div className="text-xs text-white/80">
                  {selectedImage.resolution}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Loading component for Suspense fallback
function SearchPageLoading() {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="px-4 sm:px-5">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile menu button skeleton */}
              <Skeleton className="w-8 h-8 rounded-lg lg:hidden" />
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-32 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
          </div>
        </div>
      </header>

      <div className="relative bg-gradient-to-br from-primary/20 via-primary/5 to-primary/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-35 dark:opacity-100"></div>

        {/* Sidebar - Fixed position always */}
        <aside
          className={`fixed ${isRTL ? "right-0 border-l" : "left-0 border-r"} top-16 w-80 h-[calc(100vh-4rem)] bg-card border-border z-50 transition-transform duration-300 ease-in-out overflow-y-auto shadow-lg lg:shadow-none ${isRTL ? "lg:border-l lg:border-r-0" : "lg:border-r lg:border-l-0"} ${isRTL ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className="p-6 space-y-6 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
            {/* Providers Filter Skeleton */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <Skeleton className="w-24 h-5" />
                <Skeleton className="w-4 h-4 ml-auto" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="w-full h-16 rounded-lg" />
                ))}
              </div>
            </div>

            <Skeleton className="w-full h-px" />

            {/* File Type Filter Skeleton */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <Skeleton className="w-20 h-5" />
                <Skeleton className="w-4 h-4 ml-auto" />
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="w-16 h-8 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - Matches current layout */}
        <main
          className={`relative col-span-12 lg:col-span-9 min-w-0 bg-gradient-to-br from-primary/20 via-primary/5 to-primary/20 overflow-hidden ${isRTL ? "lg:mr-96" : "lg:ml-96"}`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-35 dark:opacity-100"></div>

          <div className="relative z-10 p-4 sm:p-6 space-y-6">
            {/* Search Bar */}
            <div className="flex justify-center">
              <Skeleton className="w-full max-w-2xl h-12 rounded-xl" />
            </div>

            {/* Top Pagination */}
            <div className="flex justify-center">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl" />
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl"
                    />
                  ))}
                </div>
                <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl" />
              </div>
            </div>

            {/* Suggestions */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center space-x-3">
              <Skeleton className="w-24 h-4" />
              <div className="grid place-content-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-fit">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-20 h-10 rounded-full" />
                ))}
              </div>
            </div>

            {/* Search Results Count */}
            <div className="text-center space-y-2">
              <Skeleton className="w-64 h-6 mx-auto" />
              <Skeleton className="w-80 h-4 mx-auto" />
            </div>

            {/* Results Grid - Mobile: Single column, Desktop: Varied widths */}
            <div className="space-y-4">
              {/* Mobile Layout - Single column */}
              <div className="grid grid-cols-1 gap-4 sm:hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="w-full h-64 rounded-lg" />
                ))}
              </div>

              {/* Desktop Layout - Flex with varied widths */}
              <div className="hidden sm:flex sm:flex-col sm:w-full">
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex gap-2 sm:gap-4 justify-center flex-wrap mb-4"
                  >
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        className="rounded-lg"
                        style={{
                          flex: `${1.2 + i * 0.2} 1 0`,
                          height: "250px",
                          minWidth: "150px",
                          maxWidth: "400px",
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Pagination */}
            <div className="flex justify-center pt-8">
              <div className="flex items-center gap-2">
                <Skeleton className="w-20 h-8 rounded" />
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-16 h-8 rounded" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchContent />
    </Suspense>
  );
}

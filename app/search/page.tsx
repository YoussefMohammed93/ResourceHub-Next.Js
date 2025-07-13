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
  Info,
  Eye,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/i18n-provider";
import { HeaderControls } from "@/components/header-controls";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Type definitions
interface Provider {
  id: string;
  name: string;
  logo: string;
  count: number;
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
  },
  { id: "vexels", name: "Vexels", logo: "/nexus.png", count: 750 },
  { id: "freepik", name: "Freepik", logo: "/shutterstock.png", count: 980 },
  { id: "vectory", name: "Vectory", logo: "/freepik.webp", count: 620 },
  { id: "ui8", name: "UI8", logo: "/raw.png", count: 450 },
  { id: "rawpixel", name: "RawPixel", logo: "/shutterstock.png", count: 320 },
  { id: "pngtree", name: "PNGTree", logo: "/freepik.webp", count: 380 },
  {
    id: "adobestock",
    name: "Adobe Stock",
    logo: "/nexus.png",
    count: 280,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<SearchResult | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

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
        <div className="flex">
          {/* Desktop Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-80 h-[calc(100vh-4rem)] bg-card border-r border-border p-6">
            <Skeleton className="w-full h-8 mb-6" />
            <div className="space-y-4">
              <Skeleton className="w-full h-6" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="w-full h-16 rounded-lg" />
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 bg-secondary/50 lg:ml-0">
            <div className="p-4 sm:p-6 space-y-6">
              {/* Search Bar */}
              <div className="flex justify-center">
                <Skeleton className="w-full max-w-2xl h-12 rounded-xl" />
              </div>

              {/* Top Pagination - Hidden on mobile */}
              <div className="hidden sm:flex justify-center">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="w-12 h-12 rounded-xl" />
                    ))}
                  </div>
                  <Skeleton className="w-12 h-12 rounded-xl" />
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <Skeleton className="w-24 h-4" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-fit">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="w-20 h-6 rounded-full" />
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

                {/* Desktop Layout - Varied widths */}
                <div className="hidden sm:block space-y-4">
                  {Array.from({ length: 3 }).map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex gap-2 sm:gap-4 justify-start flex-wrap"
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

              {/* Bottom Pagination - Mobile only */}
              <div className="flex justify-center pt-8 sm:hidden">
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

  return (
    <div
      className={`min-h-screen bg-background font-sans ${isRTL ? "font-tajawal" : ""}`}
    >
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="px-4 sm:px-5">
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

      <div className="flex">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Filters */}
        <aside
          className={`
          fixed ${isRTL ? "right-0 border-l" : "left-0 border-r"} top-16 w-80 h-[calc(100vh-4rem)] bg-card border-border z-50 transition-transform duration-300 ease-in-out overflow-y-auto shadow-lg
          ${isSidebarOpen ? "translate-x-0" : `${isRTL ? "translate-x-full" : "-translate-x-full"} lg:translate-x-0`}
        `}
        >
          <div className="p-6 space-y-6">
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
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
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
                    onClick={() => toggleProvider(provider.id)}
                    className={`
                      w-full p-3 rounded-lg border cursor-pointer group
                      ${
                        selectedProviders.includes(provider.id)
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border hover:border-primary/50 bg-background hover:bg-muted/50"
                      }
                    `}
                  >
                    <Image
                      src={provider.logo}
                      alt={provider.name}
                      width={150}
                      height={24}
                      className="w-full h-6 rounded object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="mt-2 text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors">
                      {provider.count} {t("search.filters.items")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* File Type Filter */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
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
                  className="text-xs font-medium hover:scale-105 transition-transform"
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
                    className="text-xs font-medium relative group"
                  >
                    {t(`search.fileTypes.${type.id}`)},
                    <span className="pl-1 text-[11px]">
                      {type.count} {t("search.filters.items")}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 min-w-0 bg-secondary/50 ${isRTL ? "lg:mr-80" : "lg:ml-80"}`}
        >
          <div className="p-4 sm:p-6 space-y-6">
            {/* Search Bar - Centered */}
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
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
                    className={`${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"} placeholder:text-base py-3 !h-12 text-base border-2 border-border focus:border-primary rounded-xl bg-background`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  <Button
                    onClick={handleSearch}
                    className={`absolute ${isRTL ? "left-0.5" : "right-0.5"} top-1/2 transform -translate-y-1/2 !px-4 h-11 bg-primary hover:bg-primary/90 rounded-xl`}
                  >
                    <span>{t("search.searchButton")}</span>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Top Pagination with Page Numbers */}
            <div className="flex justify-center">
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

            {/* Suggestions */}
            <div
              className={`flex flex-col gap-2 sm:flex-row sm:items-center ${isRTL ? "space-x-reverse sm:space-x-3" : "space-x-3"}`}
            >
              <h3 className="text-sm font-medium text-muted-foreground">
                {t("search.suggestions.title")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-fit">
                {suggestions.map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      handleSearch();
                    }}
                  >
                    {suggestion}
                  </Badge>
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

            {/* Results Grid - Mobile: Grid (1 item per row), SM+: Flex with varied widths */}
            <div className="space-y-4">
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
                        className={`absolute top-2 ${isRTL ? "right-2" : "left-2"} w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300`}
                      >
                        <Image
                          src={result.provider.logo}
                          alt={result.provider.name}
                          width={44}
                          height={44}
                          className="w-11 h-11 object-cover rounded-lg"
                        />
                      </div>

                      {/* Hover Overlay */}
                      <div
                        className={`absolute inset-0 bg-black/20 transition-all duration-300 ${hoveredImage === result.id ? "opacity-100" : "opacity-0"}`}
                      >
                        {/* Love Button - Top Right - Appears on hover */}
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`absolute top-2 ${isRTL ? "left-2" : "right-2"} w-8 h-8 p-0 bg-white/90 hover:bg-white transition-all duration-300 ${hoveredImage === result.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                          aria-label={t("search.actions.favorite")}
                        >
                          <Heart
                            className={`w-4 h-4 ${result.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                          />
                        </Button>

                        {/* Share Button - Under Logo - Appears on hover */}
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`absolute top-12 ${isRTL ? "right-2" : "left-2"} w-8 h-8 p-0 bg-white/90 hover:bg-white transition-all duration-300 ${hoveredImage === result.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                          aria-label={t("search.actions.share")}
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
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
              <div className="hidden sm:block">
                {Array.from(
                  { length: Math.ceil(mockResults.length / 4) },
                  (_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex gap-2 sm:gap-4 justify-start flex-wrap mb-4"
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
                                  className={`absolute top-2 ${isRTL ? "right-2" : "left-2"} w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300`}
                                >
                                  <Image
                                    src={result.provider.logo}
                                    alt={result.provider.name}
                                    width={44}
                                    height={44}
                                    className="w-11 h-11 object-cover rounded-lg"
                                  />
                                </div>

                                {/* Hover Overlay */}
                                <div
                                  className={`absolute inset-0 bg-black/20 transition-all duration-300 ${hoveredImage === result.id ? "opacity-100" : "opacity-0"}`}
                                >
                                  {/* Love Button - Top Right - Appears on hover */}
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className={`absolute top-2 ${isRTL ? "left-2" : "right-2"} w-8 h-8 p-0 bg-white/90 hover:bg-white transition-all duration-300 ${hoveredImage === result.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                                    aria-label={t("search.actions.favorite")}
                                  >
                                    <Heart
                                      className={`w-4 h-4 ${result.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                                    />
                                  </Button>

                                  {/* Share Button - Under Logo - Appears on hover */}
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className={`absolute top-12 ${isRTL ? "right-2" : "left-2"} w-8 h-8 p-0 bg-white/90 hover:bg-white transition-all duration-300 ${hoveredImage === result.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                                    aria-label={t("search.actions.share")}
                                  >
                                    <Share2 className="w-4 h-4 text-gray-600" />
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

            {/* Pagination Bottom - Centered */}
            <div className="flex justify-center pt-8">
              <div
                className={`flex items-center gap-2 ${isRTL ? "flex-row" : ""}`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className={`${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <ChevronLeft
                    className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                  />
                  {t("search.pagination.previous")}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {t("search.pagination.page", {
                    current: currentPage,
                    total: totalPages,
                  })}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className={`${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {t("search.pagination.next")}
                  <ChevronRight
                    className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
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
              className={`flex flex-col sm:flex-row h-full  ${isRTL ? "flex-row-reverse" : ""}`}
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

                    {/* Details Button */}
                    <Button variant="outline" className="w-full">
                      <Info className={`w-4 h-4`} />
                      {t("search.imageDialog.details")}
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
      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile */}
        <aside className="hidden lg:block w-80 h-[calc(100vh-4rem)] bg-card border-r border-border p-6">
          <Skeleton className="w-full h-8 mb-6" />
          <div className="space-y-4">
            <Skeleton className="w-full h-6" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-16 rounded-lg" />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 bg-secondary/50 lg:ml-0">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Search Bar */}
            <div className="flex justify-center">
              <Skeleton className="w-full max-w-2xl h-12 rounded-xl" />
            </div>

            {/* Top Pagination - Hidden on mobile */}
            <div className="hidden sm:flex justify-center">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="w-12 h-12 rounded-xl" />
                  ))}
                </div>
                <Skeleton className="w-12 h-12 rounded-xl" />
              </div>
            </div>

            {/* Suggestions */}
            <div className="space-y-2">
              <Skeleton className="w-24 h-4" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-fit">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-20 h-6 rounded-full" />
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

              {/* Desktop Layout - Varied widths */}
              <div className="hidden sm:block space-y-4">
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex gap-2 sm:gap-4 justify-start flex-wrap"
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

            {/* Bottom Pagination - Mobile only */}
            <div className="flex justify-center pt-8 sm:hidden">
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

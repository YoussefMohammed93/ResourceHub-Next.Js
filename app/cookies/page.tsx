"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Trash2,
  Menu,
  Cookie,
  Plus,
  Upload,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/components/i18n-provider";
import { HeaderControls } from "@/components/header-controls";
import { AdminRouteGuard } from "@/components/admin-route-guard";
import { cookieApi, type CookieData } from "@/lib/api";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";

// Helper function to generate icon and color for platform
function getPlatformIcon(platformName: string): {
  icon: string;
  iconColor: string;
} {
  const platformIcons: Record<string, { icon: string; iconColor: string }> = {
    twitter: { icon: "T", iconColor: "bg-blue-500" },
    facebook: { icon: "F", iconColor: "bg-blue-600" },
    instagram: { icon: "I", iconColor: "bg-pink-500" },
    youtube: { icon: "Y", iconColor: "bg-red-500" },
    tiktok: { icon: "T", iconColor: "bg-black" },
    linkedin: { icon: "L", iconColor: "bg-blue-700" },
    pinterest: { icon: "P", iconColor: "bg-red-600" },
    reddit: { icon: "R", iconColor: "bg-orange-500" },
    snapchat: { icon: "S", iconColor: "bg-yellow-400" },
    discord: { icon: "D", iconColor: "bg-indigo-500" },
    telegram: { icon: "T", iconColor: "bg-blue-400" },
    whatsapp: { icon: "W", iconColor: "bg-green-500" },
    freepik: { icon: "F", iconColor: "bg-blue-500" },
    shutterstock: { icon: "S", iconColor: "bg-red-500" },
    adobe: { icon: "A", iconColor: "bg-red-600" },
    unsplash: { icon: "U", iconColor: "bg-gray-800" },
    pexels: { icon: "P", iconColor: "bg-green-600" },
    pixabay: { icon: "P", iconColor: "bg-green-500" },
  };

  const platform = platformName.toLowerCase();
  return (
    platformIcons[platform] || {
      icon: platformName.charAt(0).toUpperCase(),
      iconColor: "bg-primary",
    }
  );
}

// Cookies Page Skeleton Component
function CookiesPageSkeleton({ isRTL }: { isRTL: boolean }) {
  return (
    <div
      className={`min-h-screen bg-background ${isRTL ? "font-tajawal" : "font-sans"}`}
    >
      {/* Sidebar Skeleton */}
      <div
        className={`fixed ${isRTL ? "right-0 border-l" : "left-0 border-r"} top-0 w-72 h-screen bg-background border-border z-50 hidden lg:block`}
      >
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-2">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Header Skeleton */}
      <header
        className={`${isRTL ? "lg:mr-72" : "lg:ml-72"} border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40`}
      >
        <div className="flex items-center justify-between px-4 sm:px-5 h-16">
          <div
            className={`flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}
          >
            <Skeleton className="h-8 w-8 rounded-lg lg:hidden" />
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center lg:hidden">
              <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main
        className={`flex-1 min-h-screen ${isRTL ? "lg:mr-72" : "lg:ml-72"} p-4 sm:p-5 space-y-4 sm:space-y-5 bg-secondary/50`}
      >
        {/* Page Header Skeleton */}
        <div
          className={`flex ${isRTL ? "sm:flex-row" : "sm:flex-row"} flex-col sm:items-center justify-between gap-4`}
        >
          <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-96" />
          </div>
          <Skeleton className="h-10 w-32 shrink-0" />
        </div>

        {/* Cookies Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <Card
              key={i}
              className="relative bg-card border border-border rounded-2xl p-6 overflow-hidden"
            >
              {/* Icon and Delete Button Skeletons */}
              <div className={`absolute ${isRTL ? "right-4" : "left-4"} top-4`}>
                <Skeleton className="w-10 h-10 rounded-lg" />
              </div>
              <div className={`absolute ${isRTL ? "left-4" : "right-4"} top-4`}>
                <Skeleton className="h-8 w-8 rounded" />
              </div>

              {/* Content Skeleton */}
              <div className="space-y-4 mt-16">
                {/* Domain Title */}
                <Skeleton className="h-6 w-32" />

                {/* Details */}
                <div className="space-y-4">
                  {Array.from({ length: 4 }, (_, j) => (
                    <div
                      key={j}
                      className={`flex ${isRTL ? "flex-row-reverse" : ""} justify-between items-center`}
                    >
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

function CookiesPageContent() {
  const { t } = useTranslation("common");
  const { isRTL, isLoading } = useLanguage();
  const { isAuthenticated, isAdmin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cookies, setCookies] = useState<CookieData[]>([]);
  const [deletingCookieId, setDeletingCookieId] = useState<number | null>(null);
  const [isCookiesLoading, setIsCookiesLoading] = useState(true);
  const [isAddCookieDialogOpen, setIsAddCookieDialogOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [platformName, setPlatformName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load cookies data (in a real implementation, this would fetch from an API)
  useEffect(() => {
    const loadCookies = async () => {
      try {
        setIsCookiesLoading(true);

        // For now, we'll use empty array since we don't have a GET endpoint
        // In a real implementation, you would fetch existing cookies from the backend
        setCookies([]);

        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 800));
      } catch (error) {
        console.error("Failed to load cookies:", error);
        toast.error("Failed to load cookies. Please try again.");
      } finally {
        setIsCookiesLoading(false);
      }
    };

    if (isAuthenticated && isAdmin) {
      loadCookies();
    } else {
      setIsCookiesLoading(false);
    }
  }, [isAuthenticated, isAdmin]);

  const handleDeleteCookie = (cookieId: number) => {
    setDeletingCookieId(cookieId);

    // Simulate API call
    setTimeout(() => {
      setCookies(cookies.filter((cookie) => cookie.id !== cookieId));
      setDeletingCookieId(null);
    }, 1500);
  };

  const handleStatusToggle = (cookieId: number) => {
    setCookies(
      cookies.map((cookie) =>
        cookie.id === cookieId ? { ...cookie, status: !cookie.status } : cookie
      )
    );
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setUploadError(null);

    // Extract platform name from filename
    const extractedPlatform = cookieApi.extractPlatformName(file.name, "");
    setPlatformName(extractedPlatform);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const resetDialog = () => {
    setSelectedFile(null);
    setPlatformName("");
    setUploadError(null);
    setIsDragOver(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadCookie = async () => {
    if (!selectedFile || !platformName) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // Process the cookie file
      const fileResult = await cookieApi.processCookieFile(selectedFile);

      if (!fileResult.success) {
        setUploadError(fileResult.error || "Failed to process cookie file");
        setIsUploading(false);
        return;
      }

      // Add cookie via API
      const response = await cookieApi.addCookie({
        cookies: fileResult.cookies!,
        platform_name: platformName,
      });

      if (response.success && response.data) {
        // Add new cookie to the local state
        const { icon, iconColor } = getPlatformIcon(platformName);
        const newCookie: CookieData = {
          id: Date.now(), // Use timestamp as temporary ID
          platform_name: platformName,
          username: response.data.data?.email?.split("@")[0] || "user",
          credit: 0,
          lastUpdate: new Date().toISOString().split("T")[0],
          status: true,
          icon,
          iconColor,
        };

        setCookies([...cookies, newCookie]);
        toast.success(`Cookie for ${platformName} added successfully!`);

        // Reset form
        setIsAddCookieDialogOpen(false);
        resetDialog();
      } else {
        const errorMessage = response.error?.message || "Failed to add cookie";
        setUploadError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage = "Network error occurred. Please try again.";
      setUploadError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  // Show loading skeleton while language data or cookies data is loading
  if (isLoading || isCookiesLoading) {
    return <CookiesPageSkeleton isRTL={isRTL} />;
  }

  return (
    <div
      className={`min-h-screen bg-background ${isRTL ? "font-tajawal" : "font-sans"}`}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Header */}
      <header
        className={`${isRTL ? "lg:mr-72" : "lg:ml-72"} border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40`}
      >
        <div className="flex items-center justify-between px-4 sm:px-5 h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="cursor-pointer lg:hidden p-2 hover:bg-muted rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Logo for mobile */}
          <Link href="/" className="lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
            </div>
          </Link>

          {/* Header Controls */}
          <HeaderControls />
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`flex-1 min-h-screen ${isRTL ? "lg:mr-72" : "lg:ml-72"} p-4 sm:p-5 space-y-4 sm:space-y-5 bg-secondary/50`}
      >
        {/* Page Header */}
        <div
          className={`flex ${isRTL ? "sm:flex-row" : "sm:flex-row"} flex-col sm:items-center justify-between gap-4`}
        >
          <div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
            <h1
              className={`text-2xl sm:text-3xl font-bold text-foreground ${isRTL ? "font-tajawal" : "font-sans"}`}
            >
              {t("cookies.title")}
            </h1>
            <p
              className={`text-muted-foreground ${isRTL ? "font-tajawal" : "font-sans"}`}
            >
              {t("cookies.description")}
            </p>
          </div>

          {/* Add Cookie Button */}
          <Dialog
            open={isAddCookieDialogOpen}
            onOpenChange={(open) => {
              setIsAddCookieDialogOpen(open);
              if (!open) {
                resetDialog();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
                <Plus className="w-4 h-4 stroke-3" />
                {t("cookies.addCookie.button")}
              </Button>
            </DialogTrigger>
            <DialogContent
              className={`sm:max-w-[500px] ${isRTL ? "[&>[data-slot=dialog-close]]:left-4 [&>[data-slot=dialog-close]]:right-auto" : ""}`}
            >
              <DialogHeader className={`${isRTL && "sm:text-right"}`}>
                <DialogTitle className={isRTL ? "font-tajawal" : "font-sans"}>
                  {t("cookies.addCookie.dialog.title")}
                </DialogTitle>
                <DialogDescription
                  className={isRTL ? "font-tajawal" : "font-sans"}
                >
                  {t("cookies.addCookie.dialog.description")}
                </DialogDescription>
              </DialogHeader>

              {/* Drag and Drop Area */}
              <div className="space-y-4">
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.json,.cookie"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>

                    <div className="space-y-2">
                      <h3
                        className={`text-lg font-semibold text-foreground ${isRTL ? "font-tajawal" : "font-sans"}`}
                      >
                        {t("cookies.addCookie.dialog.dragAndDrop.title")}
                      </h3>
                      <p
                        className={`text-sm text-muted-foreground ${isRTL ? "font-tajawal" : "font-sans"}`}
                      >
                        {t("cookies.addCookie.dialog.dragAndDrop.subtitle")}
                      </p>
                      <p
                        className={`text-xs text-muted-foreground ${isRTL ? "font-tajawal" : "font-sans"}`}
                      >
                        {t(
                          "cookies.addCookie.dialog.dragAndDrop.supportedFormats"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Selected File Display */}
                {selectedFile && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium text-foreground ${isRTL ? "font-tajawal" : "font-sans"}`}
                        >
                          {selectedFile.name}
                        </p>
                        <p
                          className={`text-xs text-muted-foreground ${isRTL ? "font-tajawal" : "font-sans"}`}
                        >
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>

                    {/* Platform Name Input */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="platform-name"
                        className={isRTL ? "font-tajawal" : "font-sans"}
                      >
                        Platform Name
                      </Label>
                      <Input
                        id="platform-name"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        placeholder="e.g., twitter, facebook, freepik"
                        className={
                          isRTL ? "font-tajawal text-right" : "font-sans"
                        }
                      />
                      <p
                        className={`text-xs text-muted-foreground ${isRTL ? "font-tajawal" : "font-sans"}`}
                      >
                        Auto-detected from filename. You can modify if needed.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {uploadError && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <p
                      className={`text-sm text-destructive ${isRTL ? "font-tajawal" : "font-sans"}`}
                    >
                      {uploadError}
                    </p>
                  </div>
                )}
              </div>

              <DialogFooter className={isRTL ? "flex-row-reverse" : ""}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddCookieDialogOpen(false);
                    resetDialog();
                  }}
                  disabled={isUploading}
                  className={isRTL ? "font-tajawal" : "font-sans"}
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  type="button"
                  onClick={handleUploadCookie}
                  disabled={
                    !selectedFile || !platformName.trim() || isUploading
                  }
                  className={`bg-primary hover:bg-primary/90 text-primary-foreground ${isRTL ? "font-tajawal" : "font-sans"}`}
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t("cookies.addCookie.dialog.uploading")}
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      {t("cookies.addCookie.dialog.upload")}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Cookies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cookies.map((cookie) => (
            <Card
              key={cookie.id}
              className="group relative bg-primary/5 dark:bg-muted/75 border border-border rounded-2xl p-6 transition-all duration-500 hover:border-primary/30 overflow-hidden"
            >
              {/* Hover effect overlay - diagonal sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl transform translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>

              {/* Delete Button - Positioned absolutely in top right */}
              <div
                className={`absolute ${isRTL ? "left-4" : "right-4"} top-4 z-20`}
              >
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      disabled={deletingCookieId === cookie.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    className={isRTL ? "font-tajawal" : "font-sans"}
                  >
                    <AlertDialogHeader
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <AlertDialogTitle
                        className={isRTL ? "font-tajawal" : "font-sans"}
                      >
                        {t("cookies.deleteDialog.title")}
                      </AlertDialogTitle>
                      <AlertDialogDescription
                        className={isRTL ? "font-tajawal" : "font-sans"}
                      >
                        {t("cookies.deleteDialog.description", {
                          domain: cookie.platform_name,
                        })}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter
                      className={isRTL ? "flex-row-reverse" : ""}
                    >
                      <AlertDialogCancel
                        disabled={deletingCookieId === cookie.id}
                        className={isRTL ? "font-tajawal" : "font-sans"}
                      >
                        {t("common.cancel")}
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteCookie(cookie.id)}
                        disabled={deletingCookieId === cookie.id}
                        className={`bg-destructive hover:bg-destructive/70 text-white ${isRTL ? "font-tajawal" : "font-sans"}`}
                      >
                        {deletingCookieId === cookie.id ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t("cookies.deleting")}
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4" />
                            {t("common.delete")}
                          </>
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Website Icon - Positioned absolutely in top left under delete button */}
              <div
                className={`absolute ${isRTL ? "right-4" : "left-4"} top-4 z-10`}
              >
                <div
                  className={`w-10 h-10 ${cookie.iconColor} rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  {cookie.icon}
                </div>
              </div>

              {/* Card Content - Relative positioned */}
              <div
                className={`relative z-10 space-y-4 mt-16 ${isRTL ? "text-right" : "text-left"}`}
              >
                {/* Domain Title */}
                <div className="space-y-2">
                  <h3
                    className={`text-lg font-semibold text-foreground group-hover:text-primary transition-colors ${isRTL ? "font-tajawal" : "font-sans"}`}
                  >
                    {cookie.platform_name}
                  </h3>
                </div>

                <div
                  className={`absolute -top-24 opacity-10 group-hover:opacity-20 transition-opacity duration-300 ${isRTL ? "-left-8" : "-right-8"}`}
                >
                  <Cookie className="w-28 h-28 text-orange-500 transform rotate-12" />
                </div>

                {/* Cookie Details */}
                <div className="space-y-4">
                  <div
                    className={`flex ${isRTL ? "flex-row" : ""} justify-between items-center`}
                  >
                    <span
                      className={`${isRTL ? "text-base font-tajawal" : "text-sm font-sans"} text-muted-foreground`}
                    >
                      {t("cookies.fields.username")}:
                    </span>
                    <span
                      className={`${isRTL ? "text-base font-tajawal" : "text-sm font-sans"} font-medium text-foreground`}
                    >
                      {cookie.username}
                    </span>
                  </div>
                  <div
                    className={`flex ${isRTL ? "flex-row" : ""} justify-between items-center`}
                  >
                    <span
                      className={`${isRTL ? "text-base font-tajawal" : "text-sm font-sans"} text-muted-foreground`}
                    >
                      {t("cookies.fields.credit")}:
                    </span>
                    <span
                      className={`${isRTL ? "text-base font-tajawal" : "text-sm font-sans"} font-medium text-foreground`}
                    >
                      {cookie.credit}$
                    </span>
                  </div>
                  <div
                    className={`flex ${isRTL ? "flex-row" : ""} justify-between items-center`}
                  >
                    <span
                      className={`${isRTL ? "text-base font-tajawal" : "text-sm font-sans"} text-muted-foreground`}
                    >
                      {t("cookies.fields.lastUpdate")}:
                    </span>
                    <span
                      className={`${isRTL ? "text-base font-tajawal" : "text-sm font-sans"} font-medium text-foreground`}
                    >
                      {cookie.lastUpdate}
                    </span>
                  </div>
                  <div
                    className={`flex ${isRTL ? "flex-row" : ""} justify-between items-center`}
                  >
                    <span
                      className={`${isRTL ? "text-base font-tajawal" : "text-sm font-sans"} text-muted-foreground`}
                    >
                      {t("cookies.fields.status")}:
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs ${isRTL ? "font-tajawal" : "font-sans"} ${
                          cookie.status ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {cookie.status
                          ? t("cookies.status.active")
                          : t("cookies.status.inactive")}
                      </span>
                      {/* Native Switch Button */}
                      <button
                        onClick={() => handleStatusToggle(cookie.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                          cookie.status ? "bg-green-500" : "bg-red-500"
                        }`}
                        role="switch"
                        aria-checked={cookie.status}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            isRTL
                              ? cookie.status
                                ? "-translate-x-1"
                                : "-translate-x-5"
                              : cookie.status
                                ? "translate-x-5"
                                : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <AdminRouteGuard fallbackPath="/dashboard">
      <CookiesPageContent />
    </AdminRouteGuard>
  );
}

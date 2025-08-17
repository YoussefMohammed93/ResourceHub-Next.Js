/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  X,
  Download,
  Eye,
  Camera,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/components/i18n-provider";
import { HeaderControls } from "@/components/header-controls";
import Footer from "@/components/footer";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tag,
  ExternalLink,
  Loader2,
  AlertCircle,
  ImageIcon,
  VideoIcon,
  FileIcon,
} from "lucide-react";
import { searchApi, type ProviderDataRequest, type FileData } from "@/lib/api";

// Type definitions for search result (matching the search page)
interface SearchResult {
  id: string;
  title: string;
  thumbnail: string;
  provider: string;
  type: string;
  file_type: string;
  width: number | null;
  height: number | null;
  url: string;
  file_id: string;
  image_type: string;
  poster?: string;
  providerIcon?: string;
}

export default function ImageDetailsPage() {
  const { t } = useTranslation("common");
  const { isRTL } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const [imageData, setImageData] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  // Enhanced provider data state
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isProviderDataLoading, setIsProviderDataLoading] = useState(false);
  const [providerDataError, setProviderDataError] = useState<string | null>(
    null
  );
  const [isDownloading, setIsDownloading] = useState(false);

  // Map provider names to match the API specification
  const mapProviderName = useCallback((providerName: string): string => {
    const providerMapping: { [key: string]: string } = {
      "Adobe Stock": "AdobeStock",
      AdobeStock: "AdobeStock",
      "Creative Fabrica": "CreativeFabrica",
      CreativeFabrica: "CreativeFabrica",
      Envato: "Envato",
      Freepik: "Freepik",
      "Motion Elements": "MotionElements",
      MotionElements: "MotionElements",
      "PNG Tree": "PngTree",
      PngTree: "PngTree",
      Shutterstock: "Shutterstock",
      Storyblocks: "Storyblocks",
      Vecteezy: "Vecteezy",
    };

    return providerMapping[providerName] || providerName;
  }, []);

  // Fetch enhanced provider data
  const fetchProviderData = useCallback(
    async (mediaData: SearchResult) => {
      if (!mediaData.provider || !mediaData.url || !mediaData.file_id) {
        console.log("Missing required data for provider API:", {
          provider: mediaData.provider,
          url: !!mediaData.url,
          file_id: !!mediaData.file_id,
        });
        return;
      }

      setIsProviderDataLoading(true);
      setProviderDataError(null);

      try {
        // Map the provider name to match API specification
        const mappedPlatform = mapProviderName(mediaData.provider);

        const request: ProviderDataRequest = {
          platform: mappedPlatform,
          file_url: mediaData.url,
          file_id: mediaData.file_id,
        };

        console.log("Original provider:", mediaData.provider);
        console.log("Mapped platform:", mappedPlatform);
        console.log("Full request object:", request);
        console.log("Request JSON:", JSON.stringify(request));
        const response = await searchApi.getProviderData(request);

        if (response.success && response.data) {
          setFileData(response.data.data);
          console.log("Provider data loaded successfully:", response.data.data);
        } else {
          const errorMessage =
            response.error?.message || "Failed to load enhanced details";
          setProviderDataError(errorMessage);
          console.error("Provider data error:", errorMessage);
        }
      } catch (err) {
        console.error("Error fetching provider data:", err);
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setProviderDataError(errorMessage);
      } finally {
        setIsProviderDataLoading(false);
      }
    },
    [mapProviderName]
  );

  // Handle media download
  const handleDownload = useCallback(async () => {
    if (!imageData) return;

    setIsDownloading(true);
    try {
      // Use the mapped provider name for consistency
      const mappedProvider = mapProviderName(imageData.provider);

      const response = await searchApi.submitMediaDownload({
        link: imageData.url,
        id: imageData.file_id,
        website: mappedProvider,
      });

      if (response.success) {
        console.log("Download request submitted successfully:", response.data);
        // You could show a success notification here
      } else {
        console.error("Download failed:", response.error?.message);
        // You could show an error notification here
      }
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  }, [imageData, mapProviderName]);

  // Get file type icon
  const getFileTypeIcon = useCallback((fileType: string) => {
    if (fileType.toLowerCase().includes("video")) {
      return <VideoIcon className="w-4 h-4" />;
    }
    if (
      fileType.toLowerCase().includes("image") ||
      fileType.toLowerCase().includes("photo")
    ) {
      return <ImageIcon className="w-4 h-4" />;
    }
    return <FileIcon className="w-4 h-4" />;
  }, []);

  // Get image data from URL parameters or localStorage
  useEffect(() => {
    const imageId = params.id as string;

    // Try to get image data from localStorage (passed from search page)
    const storedImageData = localStorage.getItem(`image_${imageId}`);
    if (storedImageData) {
      try {
        const parsedData = JSON.parse(storedImageData);
        setImageData(parsedData);
        setIsLoading(false);

        // Fetch enhanced provider data
        fetchProviderData(parsedData);
      } catch (error) {
        console.error("Failed to parse stored image data:", error);
        setIsLoading(false);
      }
    } else {
      // If no stored data, redirect back to search
      router.push("/search");
    }
  }, [params.id, router, fetchProviderData]);

  // Check if URL is a valid video URL with enhanced detection
  const isValidVideoUrl = useCallback((url: string): boolean => {
    if (!url) return false;

    // Enhanced video extensions for better cross-browser support
    const videoExtensions = [
      ".mp4",
      ".webm",
      ".ogg",
      ".ogv",
      ".mov",
      ".avi",
      ".mkv",
      ".flv",
      ".wmv",
      ".m4v",
      ".3gp",
      ".3g2",
    ];
    const hasVideoExtension = videoExtensions.some((ext) =>
      url.toLowerCase().includes(ext)
    );

    // Enhanced video streaming domains
    const videoStreamingDomains = [
      "cloudfront.net",
      "amazonaws.com",
      "vimeo.com",
      "youtube.com",
      "youtu.be",
      "jwpcdn.com",
      "jwplatform.com",
      "brightcove.com",
      "wistia.com",
      "vidyard.com",
    ];
    const hasVideoStreamingDomain = videoStreamingDomains.some((domain) =>
      url.includes(domain)
    );

    return hasVideoExtension || hasVideoStreamingDomain;
  }, []);

  // Get video MIME type for better browser compatibility
  const getVideoMimeType = useCallback((url: string): string => {
    if (!url) return "video/mp4";

    const extension = url.toLowerCase().split(".").pop();
    const mimeTypes: { [key: string]: string } = {
      mp4: "video/mp4",
      webm: "video/webm",
      ogg: "video/ogg",
      ogv: "video/ogg",
      mov: "video/quicktime",
      avi: "video/x-msvideo",
      mkv: "video/x-matroska",
      flv: "video/x-flv",
      wmv: "video/x-ms-wmv",
      m4v: "video/mp4",
      "3gp": "video/3gpp",
      "3g2": "video/3gpp2",
    };

    return mimeTypes[extension || ""] || "video/mp4";
  }, []);

  // Determine if current item is a video
  const isVideoItem = useCallback((): boolean => {
    if (!imageData) return false;

    return (
      imageData.file_type === "video" ||
      imageData.type === "video" ||
      imageData.image_type?.toLowerCase().includes("video") ||
      isValidVideoUrl(imageData.thumbnail)
    );
  }, [imageData, isValidVideoUrl]);

  // Generate video thumbnail using canvas
  const generateVideoThumbnail = useCallback(
    (videoElement: HTMLVideoElement): Promise<string> => {
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve("/placeholder.png");
          return;
        }

        canvas.width = videoElement.videoWidth || 320;
        canvas.height = videoElement.videoHeight || 240;
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL("image/jpeg", 0.8);
        resolve(thumbnailUrl);
      });
    },
    []
  );

  // Handle keyboard controls for full-screen video
  useEffect(() => {
    if (!isFullImageOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!imageData || !isVideoItem()) return;

      const video = document.querySelector("video") as HTMLVideoElement;
      if (!video) return;

      switch (event.code) {
        case "Space":
          event.preventDefault();
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
          break;
        case "ArrowLeft":
          event.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
          break;
        case "ArrowRight":
          event.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
          break;
        case "ArrowUp":
          event.preventDefault();
          video.volume = Math.min(1, video.volume + 0.1);
          break;
        case "ArrowDown":
          event.preventDefault();
          video.volume = Math.max(0, video.volume - 0.1);
          break;
        case "KeyM":
          event.preventDefault();
          video.muted = !video.muted;
          break;
        case "KeyF":
          event.preventDefault();
          if (video.requestFullscreen) {
            video.requestFullscreen();
          }
          break;
        case "Escape":
          setIsFullImageOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullImageOpen, imageData]);

  if (isLoading) {
    return (
      <div
        className={`min-h-screen bg-background font-sans ${isRTL ? "font-tajawal" : ""}`}
      >
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-5">
            <div className="flex items-center justify-between h-16">
              <div
                className={`flex items-center gap-1 sm:gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
              >
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
        <main className="container mx-auto max-w-7xl px-4 sm:px-5 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-video bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
                <div className="space-y-2">
                  <div className="h-10 bg-muted rounded"></div>
                  <div className="h-10 bg-muted rounded"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!imageData) {
    return (
      <div
        className={`min-h-screen bg-background font-sans ${isRTL ? "font-tajawal" : ""}`}
      >
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-5">
            <div className="flex items-center justify-between h-16">
              <div
                className={`flex items-center gap-1 sm:gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
              >
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
        <main className="container mx-auto max-w-7xl px-4 sm:px-5 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {`${isRTL ? "لم يتم العثور على الصورة" : "Image Not Found"}`}
            </h1>
            <p className="text-muted-foreground mb-6">
              {`${isRTL ? "لم يتم العثور على الصورة المطلوبة." : " The requested image could not be found."}`}
            </p>
            <Link href="/search">
              <Button>
                <ArrowLeft className="w-4 h-4" />
                {`${isRTL ? "العودة إلى البحث" : "Back to Search"}`}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-background font-sans ${isRTL ? "font-tajawal" : ""}`}
    >
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-5">
          <div className="flex items-center justify-between h-16">
            <div
              className={`flex items-center gap-1 sm:gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
            >
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

      {/* Main Content with Background */}
      <div className="relative min-h-screen bg-gradient-to-br from-primary/15 via-primary/5 to-primary/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-35 dark:opacity-80"></div>

        {/* Floating Decorative Elements */}
        {/* Shape 1 - Grid Dots Pattern (Top Left) */}
        <div
          className={`absolute top-0 ${isRTL ? "right-1/12" : "left-1/12"} transform -translate-x-1/2 md:top-32`}
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

        <main className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-5 py-6 sm:py-12 md:py-20">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className={`flex items-center gap-2 text-muted-foreground hover:text-foreground ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              {t("common.back")}
            </Button>
          </div>

          {/* Image Details Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Side - Image Display (2 columns on desktop) */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg overflow-hidden border border-border">
                {/* Provider Header */}
                <div
                  className={`flex items-center justify-between p-4 border-b border-border bg-card ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <div className="w-10 h-10 rounded flex items-center justify-center">
                      <img
                        src={imageData.providerIcon}
                        alt={imageData.provider}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">${imageData.provider}</span>`;
                          }
                        }}
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">
                        {imageData.provider}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {imageData.file_type.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {isVideoItem() && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-red-500/10 text-red-600 rounded-md">
                      <Camera className="w-3 h-3" />
                      <span className="text-xs font-medium">Video</span>
                    </div>
                  )}
                </div>

                {/* Media Display */}
                <div className="relative bg-card min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] flex items-center justify-center">
                  {/* Video Loading Indicator */}
                  {isVideoItem() && isVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                      <div className="flex items-center gap-2 bg-black/70 text-white px-4 py-2 rounded-lg">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm">Loading video...</span>
                      </div>
                    </div>
                  )}

                  {/* Video Controls Info (only show for videos) */}
                  {isVideoItem() && !isVideoLoading && (
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs z-10 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="space-y-1">
                        <div>Space: Play/Pause</div>
                        <div>←/→: Seek ±10s</div>
                        <div>↑/↓: Volume</div>
                        <div>M: Mute/Unmute</div>
                      </div>
                    </div>
                  )}
                  {isVideoItem() && isValidVideoUrl(imageData.thumbnail) ? (
                    <video
                      className="w-full h-full object-contain max-h-[70vh]"
                      poster={imageData.poster || "/placeholder.png"}
                      controls
                      controlsList="nodownload"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      crossOrigin="anonymous"
                      style={{
                        width: imageData.width
                          ? `${imageData.width}px`
                          : "auto",
                        height: imageData.height
                          ? `${imageData.height}px`
                          : "auto",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                      onLoadedData={async (e) => {
                        const video = e.target as HTMLVideoElement;
                        setIsVideoLoading(false);
                        try {
                          video.currentTime = 1;
                          await new Promise((resolve) => {
                            video.onseeked = resolve;
                          });
                          const thumbnailUrl =
                            await generateVideoThumbnail(video);
                          video.poster = thumbnailUrl;
                        } catch (error) {
                          console.warn(
                            "Failed to generate video thumbnail:",
                            error
                          );
                        }
                      }}
                      onError={(e) => {
                        console.warn("Video load error, showing as image");
                        setIsVideoLoading(false);
                        const video = e.target as HTMLVideoElement;
                        video.style.display = "none";
                        const container = video.parentElement;
                        if (container) {
                          const fallbackImg = document.createElement("img");
                          fallbackImg.src = imageData.thumbnail;
                          fallbackImg.alt = imageData.title;
                          fallbackImg.className =
                            "w-full h-full object-contain max-h-[70vh]";
                          container.appendChild(fallbackImg);
                        }
                      }}
                      onCanPlay={() => {
                        console.log("Video can start playing");
                        setIsVideoLoading(false);
                      }}
                      onLoadStart={() => {
                        console.log("Video load started");
                        setIsVideoLoading(true);
                      }}
                      onWaiting={() => {
                        setIsVideoLoading(true);
                      }}
                      onPlaying={() => {
                        setIsVideoLoading(false);
                      }}
                    >
                      {/* Multiple source elements for better browser compatibility */}
                      <source
                        src={imageData.thumbnail}
                        type={getVideoMimeType(imageData.thumbnail)}
                      />
                      {/* Fallback message for browsers that don't support video */}
                      <p className="text-muted-foreground text-center p-4">
                        Your browser does not support the video tag.
                        <a
                          href={imageData.thumbnail}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-1"
                        >
                          Download the video
                        </a>
                      </p>
                    </video>
                  ) : (
                    <img
                      src={imageData.thumbnail}
                      alt={imageData.title}
                      className="w-full h-full object-contain max-h-[70vh]"
                      style={{
                        width: imageData.width
                          ? `${imageData.width}px`
                          : "auto",
                        height: imageData.height
                          ? `${imageData.height}px`
                          : "auto",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "/placeholder.png";
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Details and Actions (1 column on desktop) */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Image Title */}
                <div className="p-4 border-b border-border">
                  <h1 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {imageData.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>ID: {imageData.file_id}</span>
                  </div>
                </div>

                {/* Basic Details */}
                <div className="p-4 space-y-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">
                    Basic Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        {getFileTypeIcon(imageData.file_type)}
                        {t("search.filters.fileType")}
                      </span>
                      <Badge variant="secondary">
                        {imageData.file_type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {t("search.filters.providers")}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {imageData.provider}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ID</span>
                      <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        {imageData.file_id}
                      </span>
                    </div>
                    {imageData.width && imageData.height && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {t("common.dimensions")}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {imageData.width} × {imageData.height}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {t("common.type")}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {imageData.image_type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Provider Data Loading */}
                {isProviderDataLoading && (
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <h3 className="font-semibold text-foreground">
                        Loading Enhanced Details...
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {/* Keywords Loading */}
                      <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <div className="flex flex-wrap gap-1">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton
                              key={i}
                              className="h-6 w-16 rounded-full"
                            />
                          ))}
                        </div>
                      </div>

                      {/* High Resolution Loading */}
                      <div>
                        <Skeleton className="h-4 w-32 mb-2" />
                        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-3 w-2/3" />
                          <Skeleton className="h-8 w-full" />
                        </div>
                      </div>

                      {/* Related Files Loading */}
                      <div>
                        <Skeleton className="h-4 w-28 mb-2" />
                        <div className="space-y-2">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex gap-3 p-3 border rounded-lg"
                            >
                              <Skeleton className="w-16 h-16 rounded-lg" />
                              <div className="flex-1 space-y-2">
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-2/3" />
                                <Skeleton className="h-6 w-20" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {providerDataError && (
                  <div className="p-4 border-b border-border">
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-destructive mb-1">
                            Failed to Load Enhanced Details
                          </h4>
                          <p className="text-sm text-destructive/80">
                            {providerDataError}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 h-8 text-xs border-destructive/20 hover:bg-destructive/5"
                            onClick={() =>
                              imageData && fetchProviderData(imageData)
                            }
                          >
                            Try Again
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {fileData && (
                  <>
                    {/* Enhanced File Information */}
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Enhanced Information
                      </h3>
                      <div className="bg-primary/5 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Title:
                          </span>
                          <span className="text-sm font-medium text-right max-w-[60%]">
                            {fileData.title}
                          </span>
                        </div>

                        {fileData.keywords && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Keywords Available:
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {fileData.keywords.length} tags
                            </Badge>
                          </div>
                        )}

                        {fileData.high_resolution && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              High-Res Available:
                            </span>
                            <Badge
                              variant="default"
                              className="text-xs bg-green-600"
                            >
                              ✓ Available
                            </Badge>
                          </div>
                        )}

                        {fileData.related && fileData.related.length > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Related Files:
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {fileData.related.length} files
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Keywords */}
                    {fileData.keywords && fileData.keywords.length > 0 && (
                      <div className="p-4 border-b border-border">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Keywords ({fileData.keywords.length})
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {fileData.keywords.map((keyword, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs px-2 py-1 hover:bg-primary/10 transition-colors cursor-pointer"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        {fileData.keywords.length > 10 && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Showing all {fileData.keywords.length} keywords
                          </p>
                        )}
                      </div>
                    )}

                    {/* High Resolution Info */}
                    {fileData.high_resolution && (
                      <div className="p-4 border-b border-border">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          High Resolution Details
                        </h3>
                        <div className="bg-muted/30 rounded-lg p-3 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Dimensions:
                            </span>
                            <Badge variant="outline" className="font-mono">
                              {fileData.high_resolution.width} ×{" "}
                              {fileData.high_resolution.height}
                            </Badge>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Aspect Ratio:
                            </span>
                            <span className="text-sm font-medium">
                              {(
                                fileData.high_resolution.width /
                                fileData.high_resolution.height
                              ).toFixed(2)}
                              :1
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Total Pixels:
                            </span>
                            <span className="text-sm font-medium">
                              {(
                                (fileData.high_resolution.width *
                                  fileData.high_resolution.height) /
                                1000000
                              ).toFixed(1)}
                              MP
                            </span>
                          </div>

                          <div className="pt-2 border-t border-border/50">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              asChild
                            >
                              <a
                                href={fileData.high_resolution.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                                View High Resolution Image
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Related Files */}
                    {fileData.related && fileData.related.length > 0 && (
                      <div className="p-4 border-b border-border">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <FileIcon className="w-4 h-4" />
                          Related Files ({fileData.related.length})
                        </h3>
                        <div className="space-y-3">
                          {fileData.related
                            .slice(0, 5)
                            .map((related, index) => (
                              <div
                                key={index}
                                className="group flex gap-3 p-3 border rounded-lg hover:bg-muted/30 hover:border-primary/20 transition-all duration-200"
                              >
                                <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={related.preview.src}
                                    alt={related.metadata.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                    onError={(e) => {
                                      const target =
                                        e.target as HTMLImageElement;
                                      target.src = "/placeholder.png";
                                    }}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                                    {related.metadata.title}
                                  </p>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      ID: {related.file_id}
                                    </Badge>
                                    {related.preview.width &&
                                      related.preview.height && (
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          {related.preview.width} ×{" "}
                                          {related.preview.height}
                                        </Badge>
                                      )}
                                  </div>
                                  {related.metadata.description && (
                                    <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                                      {related.metadata.description}
                                    </p>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 text-xs"
                                    asChild
                                  >
                                    <a
                                      href={related.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      View Details
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            ))}
                          {fileData.related.length > 5 && (
                            <div className="text-center pt-2">
                              <p className="text-xs text-muted-foreground">
                                Showing 5 of {fileData.related.length} related
                                files
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Action Buttons */}
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-foreground mb-4">
                    {`${isRTL ? "الإجراءات السريعة" : "Quick Actions"}`}
                  </h3>

                  {/* Download Button */}
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    {isDownloading
                      ? "Downloading..."
                      : t("search.actions.download")}
                  </Button>

                  {/* View Similar Button */}
                  <Button className="w-full">
                    <Eye className="w-4 h-4" />
                    {t("search.actions.simillars")}
                  </Button>

                  {/* View Full Media Button */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsFullImageOpen(true)}
                  >
                    <Eye className="w-4 h-4" />
                    {isVideoItem()
                      ? `${isRTL ? "عرض الفيديو بالحجم الكامل" : "View Full Video"}`
                      : t("search.imageDialog.viewFullImage")}
                  </Button>

                  {/* External Link Button */}
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={imageData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on {imageData.provider}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Full Screen Media Dialog */}
        <Dialog open={isFullImageOpen} onOpenChange={setIsFullImageOpen}>
          <DialogTitle className="sr-only">
            {isVideoItem() ? "Full Video View" : "Full Image View"}
          </DialogTitle>
          <DialogContent
            className="!max-w-[95vw] !max-h-[95vh] w-full h-full p-0 overflow-hidden border-none rounded-xl bg-black/95"
            showCloseButton={false}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullImageOpen(false)}
                className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} z-20 w-10 h-10 p-0 bg-black/50 hover:bg-black/70 text-white hover:text-white border rounded-none border-white/40`}
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Video Loading Indicator for Full Screen */}
              {isVideoItem() && isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-15">
                  <div className="flex items-center gap-2 bg-black/80 text-white px-6 py-3 rounded-lg">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading video...</span>
                  </div>
                </div>
              )}

              {/* Full Screen Video Controls Info */}
              {isVideoItem() && !isVideoLoading && (
                <div
                  className={`absolute top-4 ${isRTL ? "right-16" : "left-4"} bg-black/80 text-white px-4 py-3 rounded-lg text-sm z-15 opacity-0 hover:opacity-100 transition-opacity`}
                >
                  <div className="space-y-1">
                    <div className="font-medium mb-2">Video Controls:</div>
                    <div>Space: Play/Pause</div>
                    <div>←/→: Seek ±10s</div>
                    <div>↑/↓: Volume</div>
                    <div>M: Mute/Unmute</div>
                    <div>F: Fullscreen</div>
                    <div>Esc: Close</div>
                  </div>
                </div>
              )}

              {/* Full Size Media */}
              {isVideoItem() && isValidVideoUrl(imageData.thumbnail) ? (
                <video
                  className="max-w-full max-h-full object-contain"
                  poster={imageData.poster || "/placeholder.png"}
                  controls
                  controlsList="nodownload"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    console.warn(
                      "Full screen video load error, showing as image"
                    );
                    setIsVideoLoading(false);
                    const video = e.target as HTMLVideoElement;
                    video.style.display = "none";
                    const container = video.parentElement;
                    if (container) {
                      const fallbackImg = document.createElement("img");
                      fallbackImg.src = imageData.thumbnail;
                      fallbackImg.alt = imageData.title;
                      fallbackImg.className =
                        "max-w-full max-h-full object-contain";
                      container.appendChild(fallbackImg);
                    }
                  }}
                  onCanPlay={() => {
                    console.log("Full screen video can start playing");
                    setIsVideoLoading(false);
                  }}
                  onLoadStart={() => {
                    console.log("Full screen video load started");
                    setIsVideoLoading(true);
                  }}
                  onPlay={() => {
                    console.log("Full screen video started playing");
                    setIsVideoLoading(false);
                  }}
                  onPause={() => {
                    console.log("Full screen video paused");
                  }}
                  onWaiting={() => {
                    setIsVideoLoading(true);
                  }}
                  onPlaying={() => {
                    setIsVideoLoading(false);
                  }}
                  onLoadedData={() => {
                    setIsVideoLoading(false);
                  }}
                >
                  {/* Multiple source elements for better browser compatibility */}
                  <source
                    src={imageData.thumbnail}
                    type={getVideoMimeType(imageData.thumbnail)}
                  />
                  {/* Fallback message for browsers that don't support video */}
                  <p className="text-white text-center p-4">
                    Your browser does not support the video tag.
                    <a
                      href={imageData.thumbnail}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline ml-1"
                    >
                      Download the video
                    </a>
                  </p>
                </video>
              ) : (
                <img
                  src={imageData.thumbnail}
                  alt={imageData.title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = "/placeholder.png";
                  }}
                />
              )}

              {/* Media Info Overlay */}
              <div
                className={`absolute bottom-6 sm:bottom-2 ${isRTL ? "left-0 sm:right-8" : "left-0 sm:left-8"} bg-black/70 text-white p-3 rounded-lg border border-white/20 max-w-sm`}
              >
                <div className="font-medium text-sm mb-1 flex items-center gap-2">
                  {isVideoItem() && <Camera className="w-3 h-3 text-red-400" />}
                  {imageData.title}
                </div>
                <div className="text-xs text-white/80">
                  {imageData.file_id} • {imageData.provider}
                </div>
                <div className="text-xs text-white/80">
                  {imageData.image_type}
                  {isVideoItem() && " • Video Content"}
                </div>
                {isVideoItem() && (
                  <div className="text-xs text-white/60 mt-1">
                    Use keyboard controls for better experience
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

"use client";

import {
  CalendarDays,
  CreditCard,
  Download,
  ExternalLink,
  Filter,
  ImageIcon,
  Video,
  TrendingUp,
  Settings,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ProfilePageSkeleton,
  DownloadHistoryItemSkeleton,
} from "@/components/profile-page-skeletons";
import { useTranslation } from "react-i18next";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/i18n-provider";
import { HeaderControls } from "@/components/header-controls";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// Fake data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/placeholder.svg?height=120&width=120",
  joinDate: "2023-06-15",
  subscription: {
    status: "active",
    validUntil: "2024-12-31",
    plan: "Premium",
  },
  credits: {
    total: 500,
    used: 247,
    remaining: 253,
  },
};

const downloadHistory = [
  {
    id: 1,
    title: "Modern Business Team Meeting",
    type: "image",
    credits: 5,
    downloadDate: "2024-01-15",
    url: "https://freepik.com/example-1",
    thumbnail: "/placeholder.png",
  },
  {
    id: 2,
    title: "Corporate Presentation Video",
    type: "video",
    credits: 15,
    downloadDate: "2024-01-14",
    url: "https://freepik.com/example-2",
    thumbnail: "/placeholder.png",
  },
  {
    id: 3,
    title: "Abstract Background Design",
    type: "image",
    credits: 3,
    downloadDate: "2024-01-13",
    url: "https://freepik.com/example-3",
    thumbnail: "/placeholder.png",
  },
  {
    id: 4,
    title: "Marketing Infographic Template",
    type: "image",
    credits: 8,
    downloadDate: "2024-01-12",
    url: "https://freepik.com/example-4",
    thumbnail: "/placeholder.png",
  },
  {
    id: 5,
    title: "Social Media Animation",
    type: "video",
    credits: 12,
    downloadDate: "2024-01-11",
    url: "https://freepik.com/example-5",
    thumbnail: "/placeholder.png",
  },
  {
    id: 6,
    title: "Brand Identity Package",
    type: "image",
    credits: 10,
    downloadDate: "2024-01-10",
    url: "https://freepik.com/example-6",
    thumbnail: "/placeholder.png",
  },
  {
    id: 7,
    title: "Brand Identity Package",
    type: "image",
    credits: 10,
    downloadDate: "2024-01-10",
    url: "https://freepik.com/example-6",
    thumbnail: "/placeholder.png",
  },
];

export default function ProfilePage() {
  const [sortFilter, setSortFilter] = useState("newest");
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isDownloadHistoryLoading, setIsDownloadHistoryLoading] =
    useState(false);
  const { isRTL, isLoading } = useLanguage();
  const { t } = useTranslation("common");

  // Simulate profile data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProfileLoading(false);
    }, 1000); // Simulate 1 second loading time
    return () => clearTimeout(timer);
  }, []);

  // Simulate download history loading when sort filter changes
  useEffect(() => {
    if (!isProfileLoading) {
      setIsDownloadHistoryLoading(true);
      const timer = setTimeout(() => {
        setIsDownloadHistoryLoading(false);
      }, 800); // Simulate 0.8 second loading time for filter changes
      return () => clearTimeout(timer);
    }
  }, [sortFilter, isProfileLoading]);

  // Show loading skeleton while language data or profile data is loading
  if (isLoading || isProfileLoading) {
    return <ProfilePageSkeleton />;
  }

  const sortedDownloads = [...downloadHistory].sort((a, b) => {
    switch (sortFilter) {
      case "newest":
        return (
          new Date(b.downloadDate).getTime() -
          new Date(a.downloadDate).getTime()
        );
      case "oldest":
        return (
          new Date(a.downloadDate).getTime() -
          new Date(b.downloadDate).getTime()
        );
      case "credits-high":
        return b.credits - a.credits;
      case "credits-low":
        return a.credits - b.credits;
      default:
        return 0;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const creditsUsedPercentage =
    (userData.credits.used / userData.credits.total) * 100;

  return (
    <div
      className={`min-h-screen bg-secondary/50 ${isRTL ? "font-tajawal" : "font-sans"}`}
    >
      {/* Header */}
      <header className="bg-background border-b border-border">
        <header className="max-w-6xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className={`flex items-center ${isRTL ? "space-x-reverse !space-x-2" : "space-x-2"}`}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
              </div>
              <span className="text-lg sm:text-xl font-semibold text-foreground">
                {t("header.logo")}
              </span>
            </Link>
            <HeaderControls />
          </div>
        </header>
      </header>
      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-5 py-6 sm:py-8 space-y-4 sm:space-y-5">
        {/* User Info Section */}
        <Card className="overflow-hidden dark:bg-muted/50 border-none shadow-xs py-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="relative p-6 sm:p-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl"></div>
            {/* Content */}
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                {/* Avatar Section */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <Avatar className="relative h-24 w-24 sm:h-28 sm:w-28 border-4 border-background/80 backdrop-blur-sm">
                    <AvatarImage
                      src={userData.avatar || "/placeholder.svg"}
                      alt={userData.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online Status Indicator */}
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-background rounded-full animate-pulse"></div>
                </div>
                {/* User Info */}
                <div className="text-center sm:text-left flex-1 space-y-4">
                  <div className="space-y-2 flex flex-col">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                      {userData.name}
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground font-medium">
                      {userData.email}
                    </p>
                    {/* Status Badges */}
                    <div>
                      <Badge
                        variant="outline"
                        className="px-4 py-2 text-sm font-semibold bg-secondary/80 hover:bg-secondary transition-colors"
                      >
                        <CreditCard
                          className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`}
                        />
                        {userData.subscription.plan}{" "}
                        {t("profile.userInfo.member")}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Total Downloads Card */}
          <Card className="group dark:bg-muted/50">
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="space-y-3 sm:space-y-4 flex-1">
                  <div
                    className={`flex items-center ${isRTL ? "space-x-reverse !space-x-3" : "space-x-3"}`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-medium text-foreground uppercase tracking-wide">
                        {t("profile.stats.totalDownloads.title")}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground/80">
                        {t("profile.stats.totalDownloads.description")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className={`flex items-baseline ${isRTL ? "space-x-reverse !space-x-2" : "space-x-2"}`}
                    >
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {downloadHistory.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Credits Used Card */}
          <Card className="group dark:bg-muted/50">
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="space-y-3 sm:space-y-4 flex-1">
                  <div
                    className={`flex items-center ${isRTL ? "space-x-reverse !space-x-3" : "space-x-3"}`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-medium text-foreground uppercase tracking-wide">
                        {t("profile.stats.creditsUsed.title")}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground/80">
                        {t("profile.stats.creditsUsed.description")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className={`flex items-baseline ${isRTL ? "space-x-reverse !space-x-2" : "space-x-2"}`}
                    >
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {userData.credits.used}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Credits Remaining Card */}
          <Card className="group dark:bg-muted/50">
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="space-y-3 sm:space-y-4 flex-1">
                  <div
                    className={`flex items-center ${isRTL ? "space-x-reverse !space-x-3" : "space-x-3"}`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-medium text-foreground uppercase tracking-wide">
                        {t("profile.stats.creditsRemaining.title")}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground/80">
                        {t("profile.stats.creditsRemaining.description")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className={`flex items-baseline ${isRTL ? "space-x-reverse !space-x-2" : "space-x-2"}`}
                    >
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {userData.credits.remaining}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Plan Status Card */}
          <Card className="group dark:bg-muted/50">
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="space-y-3 sm:space-y-4 flex-1">
                  <div
                    className={`flex items-center ${isRTL ? "space-x-reverse !space-x-3" : "space-x-3"}`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center relative">
                      <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      {userData.subscription.status === "active" && (
                        <div
                          className={`absolute -top-1 w-3 h-3 bg-green-500 rounded-full animate-pulse ${isRTL ? "-left-1" : "-right-1"}`}
                        ></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-medium text-foreground uppercase tracking-wide">
                        {t("profile.stats.planStatus.title")}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground/80">
                        {t("profile.stats.planStatus.description")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className={`flex items-baseline ${isRTL ? "space-x-reverse !space-x-2" : "space-x-2"}`}
                    >
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors capitalize">
                        {t("profile.userInfo.active")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Subscription & Credits */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5">
            {/* Subscription Card */}
            <Card className="dark:bg-muted/50">
              <CardHeader>
                <div
                  className={`flex items-center ${isRTL ? "space-x-reverse !space-x-3" : "space-x-3"}`}
                >
                  <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {t("profile.subscription.title")}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {t("profile.subscription.description")}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {t("profile.subscription.currentPlan")}
                    </span>
                    <Badge variant="secondary" className="font-medium">
                      {userData.subscription.plan}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {t("profile.subscription.status")}
                    </span>
                    <Badge
                      variant={
                        userData.subscription.status === "active"
                          ? "default"
                          : "destructive"
                      }
                      className={
                        userData.subscription.status === "active"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : ""
                      }
                    >
                      {t("profile.userInfo.active")}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {t("profile.subscription.validUntil")}
                    </span>
                    <div
                      className={`flex items-center gap-1 text-sm text-foreground ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(userData.subscription.validUntil)}
                    </div>
                  </div>
                </div>
                <Separator />
                <Button className="w-full" variant="outline">
                  <Settings className="w-4 h-4" />
                  {t("profile.subscription.manageSubscription")}
                </Button>
              </CardContent>
            </Card>
            {/* Credits Card */}
            <Card className="dark:bg-muted/50">
              <CardHeader>
                <div
                  className={`flex items-center ${isRTL ? "space-x-reverse !space-x-3" : "space-x-3"}`}
                >
                  <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {t("profile.credits.title")}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {t("profile.credits.description")}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div className="text-center space-y-2 w-fit bg-secondary/75 dark:bg-secondary  p-4 rounded-xl">
                    <div className="text-3xl font-bold text-primary">
                      {userData.credits.remaining}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("profile.credits.remaining")}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">
                      {t("profile.credits.usageProgress")}
                    </span>
                    <span className="font-medium text-foreground">
                      {Math.round(creditsUsedPercentage)}%
                    </span>
                  </div>
                  <Progress value={creditsUsedPercentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {userData.credits.used} {t("profile.credits.used")}
                    </span>
                    <span>
                      {userData.credits.total} {t("profile.credits.total")}
                    </span>
                  </div>
                </div>
                <Separator />
                <Button className="w-full">
                  <CreditCard className="w-4 h-4" />
                  {t("profile.credits.buyMore")}
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* Download History */}
          <Card className="lg:col-span-2 dark:bg-muted/50">
            <CardHeader className="w-full flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="w-full max-w-lg">
                <div
                  className={`flex items-center ${isRTL ? "space-x-reverse !space-x-3" : "space-x-3"}`}
                >
                  <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {t("profile.downloadHistory.title")}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      {t("profile.downloadHistory.description")}
                    </CardDescription>
                  </div>
                </div>
              </div>
              <div
                className={`w-full flex flex-col sm:flex-row items-stretch md:justify-end space-y-3 sm:space-y-0 ${isRTL ? "sm:space-x-reverse sm:!space-x-3" : "sm:space-x-3"}`}
              >
                <Select value={sortFilter} onValueChange={setSortFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="w-4 h-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">
                      {t("profile.downloadHistory.filters.newest")}
                    </SelectItem>
                    <SelectItem value="oldest">
                      {t("profile.downloadHistory.filters.oldest")}
                    </SelectItem>
                    <SelectItem value="credits-high">
                      {t("profile.downloadHistory.filters.creditsHigh")}
                    </SelectItem>
                    <SelectItem value="credits-low">
                      {t("profile.downloadHistory.filters.creditsLow")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[520px] overflow-y-auto">
                {isDownloadHistoryLoading ? (
                  // Show loading skeletons while download history is loading
                  Array.from({ length: 5 }, (_, i) => (
                    <DownloadHistoryItemSkeleton key={i} isRTL={isRTL} />
                  ))
                ) : sortedDownloads.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <Download className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {t("profile.downloadHistory.empty.title")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("profile.downloadHistory.empty.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  sortedDownloads.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-all duration-200 group"
                    >
                      <div className="relative shrink-0">
                        <Image
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-lg object-cover border"
                        />
                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1.5">
                          {item.type === "image" ? (
                            <ImageIcon className="h-3 w-3" />
                          ) : (
                            <Video className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base truncate group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <div
                          className={`flex flex-wrap items-center gap-2 mt-2 ${isRTL ? "justify-end" : ""}`}
                        >
                          <Badge variant="outline" className="text-xs">
                            {item.credits}{" "}
                            {t("profile.downloadHistory.credits")}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.downloadDate)}
                          </span>
                          <Badge
                            variant="secondary"
                            className="text-xs capitalize"
                          >
                            {t(`profile.downloadHistory.types.${item.type}`)}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(item.url, "_blank")}
                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
              {!isDownloadHistoryLoading && sortedDownloads.length > 6 && (
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    {t("profile.downloadHistory.loadMore")}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

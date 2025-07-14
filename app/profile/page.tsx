"use client";

import {
  CalendarDays,
  CreditCard,
  Download,
  Filter,
  TrendingUp,
  Settings,
  Activity,
  Search,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
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
import {
  ProfilePageSkeleton,
  DownloadHistoryItemSkeleton,
} from "@/components/profile-page-skeletons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/i18n-provider";
import { HeaderControls } from "@/components/header-controls";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    source: "shutterstock",
    sourceIcon: "🖼️",
    debugId: "f8240...",
    fileId: "410883247",
    fileUrl: "https://shutterstock.com/410883247",
    format: "JPG",
    size: "0.5",
    previewImage: "/placeholder.png",
    sourceUrl: "shutterstock.com • 410883247",
    downloadUrl: "https://shutterstock.com/download/410883247",
  },
  {
    id: 2,
    title: "Corporate Presentation Video",
    type: "video",
    credits: 15,
    downloadDate: "2024-01-14",
    url: "https://freepik.com/example-2",
    thumbnail: "/placeholder.png",
    source: "shutterstock",
    sourceIcon: "🖼️",
    debugId: "6ac79...",
    fileId: "2174049579",
    fileUrl: "https://shutterstock.com/2174049579",
    format: "EPS",
    size: "0.5",
    previewImage: "/placeholder.png",
    sourceUrl: "shutterstock.com • 2174049579",
    downloadUrl: "https://shutterstock.com/download/2174049579",
  },
  {
    id: 3,
    title: "Abstract Background Design",
    type: "image",
    credits: 3,
    downloadDate: "2024-01-13",
    url: "https://freepik.com/example-3",
    thumbnail: "/placeholder.png",
    source: "shutterstock",
    sourceIcon: "🖼️",
    debugId: "a1b2c...",
    fileId: "123456789",
    fileUrl: "https://shutterstock.com/123456789",
    format: "JPG",
    size: "1.2",
    previewImage: "/placeholder.png",
    sourceUrl: "shutterstock.com • 123456789",
    downloadUrl: "https://shutterstock.com/download/123456789",
  },
  {
    id: 4,
    title: "Marketing Infographic Template",
    type: "image",
    credits: 8,
    downloadDate: "2024-01-12",
    url: "https://freepik.com/example-4",
    thumbnail: "/placeholder.png",
    source: "freepik",
    sourceIcon: "🎨",
    debugId: "d4e5f...",
    fileId: "987654321",
    fileUrl: "https://freepik.com/987654321",
    format: "AI",
    size: "2.1",
    previewImage: "/placeholder.png",
    sourceUrl: "freepik.com • 987654321",
    downloadUrl: "https://freepik.com/download/987654321",
  },
  {
    id: 5,
    title: "Social Media Animation",
    type: "video",
    credits: 12,
    downloadDate: "2024-01-11",
    url: "https://freepik.com/example-5",
    thumbnail: "/placeholder.png",
    source: "shutterstock",
    sourceIcon: "🖼️",
    debugId: "g7h8i...",
    fileId: "555666777",
    fileUrl: "https://shutterstock.com/555666777",
    format: "MP4",
    size: "15.3",
    previewImage: "/placeholder.png",
    sourceUrl: "shutterstock.com • 555666777",
    downloadUrl: "https://shutterstock.com/download/555666777",
  },
  {
    id: 6,
    title: "Brand Identity Package",
    type: "image",
    credits: 10,
    downloadDate: "2024-01-10",
    url: "https://freepik.com/example-6",
    thumbnail: "/placeholder.png",
    source: "freepik",
    sourceIcon: "🎨",
    debugId: "j9k0l...",
    fileId: "111222333",
    fileUrl: "https://freepik.com/111222333",
    format: "PSD",
    size: "8.7",
    previewImage: "/placeholder.png",
    sourceUrl: "freepik.com • 111222333",
    downloadUrl: "https://freepik.com/download/111222333",
  },
  {
    id: 7,
    title: "Brand Identity Package",
    type: "image",
    credits: 10,
    downloadDate: "2024-01-10",
    url: "https://freepik.com/example-6",
    thumbnail: "/placeholder.png",
    source: "freepik",
    sourceIcon: "🎨",
    debugId: "j9k0l...",
    fileId: "111222333",
    fileUrl: "https://freepik.com/111222333",
    format: "PSD",
    size: "8.7",
    previewImage: "/placeholder.png",
    sourceUrl: "freepik.com • 111222333",
    downloadUrl: "https://freepik.com/download/111222333",
  },
];

export default function ProfilePage() {
  const [sortFilter, setSortFilter] = useState("newest");
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isDownloadHistoryLoading, setIsDownloadHistoryLoading] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isRTL, isLoading } = useLanguage();
  const { t } = useTranslation("common");

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // Password change handlers
  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert(t("profile.changePassword.error"));
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert(t("profile.changePassword.passwordRequirements"));
      return;
    }

    setIsPasswordLoading(true);

    // Simulate API call
    setTimeout(() => {
      alert(t("profile.changePassword.success"));
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsPasswordLoading(false);
    }, 1500);
  };

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

  // Filter downloads based on search query
  const filteredDownloads = downloadHistory.filter((item) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      item.source.toLowerCase().includes(query) ||
      item.debugId.toLowerCase().includes(query) ||
      item.fileId.toLowerCase().includes(query) ||
      item.fileUrl.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.format.toLowerCase().includes(query)
    );
  });

  const sortedDownloads = [...filteredDownloads].sort((a, b) => {
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
        <header className="px-4 sm:px-5 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className={`flex items-center ${isRTL ? "space-x-reverse !space-x-2" : "space-x-2"}`}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
              </div>
              <span className="text-base sm:text-xl font-semibold text-foreground">
                {t("header.logo")}
              </span>
            </Link>
            <HeaderControls />
          </div>
        </header>
      </header>
      {/* Main Content */}
      <main className="px-5 py-6 sm:py-8 space-y-4 sm:space-y-5">
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
        {/* Subscription, Credits & Change Password Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
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
                  <Badge variant="outline" className="font-medium">
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

          {/* Change Password Card */}
          <Card className="dark:bg-muted/50">
            <CardHeader>
              <div
                className={`flex items-center ${isRTL ? "space-x-reverse !space-x-3" : "space-x-3"}`}
              >
                <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {t("profile.changePassword.title")}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {t("profile.changePassword.description")}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="currentPassword"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("profile.changePassword.currentPassword")}
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          handlePasswordChange(
                            "currentPassword",
                            e.target.value
                          )
                        }
                        placeholder={t(
                          "profile.changePassword.currentPasswordPlaceholder"
                        )}
                        className={`${isRTL ? "pr-10 pl-3" : "pl-3 pr-10"}`}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={`absolute top-1/2 transform -translate-y-1/2 h-8 w-8 ${isRTL ? "left-1" : "right-1"}`}
                        onClick={() => togglePasswordVisibility("current")}
                      >
                        {showPasswords.current ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="newPassword"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("profile.changePassword.newPassword")}
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          handlePasswordChange("newPassword", e.target.value)
                        }
                        placeholder={t(
                          "profile.changePassword.newPasswordPlaceholder"
                        )}
                        className={`${isRTL ? "pr-10 pl-3" : "pl-3 pr-10"}`}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={`absolute top-1/2 transform -translate-y-1/2 h-8 w-8 ${isRTL ? "left-1" : "right-1"}`}
                        onClick={() => togglePasswordVisibility("new")}
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("profile.changePassword.confirmPassword")}
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          handlePasswordChange(
                            "confirmPassword",
                            e.target.value
                          )
                        }
                        placeholder={t(
                          "profile.changePassword.confirmPasswordPlaceholder"
                        )}
                        className={`${isRTL ? "pr-10 pl-3" : "pl-3 pr-10"}`}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={`absolute top-1/2 transform -translate-y-1/2 h-8 w-8 ${isRTL ? "left-1" : "right-1"}`}
                        onClick={() => togglePasswordVisibility("confirm")}
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <p className="text-xs text-muted-foreground">
                    {t("profile.changePassword.passwordRequirements")}
                  </p>
                </div>

                <Separator />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPasswordLoading}
                >
                  {isPasswordLoading ? (
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  {t("profile.changePassword.updatePassword")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        {/* Download History - Full Width */}
        <Card className="dark:bg-muted/50 h-fit">
          <CardHeader className="space-y-6">
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
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search
                  className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`}
                />
                <Input
                  type="text"
                  placeholder="Source / Source ID / URL / Tag / Debug ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${isRTL ? "pr-10 pl-3" : "pl-10 pr-3"} h-10`}
                />
              </div>
              {/* Filter */}
              <div className="flex sm:justify-end w-full sm:w-auto">
                <Select value={sortFilter} onValueChange={setSortFilter}>
                  <SelectTrigger className="w-full sm:w-48">
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
            </div>
          </CardHeader>
          <CardContent>
            {isDownloadHistoryLoading ? (
              // Show loading skeletons while download history is loading
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }, (_, i) => (
                  <DownloadHistoryItemSkeleton key={i} isRTL={isRTL} />
                ))}
              </div>
            ) : sortedDownloads.length === 0 ? (
              <div className="py-12 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <Download className="w-9 h-9 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-medium text-foreground">
                      {t("profile.downloadHistory.empty.title")}
                    </p>
                    <p className="text-base sm:text-lg pt-2 text-muted-foreground">
                      {t("profile.downloadHistory.empty.description")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[450px] overflow-y-auto">
                {sortedDownloads.map((item) => (
                  <div
                    key={item.id}
                    className="bg-secondary/50 dark:bg-muted border rounded-lg p-4 space-y-4 hover:bg-muted/50 transition-all duration-200"
                  >
                    {/* Header with source and debug ID */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.sourceIcon}</span>
                        <span className="font-medium text-foreground">
                          {item.source}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          debugID: {item.debugId}
                        </span>
                      </div>
                    </div>
                    {/* File ID and format info */}
                    <div className="flex items-center justify-between">
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 hover:text-blue-800"
                        onClick={() => window.open(item.fileUrl, "_blank")}
                      >
                        {item.fileId}
                      </Button>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs">
                          {item.format}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {item.size}
                        </span>
                      </div>
                    </div>
                    {/* Preview Image */}
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={item.previewImage || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Footer with source URL and download button */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {item.sourceUrl}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(item.downloadUrl, "_blank")}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        {t("common.download")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!isDownloadHistoryLoading && sortedDownloads.length > 4 && (
              <div className="mt-6 text-center">
                <Button variant="outline">
                  {t("profile.downloadHistory.loadMore")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/components/i18n-provider";
import { AdminRouteGuard } from "@/components/admin-route-guard";
import { Sidebar } from "@/components/sidebar";
import { HeaderControls } from "@/components/header-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Radio,
  Users,
  Send,
  Activity,
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  MoreHorizontal,
  Eye,
  RotateCcw,
  Trash2,
  History,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { userApi, type UsersStatisticsResponse } from "@/lib/api";
import { useAuth } from "@/components/auth-provider";

export default function BroadcastPage() {
  const { t } = useTranslation("common");
  const { isRTL } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // API state for Total Users
  const [usersData, setUsersData] = useState<UsersStatisticsResponse | null>(
    null
  );
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [usersError, setUsersError] = useState<string>("");

  // Form state
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [targetAudience, setTargetAudience] = useState("allUsers");
  const [messageCategory, setMessageCategory] = useState("textOnly");

  // Image upload state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Recent Activity dialog state
  const [isAllActivitiesDialogOpen, setIsAllActivitiesDialogOpen] =
    useState(false);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);

    // Show loading toast
    const uploadToast = toast.loading(
      t("broadcast.form.imageUpload.uploading")
    );

    try {
      // Simulate image upload
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setIsUploadDialogOpen(false);
        setIsUploading(false);

        // Dismiss loading toast and show success
        toast.dismiss(uploadToast);
        toast.success(t("broadcast.form.imageUpload.uploadSuccess"));
      };
      reader.onerror = () => {
        setIsUploading(false);

        // Dismiss loading toast and show error
        toast.dismiss(uploadToast);
        toast.error(t("broadcast.form.imageUpload.uploadError"));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsUploading(false);

      // Dismiss loading toast and show error
      toast.dismiss(uploadToast);
      toast.error(t("broadcast.form.imageUpload.uploadError"));

      console.error("Upload failed:", error);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  // Load users statistics from API
  const loadUsersStatistics = async () => {
    if (!isAuthenticated || !user || user.role !== "admin") {
      return;
    }

    setIsLoadingUsers(true);
    setUsersError("");

    try {
      const response = await userApi.getUsersStatistics();

      if (response.success) {
        // Backend returns different responses based on user type:
        // 1. Subscribed users only: { success: true, total_users: 2, online_users: 0, users: [] }
        // 2. Premium users: { success: true, total_users: 2, online_users: 0, users: [...] }

        // Handle different response structures
        let userData: UsersStatisticsResponse;

        if (response.data) {
          // If wrapped in data property
          userData = response.data as UsersStatisticsResponse;
        } else {
          // If response is direct
          userData = response as unknown as UsersStatisticsResponse;
        }

        setUsersData(userData);
      } else {
        setUsersError(
          response.error?.message || "Failed to load users statistics"
        );
      }
    } catch (error) {
      console.error("Failed to load users statistics:", error);
      setUsersError("Failed to load users statistics");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Load data on component mount only if user is admin
  useEffect(() => {
    // Only load data if user is authenticated and is admin
    if (isAuthenticated && user && user.role === "admin") {
      loadUsersStatistics();
    }
  }, [isAuthenticated, user]);

  const handleSendMessage = async () => {
    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading(t("broadcast.form.sending"));

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo purposes
          // In real implementation, this would be an actual API call
          const isSuccess = Math.random() > 0.2; // 80% success rate
          if (isSuccess) {
            resolve(true);
          } else {
            reject(new Error("API Error"));
          }
        }, 2000);
      });

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success(t("broadcast.toast.sendSuccess"));

      // Reset form on success
      setMessageTitle("");
      setMessageContent("");
      setTargetAudience("allUsers");
      setMessageCategory("textOnly");
      setUploadedImage(null);
    } catch (error) {
      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error(t("broadcast.toast.sendError"));

      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for messages sent today (this could also be from API in the future)
  const messagesSentToday = 89;

  const recentActivity = [
    {
      id: 1,
      type: "broadcast",
      title: "System Maintenance Notice",
      recipients: 1234,
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "notification",
      title: "New Feature Announcement",
      recipients: 987,
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "alert",
      title: "Security Update Required",
      recipients: 2156,
      time: "1 day ago",
    },
    {
      id: 4,
      type: "alert",
      title: "Security Update Required",
      recipients: 2156,
      time: "1 day ago",
    },
    {
      id: 6,
      type: "broadcast",
      title: "Welcome Message for New Users",
      recipients: 456,
      time: "2 days ago",
    },
    {
      id: 7,
      type: "notification",
      title: "Payment Reminder",
      recipients: 789,
      time: "3 days ago",
    },
  ];

  // Extended activity data for "Show All" dialog
  const allActivities = [
    ...recentActivity,
    {
      id: 6,
      type: "broadcast",
      title: "Welcome Message for New Users",
      recipients: 456,
      time: "2 days ago",
    },
    {
      id: 7,
      type: "notification",
      title: "Payment Reminder",
      recipients: 789,
      time: "3 days ago",
    },
    {
      id: 8,
      type: "announcement",
      title: "Holiday Schedule Update",
      recipients: 2847,
      time: "4 days ago",
    },
    {
      id: 9,
      type: "alert",
      title: "Server Maintenance Complete",
      recipients: 1567,
      time: "5 days ago",
    },
    {
      id: 10,
      type: "broadcast",
      title: "Monthly Newsletter",
      recipients: 2234,
      time: "1 week ago",
    },
    {
      id: 11,
      type: "notification",
      title: "Account Verification Required",
      recipients: 345,
      time: "1 week ago",
    },
    {
      id: 12,
      type: "announcement",
      title: "New Terms of Service",
      recipients: 2847,
      time: "2 weeks ago",
    },
  ];

  // Mock data for broadcast messages log
  const broadcastMessages = [
    {
      id: 1,
      broadcastName: "رسالة ترحيب للعملاء الجدد",
      messageContent: "مرحباً بك في مركز الموارد، نحن سعداء لانضمامك إلينا...",
      targetRecipients: 234,
      sentSuccessfully: 231,
      failed: 3,
      date: "2024/01/15",
      time: "14:30",
      status: "completed",
    },
    {
      id: 2,
      broadcastName: "تحديث لشروط الاشتراك",
      messageContent: "نود إعلامكم بتحديث شروط الاشتراك الجديدة...",
      targetRecipients: 89,
      sentSuccessfully: 76,
      failed: 2,
      date: "2024/01/15",
      time: "10:15",
      status: "sending",
    },
    {
      id: 3,
      broadcastName: "عرض خاص لفترة محدودة",
      messageContent: "استفد من عرضنا الخاص بخصم 50% على جميع الخطط...",
      targetRecipients: 156,
      sentSuccessfully: 154,
      failed: 1,
      date: "2024/01/14",
      time: "09:45",
      status: "completed",
    },
  ];

  return (
    <AdminRouteGuard>
      <div
        className={`min-h-screen bg-background ${isRTL ? "font-tajawal" : "font-sans"}`}
      >
        {/* Header */}
        <header
          className={`bg-background border-b border-border px-4 sm:px-5 py-4 ${isRTL ? "lg:mr-72" : "lg:ml-72"}`}
        >
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}
            >
              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="cursor-pointer lg:hidden p-2 hover:bg-muted rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-5 h-5 text-muted-foreground" />
              </button>
              <Link
                href="/"
                className="flex items-center gap-1 sm:gap-2 cursor-pointer"
              >
                <div
                  className={`${isRTL && "ml-2"} w-8 h-8 bg-primary rounded-lg flex items-center justify-center`}
                >
                  <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
                </div>
                <span className="text-base sm:text-xl font-semibold text-foreground">
                  {t("header.logo")}
                </span>
              </Link>
            </div>
            <HeaderControls />
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* Main Content */}
          <main
            className={`flex-1 ${isRTL ? "lg:mr-72" : "lg:ml-72"} p-4 sm:p-5 space-y-4 sm:space-y-5 bg-secondary/50`}
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Total Users Card */}
              <Card className="group dark:bg-muted/50">
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 sm:space-y-4 flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center">
                          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-medium text-foreground uppercase tracking-wide">
                            {t("broadcast.stats.totalUsers.title")}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground/80">
                            {t("broadcast.stats.totalUsers.description")}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {isLoadingUsers ? (
                              <span className="text-muted-foreground">
                                Loading...
                              </span>
                            ) : usersError ? (
                              <span className="text-destructive">Error</span>
                            ) : (
                              usersData?.total_users?.toLocaleString() || "0"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Messages Sent Today Card */}
              <Card className="group dark:bg-muted/50">
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 sm:space-y-4 flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center">
                          <Send className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-medium text-foreground uppercase tracking-wide">
                            {t("broadcast.stats.messagesSentToday.title")}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground/80">
                            {t("broadcast.stats.messagesSentToday.description")}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {messagesSentToday.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-5">
              {/* Broadcast Form - Center (3 columns) */}
              <div className="lg:col-span-4">
                <Card className="dark:bg-muted/50">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                        <Radio className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base sm:text-lg font-semibold text-foreground">
                          {t("broadcast.form.title")}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {t("broadcast.form.description")}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Message Title */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="messageTitle"
                        className="text-sm font-medium"
                      >
                        {t("broadcast.form.messageTitle")}
                      </Label>
                      <Input
                        id="messageTitle"
                        value={messageTitle}
                        onChange={(e) => setMessageTitle(e.target.value)}
                        placeholder={t(
                          "broadcast.form.placeholders.messageTitle"
                        )}
                        className={`w-full ${isRTL ? "text-right" : "text-left"}`}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>

                    {/* Message Content */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="messageContent"
                        className="text-sm font-medium"
                      >
                        {t("broadcast.form.messageContent")}
                      </Label>
                      <Textarea
                        id="messageContent"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        placeholder={t(
                          "broadcast.form.placeholders.messageContent"
                        )}
                        rows={6}
                        className={`w-full resize-none ${isRTL ? "text-right" : "text-left"}`}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>

                    {/* Message Category */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {t("broadcast.form.messageCategory")}
                      </Label>
                      <Select
                        value={messageCategory}
                        onValueChange={setMessageCategory}
                      >
                        <SelectTrigger
                          className={`w-full sm:w-auto ${isRTL ? "text-right" : "text-left"}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="textOnly">
                            {t("broadcast.form.textOnly")}
                          </SelectItem>
                          <SelectItem value="textWithImage">
                            {t("broadcast.form.textWithImage")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Image Upload - Show when Text with Image is selected */}
                    {messageCategory === "textWithImage" && (
                      <div className="space-y-4">
                        {!uploadedImage ? (
                          <Dialog
                            open={isUploadDialogOpen}
                            onOpenChange={setIsUploadDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" className="w-full">
                                <Upload className="w-4 h-4" />
                                {t("broadcast.form.uploadImage")}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>
                                  {t("broadcast.form.imageUpload.title")}
                                </DialogTitle>
                                <DialogDescription>
                                  {t("broadcast.form.imageUpload.description")}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div
                                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                                  onClick={() =>
                                    document
                                      .getElementById("image-upload")
                                      ?.click()
                                  }
                                  onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files[0];
                                    if (
                                      file &&
                                      file.type.startsWith("image/")
                                    ) {
                                      handleImageUpload(file);
                                    }
                                  }}
                                  onDragOver={(e) => e.preventDefault()}
                                >
                                  <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                  <p className="text-sm font-medium text-foreground mb-2">
                                    {t(
                                      "broadcast.form.imageUpload.dragAndDrop"
                                    )}
                                  </p>
                                  <p className="text-xs text-muted-foreground mb-4">
                                    {t(
                                      "broadcast.form.imageUpload.orClickToBrowse"
                                    )}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {t(
                                      "broadcast.form.imageUpload.supportedFormats"
                                    )}
                                  </p>
                                </div>
                                <input
                                  id="image-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      handleImageUpload(file);
                                    }
                                  }}
                                />
                                {isUploading && (
                                  <div className="text-center">
                                    <p className="text-sm text-muted-foreground">
                                      {t(
                                        "broadcast.form.imageUpload.uploading"
                                      )}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              {t("broadcast.form.imageUpload.imagePreview")}
                            </Label>
                            <div className="relative border rounded-lg p-4 bg-muted/30">
                              <Image
                                src={uploadedImage}
                                alt="Uploaded"
                                fill
                                className="max-w-full h-40 object-cover rounded mx-auto"
                              />
                              <div className="flex gap-2 mt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={handleRemoveImage}
                                  className="flex-1"
                                >
                                  <X className="w-4 h-4" />
                                  {t("broadcast.form.imageUpload.removeImage")}
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Target Audience */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {t("broadcast.form.targetAudience")}
                      </Label>
                      <Select
                        value={targetAudience}
                        onValueChange={setTargetAudience}
                      >
                        <SelectTrigger
                          className={`w-full sm:w-auto ${isRTL ? "text-right" : "text-left"}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allUsers">
                            {t("broadcast.form.allUsers")}
                          </SelectItem>
                          <SelectItem value="activeUsers">
                            {t("broadcast.form.activeUsers")}
                          </SelectItem>
                          <SelectItem value="premiumUsers">
                            {t("broadcast.form.premiumUsers")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Send Button */}
                    <div className="pt-4">
                      <Button
                        onClick={handleSendMessage}
                        disabled={isLoading || !messageTitle || !messageContent}
                        className="w-full sm:w-auto"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {t("broadcast.form.sending")}
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            {t("broadcast.form.send")}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Left Sidebar - Recent Activity */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-5">
                {/* Recent Activity Card */}
                <Card className="dark:bg-muted/50">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                        <Activity className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold text-foreground">
                          {t("broadcast.recentActivity.title")}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {t("broadcast.recentActivity.description")}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {recentActivity.length > 0 ? (
                      <div className="space-y-4">
                        <div className="space-y-3">
                          {recentActivity.map((activity) => (
                            <div
                              key={activity.id}
                              className="flex items-start space-x-3 p-3 rounded-lg bg-muted hover:bg-muted/50 transition-colors duration-200"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {activity.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {activity.recipients.toLocaleString()}{" "}
                                  recipients • {activity.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-border">
                          <Dialog
                            open={isAllActivitiesDialogOpen}
                            onOpenChange={setIsAllActivitiesDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                <Eye className="w-4 h-4" />
                                {t("broadcast.recentActivity.showAll")}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden">
                              <DialogHeader>
                                <DialogTitle>
                                  {t(
                                    "broadcast.recentActivity.allActivities.title"
                                  )}
                                </DialogTitle>
                                <DialogDescription>
                                  {t(
                                    "broadcast.recentActivity.allActivities.description"
                                  )}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="max-h-[60vh] overflow-y-auto">
                                <div className="space-y-3 pr-2">
                                  {allActivities.map((activity) => (
                                    <div
                                      key={activity.id}
                                      className="flex items-start space-x-3 p-3 rounded-lg bg-muted hover:bg-muted/50 transition-colors duration-200"
                                    >
                                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                          {activity.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                          {activity.recipients.toLocaleString()}{" "}
                                          recipients • {activity.time}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {t("broadcast.recentActivity.noActivity")}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t("broadcast.recentActivity.noActivityDescription")}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Broadcast Messages Log Section */}
            <Card className="dark:bg-muted/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                    <History className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {t("broadcast.messagesLog.title")}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {t("broadcast.messagesLog.description")}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {broadcastMessages.length > 0 ? (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto max-h-[400px] overflow-y-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th
                              className={`${isRTL ? "text-right" : "text-left"} py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider`}
                            >
                              {t(
                                "broadcast.messagesLog.table.headers.broadcastDetails"
                              )}
                            </th>
                            <th
                              className={`${isRTL ? "text-right" : "text-left"} py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider`}
                            >
                              {t(
                                "broadcast.messagesLog.table.headers.targetRecipients"
                              )}
                            </th>
                            <th
                              className={`${isRTL ? "text-right" : "text-left"} py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider`}
                            >
                              {t(
                                "broadcast.messagesLog.table.headers.sentSuccessfully"
                              )}
                            </th>
                            <th
                              className={`${isRTL ? "text-right" : "text-left"} py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider`}
                            >
                              {t("broadcast.messagesLog.table.headers.failed")}
                            </th>
                            <th
                              className={`${isRTL ? "text-right" : "text-left"} py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider`}
                            >
                              {t("broadcast.messagesLog.table.headers.date")}
                            </th>
                            <th
                              className={`${isRTL ? "text-right" : "text-left"} py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider`}
                            >
                              {t("broadcast.messagesLog.table.headers.status")}
                            </th>
                            <th
                              className={`${isRTL ? "text-right" : "text-left"} py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider`}
                            >
                              {t("broadcast.messagesLog.table.headers.options")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {broadcastMessages.map((message) => (
                            <tr
                              key={message.id}
                              className="hover:bg-muted/50 transition-colors group"
                            >
                              <td className="py-4 px-4">
                                <div className="space-y-1">
                                  <div className="text-sm font-medium text-foreground">
                                    {message.broadcastName}
                                  </div>
                                  <div className="text-sm text-muted-foreground max-w-xs truncate">
                                    {message.messageContent}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-sm text-foreground">
                                  {message.targetRecipients.toLocaleString()}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-sm text-green-600 font-medium">
                                  {message.sentSuccessfully.toLocaleString()}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-sm text-red-600 font-medium">
                                  {message.failed.toLocaleString()}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-sm text-foreground">
                                  <div>{message.date}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {message.time}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    message.status === "completed"
                                      ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                                      : "bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
                                  }`}
                                >
                                  {message.status === "completed"
                                    ? t(
                                        "broadcast.messagesLog.table.status.completed"
                                      )
                                    : t(
                                        "broadcast.messagesLog.table.status.sending"
                                      )}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align={isRTL ? "start" : "end"}
                                  >
                                    <DropdownMenuItem>
                                      <Eye className="h-4 w-4" />
                                      {t(
                                        "broadcast.messagesLog.table.actions.view"
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <RotateCcw className="h-4 w-4" />
                                      {t(
                                        "broadcast.messagesLog.table.actions.resend"
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                      {t(
                                        "broadcast.messagesLog.table.actions.delete"
                                      )}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-4">
                      {broadcastMessages.map((message) => (
                        <div
                          key={message.id}
                          className="bg-card border border-border rounded-xl p-4 space-y-4 hover:bg-muted/20 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-foreground truncate">
                                {message.broadcastName}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {message.messageContent}
                              </p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align={isRTL ? "start" : "end"}
                              >
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4" />
                                  {t(
                                    "broadcast.messagesLog.table.actions.view"
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RotateCcw className="h-4 w-4" />
                                  {t(
                                    "broadcast.messagesLog.table.actions.resend"
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                  {t(
                                    "broadcast.messagesLog.table.actions.delete"
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-muted-foreground">
                                {t(
                                  "broadcast.messagesLog.table.headers.targetRecipients"
                                )}
                                :
                              </span>
                              <div className="font-medium text-foreground">
                                {message.targetRecipients.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                {t(
                                  "broadcast.messagesLog.table.headers.sentSuccessfully"
                                )}
                                :
                              </span>
                              <div className="font-medium text-green-600">
                                {message.sentSuccessfully.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                {t(
                                  "broadcast.messagesLog.table.headers.failed"
                                )}
                                :
                              </span>
                              <div className="font-medium text-red-600">
                                {message.failed.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                {t("broadcast.messagesLog.table.headers.date")}:
                              </span>
                              <div className="font-medium text-foreground">
                                {message.date}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <div
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                message.status === "completed"
                                  ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                                  : "bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
                              }`}
                            >
                              {message.status === "completed"
                                ? t(
                                    "broadcast.messagesLog.table.status.completed"
                                  )
                                : t(
                                    "broadcast.messagesLog.table.status.sending"
                                  )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {message.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {t("broadcast.messagesLog.empty.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("broadcast.messagesLog.empty.description")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </AdminRouteGuard>
  );
}

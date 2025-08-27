/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/i18n-provider";
import {
  Download,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Crown,
  Coins,
  Calendar,
  ExternalLink,
  Loader2,
  Star,
} from "lucide-react";
import Image from "next/image";
import {
  searchApi,
  type DownloadVerificationRequest,
  type DownloadVerificationResponse,
} from "@/lib/api";

interface DownloadVerificationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  onDownload?: () => void;
}

export function DownloadVerificationSheet({
  isOpen,
  onClose,
  downloadUrl,
  onDownload,
}: DownloadVerificationSheetProps) {
  const { isRTL } = useLanguage();

  const [isLoading, setIsLoading] = useState(false);
  const [verificationData, setVerificationData] =
    useState<DownloadVerificationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch verification data when sheet opens
  useEffect(() => {
    if (isOpen && downloadUrl) {
      fetchVerificationData();
    }
  }, [isOpen, downloadUrl]);

  const fetchVerificationData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const request: DownloadVerificationRequest = { downloadUrl };
      const response = await searchApi.verifyDownload(request);

      if (response.success && response.data) {
        setVerificationData(response.data);
      } else {
        setError(response.error?.message || "Failed to verify download");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Download verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    }
    onClose();
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const getStatusIcon = (
    isSupported: boolean,
    isAllowed: boolean,
    canAfford: boolean
  ) => {
    if (!isSupported) return <XCircle className="w-5 h-5 text-destructive" />;
    if (!isAllowed) return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    if (!canAfford) return <AlertCircle className="w-5 h-5 text-orange-500" />;
    return <CheckCircle className="w-5 h-5 text-green-500" />;
  };

  const getStatusText = (
    isSupported: boolean,
    isAllowed: boolean,
    canAfford: boolean
  ) => {
    if (!isSupported) return "Not Supported";
    if (!isAllowed) return "Not Allowed";
    if (!canAfford) return "Insufficient Credits";
    return "Ready to Download";
  };

  const getStatusBadgeVariant = (
    isSupported: boolean,
    isAllowed: boolean,
    canAfford: boolean
  ) => {
    if (!isSupported) return "destructive";
    if (!isAllowed || !canAfford) return "secondary";
    return "default";
  };

  const canDownload =
    verificationData?.data?.is_supported &&
    verificationData?.data?.is_allowed &&
    verificationData?.data?.can_afford;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className={`w-full sm:max-w-lg overflow-y-auto ${isRTL ? "right-auto left-0" : ""}`}
      >
        <SheetHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-left">
                Download Verification
              </SheetTitle>
              <SheetDescription className="text-left">
                Checking download eligibility for your request
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Verifying download...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <p className="text-sm text-destructive text-center">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchVerificationData}
              >
                Try Again
              </Button>
            </div>
          ) : verificationData ? (
            <>
              {/* Status Overview */}
              <div className="bg-card border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Download Status</h3>
                  {getStatusIcon(
                    verificationData.data.is_supported,
                    verificationData.data.is_allowed,
                    verificationData.data.can_afford
                  )}
                </div>
                <Badge
                  variant={getStatusBadgeVariant(
                    verificationData.data.is_supported,
                    verificationData.data.is_allowed,
                    verificationData.data.can_afford
                  )}
                  className="w-fit"
                >
                  {getStatusText(
                    verificationData.data.is_supported,
                    verificationData.data.is_allowed,
                    verificationData.data.can_afford
                  )}
                </Badge>
              </div>

              {/* Site Information */}
              <div className="bg-card border rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={verificationData.data.site.icon}
                      alt={verificationData.data.site.name}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {verificationData.data.site.name}
                    </h3>
                    <p
                      className={`px-2 py-1 text-xs rounded ${verificationData.data.site.is_external ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}
                    >
                      Site URL
                    </p>
                  </div>
                  {verificationData.data.site.is_external && (
                    <Badge variant="outline" className="text-xs">
                      <ExternalLink className="w-3 h-3" />
                      External
                    </Badge>
                  )}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Coins className="w-4 h-4 text-primary" />
                      Price
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {verificationData.data.site.pricing}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Last Reset
                    </p>
                    <p className="text-sm text-muted-foreground">
                      External:{" "}
                      {verificationData.data.site.is_external ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription Information */}
              <div className="bg-card border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-primary" />
                    <h3 className="font-medium">Your Subscription</h3>
                  </div>
                  <Badge
                    variant={
                      verificationData.data.subscription.active
                        ? "default"
                        : "secondary"
                    }
                  >
                    {verificationData.data.subscription.active
                      ? "Active"
                      : "Inactive"}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Plan
                    </span>
                    <span className="text-sm">
                      {verificationData.data.subscription.plan_name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Coins className="w-4 h-4" />
                      Credits
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        <span className="text-sm">
                          {verificationData.data.subscription.credits_remaining}{" "}
                          / {verificationData.data.subscription.credits_total}
                        </span>
                      </p>
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${(verificationData.data.subscription.credits_remaining / verificationData.data.subscription.credits_total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Valid Until
                    </span>
                    <span className="text-sm">
                      {formatDate(
                        verificationData.data.subscription.validity_date
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Details */}
              <div className="bg-card border rounded-lg p-4 space-y-3">
                <h3 className="font-medium">Verification Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Website Supported</span>
                    {verificationData.data.is_supported ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Download Allowed</span>
                    {verificationData.data.is_allowed ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sufficient Credits</span>
                    {verificationData.data.can_afford ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                </div>
              </div>

              {/* Allowed Sites */}
              {verificationData.data.subscription.allowed_sites.length > 0 && (
                <div className="bg-card border rounded-lg p-4 space-y-3">
                  <h3 className="font-medium">Allowed Sites</h3>
                  <div className="flex flex-wrap gap-2">
                    {verificationData.data.subscription.allowed_sites.map(
                      (site: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {site}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleDownload}
                  disabled={!canDownload}
                  className="flex-1"
                  size="lg"
                >
                  <Download className="w-4 h-4" />
                  {canDownload ? "Download Now" : "Cannot Download"}
                </Button>
                <Button variant="outline" onClick={onClose} size="lg">
                  Cancel
                </Button>
              </div>

              {/* Warning Messages */}
              {!verificationData.data.is_supported && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive">
                    This website is not supported by our service.
                  </p>
                </div>
              )}

              {verificationData.data.is_supported &&
                !verificationData.data.is_allowed && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Downloads from this site are not allowed with your current
                      subscription.
                    </p>
                  </div>
                )}

              {verificationData.data.is_supported &&
                verificationData.data.is_allowed &&
                !verificationData.data.can_afford && (
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                    <p className="text-sm text-orange-700 dark:text-orange-400">
                      You don&apos;t have enough credits to download this file. You
                      have{" "}
                      {verificationData.data.subscription.credits_remaining}{" "}
                      credits remaining.
                    </p>
                  </div>
                )}
            </>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}

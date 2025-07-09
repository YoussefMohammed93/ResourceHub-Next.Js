"use client";

import {
  ArrowUp,
  ArrowDown,
  UserPlus,
  CreditCard,
  Mail,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Trash2,
  Clock,
  Users,
  Globe,
  Activity,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  ExternalLink,
  Package,
  DollarSign,
  FileText,
  Timer,
  Coins,
  Link as LinkIcon,
  Settings,
  Check,
  Menu,
} from "lucide-react";
import type React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/user-dropdown";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Type definitions
interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: string;
  credits: number;
  daysValidity: number;
  contactUsUrl: string;
  supportedSites: string[];
  features: string[];
}

export default function DashboardPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [planError, setPlanError] = useState<string>("");

  // Sidebar state for mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Upgrade Subscription states
  const [upgradeEmail, setUpgradeEmail] = useState<string>("");
  const [upgradeNewPlan, setUpgradeNewPlan] = useState<string>("");
  const [isUpgradeSubmitting, setIsUpgradeSubmitting] =
    useState<boolean>(false);
  const [upgradeEmailError, setUpgradeEmailError] = useState<string>("");
  const [upgradeNewPlanError, setUpgradeNewPlanError] = useState<string>("");

  // Extend Subscription states
  const [extendEmail, setExtendEmail] = useState<string>("");
  const [extendDays, setExtendDays] = useState<string>("30");
  const [isExtendSubmitting, setIsExtendSubmitting] = useState<boolean>(false);
  const [extendEmailError, setExtendEmailError] = useState<string>("");
  const [extendDaysError, setExtendDaysError] = useState<string>("");

  // Delete Subscription states
  const [deleteEmail, setDeleteEmail] = useState<string>("");
  const [isDeleteSubmitting, setIsDeleteSubmitting] = useState<boolean>(false);
  const [deleteEmailError, setDeleteEmailError] = useState<string>("");

  // Users table states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Site management states
  const [isAddSiteDialogOpen, setIsAddSiteDialogOpen] =
    useState<boolean>(false);
  const [siteName, setSiteName] = useState<string>("");
  const [siteUrl, setSiteUrl] = useState<string>("");
  const [sitePrice, setSitePrice] = useState<string>("");
  const [siteIcon, setSiteIcon] = useState<string>("");
  const [siteNameError, setSiteNameError] = useState<string>("");
  const [siteUrlError, setSiteUrlError] = useState<string>("");
  const [sitePriceError, setSitePriceError] = useState<string>("");
  const [isAddingSite, setIsAddingSite] = useState<boolean>(false);

  // Package management states
  const [isAddPackageDialogOpen, setIsAddPackageDialogOpen] =
    useState<boolean>(false);
  const [packageName, setPackageName] = useState<string>("");
  const [packagePrice, setPackagePrice] = useState<string>("");
  const [packageDescription, setPackageDescription] = useState<string>("");
  const [packageDaysValidity, setPackageDaysValidity] = useState<string>("");
  const [packageCredits, setPackageCredits] = useState<string>("");
  const [packageContactUrl, setPackageContactUrl] = useState<string>("");
  const [packageSupportedSites, setPackageSupportedSites] =
    useState<string>("");
  const [packageNameError, setPackageNameError] = useState<string>("");
  const [packageDescriptionError, setPackageDescriptionError] =
    useState<string>("");
  const [packageDaysValidityError, setPackageDaysValidityError] =
    useState<string>("");
  const [packageCreditsError, setPackageCreditsError] = useState<string>("");
  const [packageContactUrlError, setPackageContactUrlError] =
    useState<string>("");
  const [isAddingPackage, setIsAddingPackage] = useState<boolean>(false);

  // Edit package states
  const [isEditPackageDialogOpen, setIsEditPackageDialogOpen] =
    useState<boolean>(false);
  const [editingPackage, setEditingPackage] = useState<PricingPlan | null>(
    null
  );
  const [editPackageName, setEditPackageName] = useState<string>("");
  const [editPackagePrice, setEditPackagePrice] = useState<string>("");
  const [editPackageDescription, setEditPackageDescription] =
    useState<string>("");
  const [editPackageDaysValidity, setEditPackageDaysValidity] =
    useState<string>("");
  const [editPackageCredits, setEditPackageCredits] = useState<string>("");
  const [editPackageContactUrl, setEditPackageContactUrl] =
    useState<string>("");
  const [editPackageSupportedSites, setEditPackageSupportedSites] =
    useState<string>("");
  const [editPackageNameError, setEditPackageNameError] = useState<string>("");
  const [editPackageDescriptionError, setEditPackageDescriptionError] =
    useState<string>("");
  const [editPackageDaysValidityError, setEditPackageDaysValidityError] =
    useState<string>("");
  const [editPackageCreditsError, setEditPackageCreditsError] =
    useState<string>("");
  const [editPackageContactUrlError, setEditPackageContactUrlError] =
    useState<string>("");
  const [isEditingPackage, setIsEditingPackage] = useState<boolean>(false);

  // Delete package states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isDeletingPackage, setIsDeletingPackage] = useState<boolean>(false);

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // URL validation
  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Handle add site
  const handleAddSite = async () => {
    // Reset errors
    setSiteNameError("");
    setSiteUrlError("");
    setSitePriceError("");

    // Validate site name
    if (!siteName.trim()) {
      setSiteNameError("Site name is required");
      return;
    }

    // Validate site URL
    if (!siteUrl.trim()) {
      setSiteUrlError("Site URL is required");
      return;
    }
    if (!validateUrl(siteUrl)) {
      setSiteUrlError("Please enter a valid URL");
      return;
    }

    // Validate price
    if (!sitePrice.trim()) {
      setSitePriceError("Price is required");
      return;
    }
    if (isNaN(Number(sitePrice)) || Number(sitePrice) <= 0) {
      setSitePriceError("Please enter a valid price");
      return;
    }

    setIsAddingSite(true);

    // Simulate API call
    setTimeout(() => {
      const newSite = {
        id: sites.length + 1,
        name: siteName,
        url: siteUrl,
        price: Number(sitePrice),
        icon: siteIcon || `${siteUrl}/favicon.ico`,
        status: "Active",
        addedDate: new Date().toISOString().split("T")[0],
      };

      setSites([...sites, newSite]);
      setIsAddingSite(false);
      setIsAddSiteDialogOpen(false);

      // Reset form
      setSiteName("");
      setSiteUrl("");
      setSitePrice("");
      setSiteIcon("");
    }, 2000);
  };

  // Handle add package
  const handleAddPackage = async () => {
    // Reset errors
    setPackageNameError("");
    setPackageDescriptionError("");
    setPackageDaysValidityError("");
    setPackageCreditsError("");
    setPackageContactUrlError("");

    // Validate package name
    if (!packageName.trim()) {
      setPackageNameError("Package name is required");
      return;
    }

    // Validate description
    if (!packageDescription.trim()) {
      setPackageDescriptionError("Description is required");
      return;
    }

    // Validate days validity
    if (!packageDaysValidity.trim()) {
      setPackageDaysValidityError("Days validity is required");
      return;
    }
    if (
      isNaN(Number(packageDaysValidity)) ||
      Number(packageDaysValidity) <= 0
    ) {
      setPackageDaysValidityError("Please enter a valid number of days");
      return;
    }

    // Validate credits
    if (!packageCredits.trim()) {
      setPackageCreditsError("Credits are required");
      return;
    }
    if (isNaN(Number(packageCredits)) || Number(packageCredits) <= 0) {
      setPackageCreditsError("Please enter a valid number of credits");
      return;
    }

    // Validate contact URL if provided
    if (packageContactUrl.trim() && !validateUrl(packageContactUrl)) {
      setPackageContactUrlError("Please enter a valid URL");
      return;
    }

    setIsAddingPackage(true);

    // Simulate API call
    setTimeout(() => {
      const newPackage = {
        id: pricingPlans.length + 1,
        name: packageName,
        description: packageDescription,
        price: packagePrice.trim() || "",
        credits: Number(packageCredits),
        daysValidity: Number(packageDaysValidity),
        contactUsUrl: packageContactUrl.trim(),
        supportedSites: packageSupportedSites.trim()
          ? packageSupportedSites.split(",").map((site) => site.trim())
          : [],
        features: [
          "Access to supported sites",
          "24/7 Support",
          "Admin Management",
        ],
      };

      setPricingPlans([...pricingPlans, newPackage]);
      setIsAddingPackage(false);
      setIsAddPackageDialogOpen(false);

      // Reset form
      setPackageName("");
      setPackagePrice("");
      setPackageDescription("");
      setPackageDaysValidity("");
      setPackageCredits("");
      setPackageContactUrl("");
      setPackageSupportedSites("");
    }, 2000);
  };

  // Handle edit package
  const handleEditPackage = (plan: PricingPlan) => {
    setEditingPackage(plan);
    setEditPackageName(plan.name);
    setEditPackagePrice(plan.price || "");
    setEditPackageDescription(plan.description);
    setEditPackageDaysValidity(plan.daysValidity.toString());
    setEditPackageCredits(plan.credits.toString());
    setEditPackageContactUrl(plan.contactUsUrl || "");
    setEditPackageSupportedSites(
      plan.supportedSites ? plan.supportedSites.join(", ") : ""
    );
    setIsEditPackageDialogOpen(true);
  };

  // Handle update package
  const handleUpdatePackage = async () => {
    // Reset errors
    setEditPackageNameError("");
    setEditPackageDescriptionError("");
    setEditPackageDaysValidityError("");
    setEditPackageCreditsError("");
    setEditPackageContactUrlError("");

    // Validate package name
    if (!editPackageName.trim()) {
      setEditPackageNameError("Package name is required");
      return;
    }

    // Validate description
    if (!editPackageDescription.trim()) {
      setEditPackageDescriptionError("Description is required");
      return;
    }

    // Validate days validity
    if (!editPackageDaysValidity.trim()) {
      setEditPackageDaysValidityError("Days validity is required");
      return;
    }
    if (
      isNaN(Number(editPackageDaysValidity)) ||
      Number(editPackageDaysValidity) <= 0
    ) {
      setEditPackageDaysValidityError("Please enter a valid number of days");
      return;
    }

    // Validate credits
    if (!editPackageCredits.trim()) {
      setEditPackageCreditsError("Credits are required");
      return;
    }
    if (isNaN(Number(editPackageCredits)) || Number(editPackageCredits) <= 0) {
      setEditPackageCreditsError("Please enter a valid number of credits");
      return;
    }

    // Validate contact URL if provided
    if (editPackageContactUrl.trim() && !validateUrl(editPackageContactUrl)) {
      setEditPackageContactUrlError("Please enter a valid URL");
      return;
    }

    setIsEditingPackage(true);

    // Simulate API call
    setTimeout(() => {
      if (!editingPackage) return;

      const updatedPackage: PricingPlan = {
        ...editingPackage,
        name: editPackageName,
        description: editPackageDescription,
        price: editPackagePrice.trim() || "",
        credits: Number(editPackageCredits),
        daysValidity: Number(editPackageDaysValidity),
        contactUsUrl: editPackageContactUrl.trim(),
        supportedSites: editPackageSupportedSites.trim()
          ? editPackageSupportedSites.split(",").map((site) => site.trim())
          : [],
        features: editingPackage.features || [],
      };

      setPricingPlans(
        pricingPlans.map((plan) =>
          plan.id === editingPackage.id ? updatedPackage : plan
        )
      );
      setIsEditingPackage(false);
      setIsEditPackageDialogOpen(false);

      // Reset form
      setEditingPackage(null);
      setEditPackageName("");
      setEditPackagePrice("");
      setEditPackageDescription("");
      setEditPackageDaysValidity("");
      setEditPackageCredits("");
      setEditPackageContactUrl("");
      setEditPackageSupportedSites("");
    }, 2000);
  };

  // Handle delete package
  const handleDeletePackage = async () => {
    if (!editingPackage) return;

    setIsDeletingPackage(true);

    // Simulate API call
    setTimeout(() => {
      setPricingPlans(
        pricingPlans.filter((plan) => plan.id !== editingPackage.id)
      );
      setIsDeletingPackage(false);

      // Close alert dialog first
      setIsDeleteDialogOpen(false);

      // Then close main edit dialog after a short delay
      setTimeout(() => {
        setIsEditPackageDialogOpen(false);

        // Reset form~~
        setEditingPackage(null);
        setEditPackageName("");
        setEditPackagePrice("");
        setEditPackageDescription("");
        setEditPackageDaysValidity("");
        setEditPackageCredits("");
        setEditPackageContactUrl("");
        setEditPackageSupportedSites("");
      }, 300);
    }, 2000);
  };

  // Handle form submission
  const handleAddSubscription = async () => {
    // Reset errors
    setEmailError("");
    setPlanError("");

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Validate plan selection
    if (!selectedPlan) {
      setPlanError("Please select a subscription plan");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      setSelectedPlan("");
      // Here you would typically show a success message
    }, 2000);
  };

  // Handle upgrade subscription
  const handleUpgradeSubscription = async () => {
    setUpgradeEmailError("");
    setUpgradeNewPlanError("");

    if (!upgradeEmail.trim()) {
      setUpgradeEmailError("Email is required");
      return;
    }
    if (!validateEmail(upgradeEmail)) {
      setUpgradeEmailError("Please enter a valid email address");
      return;
    }
    if (!upgradeNewPlan) {
      setUpgradeNewPlanError("Please select a new plan");
      return;
    }

    setIsUpgradeSubmitting(true);
    setTimeout(() => {
      setIsUpgradeSubmitting(false);
      setUpgradeEmail("");
      setUpgradeNewPlan("");
    }, 2000);
  };

  // Handle extend subscription
  const handleExtendSubscription = async () => {
    setExtendEmailError("");
    setExtendDaysError("");

    if (!extendEmail.trim()) {
      setExtendEmailError("Email is required");
      return;
    }
    if (!validateEmail(extendEmail)) {
      setExtendEmailError("Please enter a valid email address");
      return;
    }
    if (!extendDays.trim() || parseInt(extendDays) <= 0) {
      setExtendDaysError("Please enter a valid number of days");
      return;
    }

    setIsExtendSubmitting(true);
    setTimeout(() => {
      setIsExtendSubmitting(false);
      setExtendEmail("");
      setExtendDays("30");
    }, 2000);
  };

  // Handle delete subscription
  const handleDeleteSubscription = async () => {
    setDeleteEmailError("");

    if (!deleteEmail.trim()) {
      setDeleteEmailError("Email is required");
      return;
    }
    if (!validateEmail(deleteEmail)) {
      setDeleteEmailError("Please enter a valid email address");
      return;
    }

    setIsDeleteSubmitting(true);
    setTimeout(() => {
      setIsDeleteSubmitting(false);
      setDeleteEmail("");
    }, 2000);
  };

  // Get selected plan details
  const getSelectedPlanDetails = () => {
    return pricingPlans.find(
      (plan) => plan.name.toLowerCase().replace(" ", "-") === selectedPlan
    );
  };

  // Get upgrade plan details
  const getUpgradePlanDetails = () => {
    return pricingPlans.find(
      (plan) => plan.name.toLowerCase().replace(" ", "-") === upgradeNewPlan
    );
  };

  // Fake sites data
  const [sites, setSites] = useState([
    {
      id: 1,
      name: "Creative Resources",
      url: "https://creativeresources.net",
      price: 25,
      icon: "https://creativeresources.net/favicon.ico",
      status: "Active",
      addedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Creative Resources",
      url: "https://creativeresources.net",
      price: 15,
      icon: "https://creativeresources.net/favicon.ico",
      status: "Active",
      addedDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Creative Resources",
      url: "https://creativeresources.net",
      price: 15,
      icon: "https://creativeresources.net/favicon.ico",
      status: "Active",
      addedDate: "2024-02-20",
    },
    {
      id: 4,
      name: "Creative Resources",
      url: "https://creativeresources.net",
      price: 15,
      icon: "https://creativeresources.net/favicon.ico",
      status: "Active",
      addedDate: "2024-02-20",
    },
  ]);

  // Fake users data
  const fakeUsers = [
    {
      id: 1,
      name: "Mohammed Ahmed",
      email: "mohammed.ahmed12@example.com",
      credits: 45,
      status: "Active",
      expiry: "2024-12-31",
      plan: "Basic Plan",
      avatar: "MA",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Yasser",
      email: "sarah.yasser@example.com",
      credits: 120,
      status: "Active",
      expiry: "2024-11-15",
      plan: "Test Plan",
      avatar: "SY",
      joinDate: "2024-02-20",
      lastActive: "5 minutes ago",
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      credits: 0,
      status: "Expired",
      expiry: "2024-06-30",
      plan: "Basic Plan",
      avatar: "AH",
      joinDate: "2023-12-10",
      lastActive: "1 week ago",
    },
    {
      id: 4,
      name: "Fatima Ali",
      email: "fatima.ali@example.com",
      credits: 250,
      status: "Active",
      expiry: "2025-03-15",
      plan: "Test Plan",
      avatar: "FA",
      joinDate: "2024-03-05",
      lastActive: "1 hour ago",
    },
    {
      id: 5,
      name: "Omar Khaled",
      email: "omar.khaled@example.com",
      credits: 15,
      status: "Suspended",
      expiry: "2024-10-20",
      plan: "Basic Plan",
      avatar: "OK",
      joinDate: "2024-01-30",
      lastActive: "3 days ago",
    },
  ];

  const [pricingPlans, setPricingPlans] = useState([
    {
      id: 1,
      name: "Test Plan",
      description: "Perfect for management",
      price: "$99",
      credits: 1000,
      daysValidity: 30,
      contactUsUrl: "",
      supportedSites: ["Site A", "Site B", "Site C"],
      features: ["Access to all sites", "24/7 Support", "Admin Management"],
    },
    {
      id: 2,
      name: "Basic Plan",
      description: "Perfect for management",
      price: "",
      credits: 50,
      daysValidity: 15,
      contactUsUrl: "https://example.com/contact",
      supportedSites: ["Site A", "Site B"],
      features: ["Access to all sites", "24/7 Support", "Admin Management"],
    },
  ]);

  // Filter users based on search term and status
  const filteredUsers = fakeUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.plan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      user.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border border-green-200";
      case "expired":
        return "bg-destructive/10 text-destructive border border-destructive/20";
      case "suspended":
        return "bg-muted text-muted-foreground border border-border";
      default:
        return "bg-secondary text-secondary-foreground border border-border";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="w-3 h-3" />;
      case "expired":
        return <XCircle className="w-3 h-3" />;
      case "suspended":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <CheckCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border px-4 sm:px-6 py-4 lg:ml-72">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="cursor-pointer lg:hidden p-2 hover:bg-muted rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
            </div>
            <span className="text-lg sm:text-xl font-semibold text-foreground">
              ResourceHub
            </span>
          </div>
          <UserDropdown />
        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-4 sm:p-5 space-y-4 sm:space-y-5 bg-secondary/50">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
                          Total Users
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground/80">
                          Registered accounts
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                          1,247
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Active Sites Card */}
            <Card className="group dark:bg-muted/50">
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="space-y-3 sm:space-y-4 flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center">
                        <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base lg:text-lg font-medium text-foreground uppercase tracking-wide">
                          Active Sites
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground/80">
                          Live websites
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                          89
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Online Users Card */}
            <Card className="group dark:bg-muted/50">
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="space-y-3 sm:space-y-4 flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center relative">
                        <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base lg:text-lg font-medium text-foreground uppercase tracking-wide">
                          Online Users
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground/80">
                          Currently active
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                          342
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Users Management Table */}
          <Card className="dark:bg-muted/50">
            <CardHeader className="w-full flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="w-full max-w-lg">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Users Management
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage user subscriptions and monitor activity
                </p>
              </div>
              <div className="w-full flex flex-col sm:flex-row items-stretch md:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full md:w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto max-h-[278px] overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        USER
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        PLAN & CREDITS
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        STATUS
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        EXPIRY
                      </th>
                      <th className="text-right py-4 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center">
                          <div className="flex flex-col items-center space-y-3">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                No users found
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Try adjusting your search or filter criteria
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-muted/50 transition-colors group"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                  {user.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-foreground truncate">
                                  {user.name}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-foreground">
                                {user.plan}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-primary">
                                  {user.credits} credits
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div
                              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${getStatusBadge(user.status)}`}
                            >
                              {getStatusIcon(user.status)}
                              <span>{user.status}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm text-foreground">
                              {user.expiry}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end">
                              <Button
                                size="sm"
                                variant="destructive"
                                className="h-8 px-3"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Mobile Card View */}
              <div className="lg:hidden space-y-3 max-h-[400px] overflow-y-auto">
                {filteredUsers.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          No users found
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-card border border-border rounded-xl p-3 space-y-4 hover:bg-muted/20 transition-colors"
                    >
                      {/* Header with Avatar and Status */}
                      <div className="flex flex-col gap-5">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <Avatar className="w-12 h-12 flex-shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="text-base font-semibold text-foreground truncate w-56">
                              {user.name}
                            </div>
                            <div className="text-sm text-muted-foreground truncate w-56">
                              {user.email}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Last active: {user.lastActive}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-full flex-shrink-0 ${getStatusBadge(user.status)}`}
                        >
                          {getStatusIcon(user.status)}
                          <span>{user.status}</span>
                        </div>
                      </div>
                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Plan
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            {user.plan}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Credits
                          </div>
                          <div className="text-sm font-semibold text-primary flex items-center">
                            <Coins className="w-3 h-3 mr-1" />
                            {user.credits}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Expires
                          </div>
                          <div className="text-sm font-semibold text-foreground flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {user.expiry}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Joined
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            {user.joinDate}
                          </div>
                        </div>
                      </div>
                      {/* Action Button */}
                      <div className="pt-3 border-t border-border">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full h-10 text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete User
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Table Footer with Stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-border space-y-3 sm:space-y-0">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredUsers.length} of {fakeUsers.length} users
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>
                      {fakeUsers.filter((u) => u.status === "Active").length}{" "}
                      Active
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span>
                      {fakeUsers.filter((u) => u.status === "Expired").length}{" "}
                      Expired
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span>
                      {fakeUsers.filter((u) => u.status === "Suspended").length}{" "}
                      Suspended
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Add Subscription */}
            <Card className="dark:bg-muted/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      Add New Subscription
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Create a subscription for a user
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>User Email</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder="user@example.com"
                    className={`transition-all ${
                      emailError
                        ? "border-destructive focus-visible:ring-destructive/20"
                        : "focus-visible:ring-primary/20"
                    }`}
                  />
                  {emailError && (
                    <p className="text-sm text-destructive flex items-center space-x-1">
                      <span className="w-1 h-1 bg-destructive rounded-full"></span>
                      <span>{emailError}</span>
                    </p>
                  )}
                </div>
                {/* Plan Selection */}
                <div className="space-y-2">
                  <Label
                    htmlFor="plan"
                    className="text-sm font-medium text-foreground flex items-center space-x-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Subscription Plan</span>
                  </Label>
                  <Select
                    value={selectedPlan}
                    onValueChange={(value) => {
                      setSelectedPlan(value);
                      if (planError) setPlanError("");
                    }}
                  >
                    <SelectTrigger
                      className={`w-full transition-all ${
                        planError
                          ? "border-destructive focus-visible:ring-destructive/20"
                          : "focus-visible:ring-primary/20"
                      }`}
                    >
                      <SelectValue placeholder="Choose a subscription plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {pricingPlans.map((plan) => (
                        <SelectItem
                          key={plan.name}
                          value={plan.name.toLowerCase().replace(" ", "-")}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">{plan.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {plan.credits.toLocaleString()} Credits
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {planError && (
                    <p className="text-sm text-destructive flex items-center space-x-1">
                      <span className="w-1 h-1 bg-destructive rounded-full"></span>
                      <span>{planError}</span>
                    </p>
                  )}
                </div>
                {/* Plan Preview */}
                {selectedPlan && getSelectedPlanDetails() && (
                  <div className="p-4 bg-secondary/50 border border-border rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-foreground">
                        Plan Preview
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Plan Name :
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {getSelectedPlanDetails()?.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Credits :
                        </span>
                        <span className="text-sm font-medium text-primary">
                          {getSelectedPlanDetails()?.credits}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Submit Button */}
                <Button
                  className="w-full"
                  disabled={isSubmitting}
                  onClick={handleAddSubscription}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      <span>Adding Subscription...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span>Add Subscription</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
            {/* Credit History */}
            <Card className="dark:bg-muted/50">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      Credit History
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Track credit transactions and usage
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs w-full sm:w-auto"
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Credit Usage Transaction */}
                <div className="flex items-center justify-between p-3 sm:p-5 bg-red-50/50 dark:bg-red-50/5 border border-red-400/10 dark:border-red-50/10 rounded-xl hover:bg-red-50/70 transition-colors">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-foreground truncate">
                        Sarah Yasser
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        Site access • example.com
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-red-600">-15</div>
                    <div className="text-xs text-muted-foreground">1h ago</div>
                  </div>
                </div>
                {/* Credit Purchase Transaction */}
                <div className="flex items-center justify-between p-3 sm:p-5 bg-green-50/50 dark:bg-green-50/5 border border-green-400/10 dark:border-green-400/10 rounded-xl hover:bg-green-50/70 transition-colors">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-foreground truncate">
                        Mohammed Ahmed
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        Plan upgrade • Basic Plan
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-green-600">+50</div>
                    <div className="text-xs text-muted-foreground">2h ago</div>
                  </div>
                </div>
                {/* Credit Usage Transaction */}
                <div className="flex items-center justify-between p-5 bg-red-50/50 dark:bg-red-50/5 border border-red-400/10 dark:border-red-50/10 rounded-xl transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <ArrowDown className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        Mohamd Waly
                      </div>
                      <div className="text-xs text-muted-foreground truncate w-36">
                        Site access • premium-site.com
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-red-600">-25</div>
                    <div className="text-xs text-muted-foreground">3h ago</div>
                  </div>
                </div>
                {/* Credit Purchase Transaction */}
                <div className="flex items-center justify-between p-5 bg-blue-50/50 dark:bg-blue-50/5 border border-blue-400/10 dark:border-blue-400/10 rounded-xl hover:bg-blue-50/70 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ArrowUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        Sarah Yasser
                      </div>
                      <div className="text-xs text-muted-foreground truncate w-36">
                        New subscription • Test Plan
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">+1000</div>
                    <div className="text-xs text-muted-foreground">5h ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Credit Analytics */}
            <Card className="dark:bg-muted/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      Credit Analytics
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Monitor credit usage and statistics
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/10 border border-primary/10 rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-1">
                      50
                    </div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Total Issued
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-400/10 border border-green-400/10 rounded-xl">
                    <div className="text-3xl font-bold text-green-400 mb-1">
                      0
                    </div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Remaining
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-400/10 border border-blue-400/10 rounded-xl">
                    <div className="text-3xl font-bold text-blue-400 mb-1">
                      0
                    </div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Used
                    </div>
                  </div>
                  <div className="text-center p-4 bg-pink-400/10 border border-pink-400/10 rounded-xl">
                    <div className="text-3xl font-bold text-pink-400 mb-1">
                      0
                    </div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Daily Avg
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-border">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">
                        Credits by Plan
                      </h4>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="text-sm font-medium text-foreground">
                            Basic Plan
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-primary">
                            50
                          </span>
                          <span className="text-xs text-muted-foreground">
                            credits
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Last Updated :
                      </span>
                      <span className="text-xs font-medium text-foreground">
                        2023-07-06 11:44:30
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Upgrade Subscription */}
            <Card className="dark:bg-muted/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      Upgrade Subscription
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Upgrade user to a higher plan
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="upgrade-email"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Mail className="w-4 h-4" />
                    <span>User Email</span>
                  </Label>
                  <Input
                    id="upgrade-email"
                    type="email"
                    value={upgradeEmail}
                    onChange={(e) => {
                      setUpgradeEmail(e.target.value);
                      if (upgradeEmailError) setUpgradeEmailError("");
                    }}
                    placeholder="user@example.com"
                    className={`transition-all ${upgradeEmailError && "border-destructive focus-visible:ring-destructive/20"}`}
                  />
                  {upgradeEmailError && (
                    <p className="text-sm text-destructive flex items-center space-x-1">
                      <span className="w-1 h-1 bg-destructive rounded-full"></span>
                      <span>{upgradeEmailError}</span>
                    </p>
                  )}
                </div>
                {/* New Plan Selection */}
                <div className="space-y-2">
                  <Label
                    htmlFor="upgrade-plan"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>New Plan</span>
                  </Label>
                  <Select
                    value={upgradeNewPlan}
                    onValueChange={(value) => {
                      setUpgradeNewPlan(value);
                      if (upgradeNewPlanError) setUpgradeNewPlanError("");
                    }}
                  >
                    <SelectTrigger
                      className={`w-full transition-all ${
                        upgradeNewPlanError
                          ? "border-destructive focus-visible:ring-destructive/20"
                          : "focus-visible:ring-primary/20"
                      }`}
                    >
                      <SelectValue placeholder="Choose new plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {pricingPlans.map((plan) => (
                        <SelectItem
                          key={plan.name}
                          value={plan.name.toLowerCase().replace(" ", "-")}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">{plan.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {plan.credits.toLocaleString()} Credits
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {upgradeNewPlanError && (
                    <p className="text-sm text-destructive flex items-center space-x-1">
                      <span className="w-1 h-1 bg-destructive rounded-full"></span>
                      <span>{upgradeNewPlanError}</span>
                    </p>
                  )}
                </div>
                {/* Plan Preview */}
                {upgradeNewPlan && getUpgradePlanDetails() && (
                  <div className="p-4 bg-secondary/50 border border-border rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-foreground">
                        Upgrade Preview
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          New Plan :
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {getUpgradePlanDetails()?.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Credits :
                        </span>
                        <span className="text-sm font-medium text-primary">
                          {getUpgradePlanDetails()?.credits}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Submit Button */}
                <Button
                  className="w-full"
                  disabled={isUpgradeSubmitting}
                  onClick={handleUpgradeSubscription}
                >
                  {isUpgradeSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Upgrading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Upgrade Subscription</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Extend Subscription */}
            <Card className="dark:bg-muted/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      Extend Subscription
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Add more days to user subscription
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="extend-email"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Mail className="w-4 h-4" />
                    <span>User Email</span>
                  </Label>
                  <Input
                    id="extend-email"
                    type="email"
                    value={extendEmail}
                    onChange={(e) => {
                      setExtendEmail(e.target.value);
                      if (extendEmailError) setExtendEmailError("");
                    }}
                    placeholder="user@example.com"
                    className={`transition-all ${
                      extendEmailError
                        ? "border-destructive focus-visible:ring-destructive/20"
                        : "focus-visible:ring-primary/20"
                    }`}
                  />
                  {extendEmailError && (
                    <p className="text-sm text-destructive flex items-center space-x-1">
                      <span className="w-1 h-1 bg-destructive rounded-full"></span>
                      <span>{extendEmailError}</span>
                    </p>
                  )}
                </div>
                {/* Days Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="extend-days"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Additional Days</span>
                  </Label>
                  <Input
                    id="extend-days"
                    type="number"
                    value={extendDays}
                    onChange={(e) => {
                      setExtendDays(e.target.value);
                      if (extendDaysError) setExtendDaysError("");
                    }}
                    placeholder="30"
                    min="1"
                    className={`transition-all ${
                      extendDaysError
                        ? "border-destructive focus-visible:ring-destructive/20"
                        : "focus-visible:ring-primary/20"
                    }`}
                  />
                  {extendDaysError && (
                    <p className="text-sm text-destructive flex items-center space-x-1">
                      <span className="w-1 h-1 bg-destructive rounded-full"></span>
                      <span>{extendDaysError}</span>
                    </p>
                  )}
                </div>
                {/* Extension Preview */}
                {extendDays && parseInt(extendDays) > 0 && (
                  <div className="p-4 bg-secondary/50 border border-border rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-foreground">
                        Extension Preview
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Additional Days :
                        </span>
                        <span className="text-sm font-medium text-primary">
                          +{extendDays} days
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Estimated New Expiry :
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {new Date(
                            Date.now() +
                              parseInt(extendDays) * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Submit Button */}
                <Button
                  onClick={handleExtendSubscription}
                  disabled={isExtendSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isExtendSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      <span>Extending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Extend Subscription</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
            {/* Delete Subscription */}
            <Card className="dark:bg-muted/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-destructive/10 border border-destructive/5 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      Delete Subscription
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Permanently remove user subscription
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="delete-email"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Mail className="w-4 h-4" />
                    <span>User Email</span>
                  </Label>
                  <Input
                    id="delete-email"
                    type="email"
                    value={deleteEmail}
                    onChange={(e) => {
                      setDeleteEmail(e.target.value);
                      if (deleteEmailError) setDeleteEmailError("");
                    }}
                    placeholder="user@example.com"
                    className={`transition-all ${
                      deleteEmailError
                        ? "border-destructive focus-visible:ring-destructive/20"
                        : "focus-visible:ring-primary/20"
                    }`}
                  />
                  {deleteEmailError && (
                    <p className="text-sm text-destructive flex items-center space-x-1">
                      <span className="w-1 h-1 bg-destructive rounded-full"></span>
                      <span>{deleteEmailError}</span>
                    </p>
                  )}
                </div>
                {/* Warning Message */}
                <div className="p-4 bg-destructive/5 border border-destructive/5 rounded-lg">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 bg-destructive/20 border border-destructive/5 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-destructive text-lg font-bold">
                        !
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-destructive">
                        Warning: This action cannot be undone
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Deleting a subscription will permanently remove the
                        user&apos;s access and cannot be recovered.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Submit Button */}
                <Button
                  onClick={handleDeleteSubscription}
                  disabled={isDeleteSubmitting}
                  variant="destructive"
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isDeleteSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Deleting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Subscription</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* Supported Sites */}
          <Card className="dark:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Supported Sites
              </CardTitle>
              <Dialog
                open={isAddSiteDialogOpen}
                onOpenChange={setIsAddSiteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="w-4 h-4 stroke-3" />
                    Add New Site
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-foreground">
                      Add New Site
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Add a new site to your resource hub. Fill in the details
                      below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* Site Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="site-name"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <Globe className="w-4 h-4" />
                        Site Name
                      </Label>
                      <Input
                        id="site-name"
                        value={siteName}
                        onChange={(e) => {
                          setSiteName(e.target.value);
                          if (siteNameError) setSiteNameError("");
                        }}
                        placeholder="Enter site name"
                        className={`transition-all ${
                          siteNameError
                            ? "border-destructive focus-visible:ring-destructive/20"
                            : "focus-visible:ring-primary/20"
                        }`}
                      />
                      {siteNameError && (
                        <p className="text-sm text-destructive flex items-center space-x-1">
                          <span className="w-1 h-1 bg-destructive rounded-full"></span>
                          <span>{siteNameError}</span>
                        </p>
                      )}
                    </div>
                    {/* Site URL */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="site-url"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Site URL
                      </Label>
                      <Input
                        id="site-url"
                        value={siteUrl}
                        onChange={(e) => {
                          setSiteUrl(e.target.value);
                          if (siteUrlError) setSiteUrlError("");
                        }}
                        placeholder="https://example.com"
                        className={`transition-all ${
                          siteUrlError
                            ? "border-destructive focus-visible:ring-destructive/20"
                            : "focus-visible:ring-primary/20"
                        }`}
                      />
                      {siteUrlError && (
                        <p className="text-sm text-destructive flex items-center space-x-1">
                          <span className="w-1 h-1 bg-destructive rounded-full"></span>
                          <span>{siteUrlError}</span>
                        </p>
                      )}
                    </div>
                    {/* Price */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="site-price"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <CreditCard className="w-4 h-4" />
                        Price (Credits)
                      </Label>
                      <Input
                        id="site-price"
                        type="number"
                        min="1"
                        value={sitePrice}
                        onChange={(e) => {
                          setSitePrice(e.target.value);
                          if (sitePriceError) setSitePriceError("");
                        }}
                        placeholder="Enter price in credits"
                        className={`transition-all ${
                          sitePriceError
                            ? "border-destructive focus-visible:ring-destructive/20"
                            : "focus-visible:ring-primary/20"
                        }`}
                      />
                      {sitePriceError && (
                        <p className="text-sm text-destructive flex items-center space-x-1">
                          <span className="w-1 h-1 bg-destructive rounded-full"></span>
                          <span>{sitePriceError}</span>
                        </p>
                      )}
                    </div>
                    {/* Icon URL (Optional) */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="site-icon"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <Activity className="w-4 h-4" />
                        Icon URL (Optional)
                      </Label>
                      <Input
                        id="site-icon"
                        value={siteIcon}
                        onChange={(e) => setSiteIcon(e.target.value)}
                        placeholder="https://example.com/icon.png"
                        className="focus-visible:ring-primary/20"
                      />
                      <p className="text-xs text-muted-foreground">
                        If not provided, we&apos;ll use the site&apos;s favicon
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddSiteDialogOpen(false)}
                      disabled={isAddingSite}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleAddSite}
                      disabled={isAddingSite}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isAddingSite ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                          <span>Adding...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Plus className="w-4 h-4" />
                          <span>Add Site</span>
                        </div>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {sites.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        No sites found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Add your first site to get started
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto max-h-[240px] overflow-y-auto">
                    <table className="w-full min-w-[800px]">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[200px]">
                            SITE
                          </th>
                          <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[200px]">
                            URL
                          </th>
                          <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[100px]">
                            PRICE
                          </th>
                          <th className="text-left py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[100px]">
                            STATUS
                          </th>
                          <th className="text-right py-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[150px]">
                            ACTIONS
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {sites.map((site) => (
                          <tr
                            key={site.id}
                            className="hover:bg-muted/50 transition-colors group"
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center overflow-hidden">
                                  {site.icon ? (
                                    <Image
                                      src={site.icon}
                                      alt={`${site.name} icon`}
                                      width={20}
                                      height={20}
                                      className="w-5 h-5 object-contain"
                                      onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                        const nextElement = e.currentTarget
                                          .nextElementSibling as HTMLElement;
                                        if (nextElement) {
                                          nextElement.style.display = "flex";
                                        }
                                      }}
                                    />
                                  ) : null}
                                  <Globe
                                    className="w-4 h-4 text-primary"
                                    style={{
                                      display: site.icon ? "none" : "flex",
                                    }}
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-foreground truncate">
                                    {site.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <a
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center space-x-1 max-w-[200px] truncate"
                              >
                                <span className="truncate">{site.url}</span>
                                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                              </a>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm font-medium text-foreground">
                                {site.price} credits
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 border border-green-200">
                                <CheckCircle className="w-3 h-3" />
                                <span>{site.status}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center justify-end space-x-2">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="h-8 px-3"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-3">
                    {sites.map((site) => (
                      <div
                        key={site.id}
                        className="bg-card border border-border rounded-xl p-4 space-y-4 hover:bg-muted/20 transition-colors"
                      >
                        {/* Header with Icon and Status */}
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="w-12 h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                              {site.icon ? (
                                <Image
                                  src={site.icon}
                                  alt={`${site.name} icon`}
                                  width={20}
                                  height={20}
                                  className="w-5 h-5 object-contain"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    const nextElement = e.currentTarget
                                      .nextElementSibling as HTMLElement;
                                    if (nextElement) {
                                      nextElement.style.display = "flex";
                                    }
                                  }}
                                />
                              ) : null}
                              <Globe
                                className="w-5 h-5 text-primary"
                                style={{
                                  display: site.icon ? "none" : "flex",
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-base font-semibold text-foreground truncate">
                                {site.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Added {site.addedDate}
                              </div>
                            </div>
                          </div>
                          <div className="inline-flex items-center justify-center mt-4 space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-green-100 text-green-800 border border-green-200 flex-shrink-0">
                            <CheckCircle className="w-3 h-3" />
                            <span>{site.status}</span>
                          </div>
                        </div>
                        {/* Site Details */}
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Website URL
                            </div>
                            <a
                              href={site.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center space-x-2 p-2 bg-primary/5 rounded-lg border border-primary/10"
                            >
                              <Globe className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate flex-1 font-medium">
                                {site.url.replace(/^https?:\/\//, "")}
                              </span>
                              <ExternalLink className="w-4 h-4 flex-shrink-0" />
                            </a>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Access Price
                            </div>
                            <div className="flex items-center space-x-2 p-2 bg-secondary/50 rounded-lg">
                              <Coins className="w-4 h-4 text-primary" />
                              <span className="text-sm font-semibold text-foreground">
                                {site.price} credits
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="w-full pt-4 border-t border-border">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full h-10 flex-1 text-sm font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          {/* Pricing Management */}
          <Card className="dark:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Pricing Management
              </CardTitle>
              <Dialog
                open={isAddPackageDialogOpen}
                onOpenChange={setIsAddPackageDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Package className="w-4 h-4 stroke-3" />
                    New Package
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-foreground">
                      Add New Package
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Create a new pricing package for your resource hub. Fill
                      in the details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {/* Package Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="package-name"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <Package className="w-4 h-4" />
                        Plan Name
                      </Label>
                      <Input
                        id="package-name"
                        value={packageName}
                        onChange={(e) => {
                          setPackageName(e.target.value);
                          if (packageNameError) setPackageNameError("");
                        }}
                        placeholder="Enter package name"
                        className={`transition-all ${
                          packageNameError
                            ? "border-destructive focus-visible:ring-destructive/20"
                            : "focus-visible:ring-primary/20"
                        }`}
                      />
                      {packageNameError && (
                        <p className="text-sm text-destructive flex items-center space-x-1">
                          <span className="w-1 h-1 bg-destructive rounded-full"></span>
                          <span>{packageNameError}</span>
                        </p>
                      )}
                    </div>
                    {/* Price */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="package-price"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <DollarSign className="w-4 h-4" />
                        Price
                      </Label>
                      <Input
                        id="package-price"
                        value={packagePrice}
                        onChange={(e) => setPackagePrice(e.target.value)}
                        placeholder="Leave empty to show 'Contact Us'"
                        className="transition-all focus-visible:ring-primary/20"
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave empty to display Contact Us instead of a price
                      </p>
                    </div>
                    {/* Description */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="package-description"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <FileText className="w-4 h-4" />
                        Description
                      </Label>
                      <Input
                        id="package-description"
                        value={packageDescription}
                        onChange={(e) => {
                          setPackageDescription(e.target.value);
                          if (packageDescriptionError)
                            setPackageDescriptionError("");
                        }}
                        placeholder="Enter package description"
                        className={`transition-all ${
                          packageDescriptionError
                            ? "border-destructive focus-visible:ring-destructive/20"
                            : "focus-visible:ring-primary/20"
                        }`}
                      />
                      {packageDescriptionError && (
                        <p className="text-sm text-destructive flex items-center space-x-1">
                          <span className="w-1 h-1 bg-destructive rounded-full"></span>
                          <span>{packageDescriptionError}</span>
                        </p>
                      )}
                    </div>
                    {/* Days Validity and Credits - Two columns */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="package-days"
                          className="text-sm font-medium text-foreground flex items-center"
                        >
                          <Timer className="w-4 h-4" />
                          Days Validity
                        </Label>
                        <Input
                          id="package-days"
                          type="number"
                          min="1"
                          value={packageDaysValidity}
                          onChange={(e) => {
                            setPackageDaysValidity(e.target.value);
                            if (packageDaysValidityError)
                              setPackageDaysValidityError("");
                          }}
                          placeholder="30"
                          className={`transition-all ${
                            packageDaysValidityError
                              ? "border-destructive focus-visible:ring-destructive/20"
                              : "focus-visible:ring-primary/20"
                          }`}
                        />
                        {packageDaysValidityError && (
                          <p className="text-sm text-destructive flex items-center space-x-1">
                            <span className="w-1 h-1 bg-destructive rounded-full"></span>
                            <span>{packageDaysValidityError}</span>
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="package-credits"
                          className="text-sm font-medium text-foreground flex items-center"
                        >
                          <Coins className="w-4 h-4" />
                          Credits
                        </Label>
                        <Input
                          id="package-credits"
                          type="number"
                          min="1"
                          value={packageCredits}
                          onChange={(e) => {
                            setPackageCredits(e.target.value);
                            if (packageCreditsError) setPackageCreditsError("");
                          }}
                          placeholder="100"
                          className={`transition-all ${
                            packageCreditsError
                              ? "border-destructive focus-visible:ring-destructive/20"
                              : "focus-visible:ring-primary/20"
                          }`}
                        />
                        {packageCreditsError && (
                          <p className="text-sm text-destructive flex items-center space-x-1">
                            <span className="w-1 h-1 bg-destructive rounded-full"></span>
                            <span>{packageCreditsError}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Contact Us URL */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="package-contact-url"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <LinkIcon className="w-4 h-4" />
                        Contact Us URL
                      </Label>
                      <Input
                        id="package-contact-url"
                        type="url"
                        value={packageContactUrl}
                        onChange={(e) => {
                          setPackageContactUrl(e.target.value);
                          if (packageContactUrlError)
                            setPackageContactUrlError("");
                        }}
                        placeholder="https://example.com/contact"
                        className={`transition-all ${
                          packageContactUrlError
                            ? "border-destructive focus-visible:ring-destructive/20"
                            : "focus-visible:ring-primary/20"
                        }`}
                      />
                      {packageContactUrlError && (
                        <p className="text-sm text-destructive flex items-center space-x-1">
                          <span className="w-1 h-1 bg-destructive rounded-full"></span>
                          <span>{packageContactUrlError}</span>
                        </p>
                      )}
                    </div>
                    {/* Supported Sites */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="package-sites"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <Globe className="w-4 h-4" />
                        Supported Sites
                      </Label>
                      <Input
                        id="package-sites"
                        value={packageSupportedSites}
                        onChange={(e) =>
                          setPackageSupportedSites(e.target.value)
                        }
                        placeholder="Site A, Site B, Site C"
                        className="transition-all focus-visible:ring-primary/20"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter comma-separated list of supported sites
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddPackageDialogOpen(false)}
                      disabled={isAddingPackage}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleAddPackage}
                      disabled={isAddingPackage}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isAddingPackage ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Package className="w-4 h-4" />
                          Add Package
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* Edit Package Dialog */}
              <Dialog
                open={isEditPackageDialogOpen}
                onOpenChange={setIsEditPackageDialogOpen}
              >
                <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-foreground">
                      Edit Package
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Update the pricing package details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {/* Package Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-package-name"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <Package className="w-4 h-4" />
                        Plan Name
                      </Label>
                      <Input
                        id="edit-package-name"
                        value={editPackageName}
                        onChange={(e) => {
                          setEditPackageName(e.target.value);
                          if (editPackageNameError) setEditPackageNameError("");
                        }}
                        placeholder="Enter package name"
                        className={`transition-all ${
                          editPackageNameError
                            ? "border-destructive focus-visible:ring-destructive/20"
                            : "focus-visible:ring-primary/20"
                        }`}
                      />
                      {editPackageNameError && (
                        <p className="text-sm text-destructive flex items-center space-x-1">
                          <span className="w-1 h-1 bg-destructive rounded-full"></span>
                          <span>{editPackageNameError}</span>
                        </p>
                      )}
                    </div>
                    {/* Price */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-package-price"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <DollarSign className="w-4 h-4" />
                        Price
                      </Label>
                      <Input
                        id="edit-package-price"
                        value={editPackagePrice}
                        onChange={(e) => setEditPackagePrice(e.target.value)}
                        placeholder="Leave empty to show 'Contact Us'"
                        className="transition-all focus-visible:ring-primary/20"
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave empty to display Contact Us instead of a price
                      </p>
                    </div>
                    {/* Description */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-package-description"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <FileText className="w-4 h-4" />
                        Description
                      </Label>
                      <Input
                        id="edit-package-description"
                        value={editPackageDescription}
                        onChange={(e) => {
                          setEditPackageDescription(e.target.value);
                          if (editPackageDescriptionError)
                            setEditPackageDescriptionError("");
                        }}
                        placeholder="Enter package description"
                        className={`transition-all ${
                          editPackageDescriptionError
                            ? "border-destructive focus-visible:ring-destructive/20"
                            : "focus-visible:ring-primary/20"
                        }`}
                      />
                      {editPackageDescriptionError && (
                        <p className="text-sm text-destructive flex items-center space-x-1">
                          <span className="w-1 h-1 bg-destructive rounded-full"></span>
                          <span>{editPackageDescriptionError}</span>
                        </p>
                      )}
                    </div>
                    {/* Days Validity and Credits - Two columns */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="edit-package-days"
                          className="text-sm font-medium text-foreground flex items-center"
                        >
                          <Timer className="w-4 h-4" />
                          Days Validity
                        </Label>
                        <Input
                          id="edit-package-days"
                          type="number"
                          min="1"
                          value={editPackageDaysValidity}
                          onChange={(e) => {
                            setEditPackageDaysValidity(e.target.value);
                            if (editPackageDaysValidityError)
                              setEditPackageDaysValidityError("");
                          }}
                          placeholder="30"
                          className={`transition-all ${
                            editPackageDaysValidityError
                              ? "border-destructive focus-visible:ring-destructive/20"
                              : "focus-visible:ring-primary/20"
                          }`}
                        />
                        {editPackageDaysValidityError && (
                          <p className="text-sm text-destructive flex items-center space-x-1">
                            <span className="w-1 h-1 bg-destructive rounded-full"></span>
                            <span>{editPackageDaysValidityError}</span>
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="edit-package-credits"
                          className="text-sm font-medium text-foreground flex items-center"
                        >
                          <Coins className="w-4 h-4" />
                          Credits
                        </Label>
                        <Input
                          id="edit-package-credits"
                          type="number"
                          min="1"
                          value={editPackageCredits}
                          onChange={(e) => {
                            setEditPackageCredits(e.target.value);
                            if (editPackageCreditsError)
                              setEditPackageCreditsError("");
                          }}
                          placeholder="100"
                          className={`transition-all ${
                            editPackageCreditsError
                              ? "border-destructive focus-visible:ring-destructive/20"
                              : "focus-visible:ring-primary/20"
                          }`}
                        />
                        {editPackageCreditsError && (
                          <p className="text-sm text-destructive flex items-center space-x-1">
                            <span className="w-1 h-1 bg-destructive rounded-full"></span>
                            <span>{editPackageCreditsError}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Contact Us URL */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-package-contact-url"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <LinkIcon className="w-4 h-4" />
                        Contact Us URL
                      </Label>
                      <Input
                        id="edit-package-contact-url"
                        type="url"
                        value={editPackageContactUrl}
                        onChange={(e) => {
                          setEditPackageContactUrl(e.target.value);
                          if (editPackageContactUrlError)
                            setEditPackageContactUrlError("");
                        }}
                        placeholder="https://example.com/contact"
                        className={`transition-all ${
                          editPackageContactUrlError
                            ? "border-destructive focus-visible:ring-destructive/20"
                            : "focus-visible:ring-primary/20"
                        }`}
                      />
                      {editPackageContactUrlError && (
                        <p className="text-sm text-destructive flex items-center space-x-1">
                          <span className="w-1 h-1 bg-destructive rounded-full"></span>
                          <span>{editPackageContactUrlError}</span>
                        </p>
                      )}
                    </div>
                    {/* Supported Sites */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-package-sites"
                        className="text-sm font-medium text-foreground flex items-center"
                      >
                        <Globe className="w-4 h-4" />
                        Supported Sites
                      </Label>
                      <Input
                        id="edit-package-sites"
                        value={editPackageSupportedSites}
                        onChange={(e) =>
                          setEditPackageSupportedSites(e.target.value)
                        }
                        placeholder="Site A, Site B, Site C"
                        className="transition-all focus-visible:ring-primary/20"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter comma-separated list of supported sites
                      </p>
                    </div>
                  </div>
                  <DialogFooter className="flex justify-between items-center">
                    <div className="flex-1">
                      <AlertDialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            disabled={isEditingPackage}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Package</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete
                              {editingPackage?.name}? This action cannot be
                              undone and will permanently remove this pricing
                              package.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeletingPackage}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeletePackage}
                              disabled={isDeletingPackage}
                              className="bg-destructive hover:bg-destructive/70 text-white"
                            >
                              {isDeletingPackage ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <Trash2 className="w-4 h-4" />
                                  Delete Package
                                </>
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditPackageDialogOpen(false)}
                        disabled={isEditingPackage}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleUpdatePackage}
                        disabled={isEditingPackage}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {isEditingPackage ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Settings className="w-4 h-4" />
                            Update Package
                          </>
                        )}
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {pricingPlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className="relative overflow-hidden border-border/50 p-0"
                  >
                    <CardContent className="p-0 dark:bg-secondary">
                      {/* Header Section */}
                      <div className="bg-secondary/50 dark:bg-secondary p-4 sm:p-6 border-b border-border/50">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">
                              {plan.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {plan.description}
                            </p>
                          </div>
                          <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
                            <Package className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                      </div>
                      {/* Details Section */}
                      <div className="p-4 sm:p-6 space-y-4">
                        {/* Credits and Validity */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                              <Coins className="w-4 h-4" />
                              <span>Credits</span>
                            </div>
                            <p className="text-base sm:text-lg font-semibold text-foreground">
                              {plan.credits.toLocaleString()}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                              <Timer className="w-4 h-4" />
                              <span>Validity</span>
                            </div>
                            <p className="text-base sm:text-lg font-semibold text-foreground">
                              {plan.daysValidity} days
                            </p>
                          </div>
                        </div>
                        {/* Supported Sites */}
                        {plan.supportedSites &&
                          plan.supportedSites.length > 0 && (
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Globe className="w-4 h-4" />
                                <span>Supported Sites</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {plan.supportedSites.map((site, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-secondary/50 dark:bg-card/50 border border-secondary text-sm font-medium text-foreground"
                                  >
                                    <div className="w-4 h-4 bg-primary/10 border border-primary/10 rounded flex items-center justify-center">
                                      <Globe className="w-3 h-3 text-primary" />
                                    </div>
                                    <span>{site}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 stroke-3" />
                          <span>Features</span>
                        </div>
                        {/* Features */}
                        <div className="space-y-3">
                          <div className="space-y-3">
                            {plan.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-50/10 border border-green-100 dark:border-green-100/10"
                              >
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-foreground font-medium text-sm">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Footer Section */}
                      <div className="p-6 pt-0 space-y-3">
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => handleEditPackage(plan)}
                        >
                          <Settings className="w-4 h-4" />
                          Manage Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

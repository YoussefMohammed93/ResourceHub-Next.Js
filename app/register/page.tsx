"use client";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle,
  Loader2,
  Download,
  Image as ImageIcon,
  Video,
  Palette,
  Layers,
  Camera,
  Zap,
  Heart,
  Star,
  Sparkles,
  Globe,
  Shield,
  Rocket,
  Music,
  Code,
  Brush,
  Lightbulb,
  Target,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/components/i18n-provider";
import { HeaderControls } from "@/components/header-controls";

// Email validation function
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
const validatePassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasMinLength = password.length >= 8;

  return {
    isValid: hasUpperCase && hasLowerCase && hasNumbers && hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasMinLength,
  };
};

export default function RegisterPage() {
  const { t } = useTranslation("common");
  const { isRTL, isLoading } = useLanguage();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // Error state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: "",
    };

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = t("register.validation.firstNameRequired");
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("register.validation.lastNameRequired");
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t("register.validation.emailRequired");
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t("register.validation.invalidEmail");
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t("register.validation.passwordRequired");
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (formData.password.length < 8) {
        newErrors.password = t("register.validation.passwordTooShort");
      } else if (!passwordValidation.isValid) {
        newErrors.password = t("register.validation.passwordWeak");
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t(
        "register.validation.confirmPasswordRequired"
      );
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("register.validation.passwordsDoNotMatch");
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.terms = t("register.validation.termsRequired");
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Here you would typically handle the registration response
      console.log("Registration data:", formData);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary/50 flex items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${isRTL ? "font-tajawal" : "font-sans"}`}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-200/30 dark:from-orange-950/20 dark:via-orange-900/10 dark:to-orange-800/5"></div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Dots Grid */}
        <svg
          className="absolute top-20 left-4 sm:left-10 w-24 sm:w-32 h-18 sm:h-24 opacity-20 sm:opacity-30"
          viewBox="0 0 140 100"
          fill="none"
        >
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 8 }, (_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={10 + col * 16}
                cy={10 + row * 14}
                r="2"
                fill="currentColor"
                className="text-primary animate-pulse"
                style={{
                  animationDelay: `${(row + col) * 0.2}s`,
                  animationDuration: "3s",
                }}
              />
            ))
          )}
        </svg>

        {/* Floating Icons - Hidden on mobile for better UX */}
        <div className="hidden md:block absolute top-32 right-64 animate-float">
          <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Download className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className="hidden sm:block absolute top-64 left-20 animate-float-delayed">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-32 right-64 animate-float">
          <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Video className="w-7 h-7 text-primary" />
          </div>
        </div>

        <div className="hidden md:block absolute top-48 left-1/4 animate-float-delayed">
          <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Palette className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-48 left-16 animate-float">
          <div className="w-11 h-11 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Layers className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-80 right-1/4 animate-float-delayed">
          <div className="w-9 h-9 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Camera className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* New Icons - 2 on left, 1 on right */}
        <div className="hidden md:block absolute top-96 left-6 animate-float">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-64 left-64 animate-float-delayed">
          <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-40 right-8 animate-float">
          <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Additional Dots Shape - Center */}
        <svg
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 sm:w-28 h-16 sm:h-20 opacity-10 sm:opacity-15"
          viewBox="0 0 120 80"
          fill="none"
        >
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 7 }, (_, col) => (
              <circle
                key={`center-${row}-${col}`}
                cx={8 + col * 16}
                cy={8 + row * 14}
                r="1.5"
                fill="currentColor"
                className="text-primary animate-pulse"
                style={{
                  animationDelay: `${(row + col) * 0.4}s`,
                  animationDuration: "5s",
                }}
              />
            ))
          )}
        </svg>

        {/* Additional Dots */}
        <svg
          className="absolute bottom-20 right-4 sm:right-20 w-16 sm:w-24 h-14 sm:h-20 opacity-15 sm:opacity-20"
          viewBox="0 0 100 80"
          fill="none"
        >
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 6 }, (_, col) => (
              <circle
                key={`bottom-${row}-${col}`}
                cx={8 + col * 14}
                cy={8 + row * 16}
                r="1.5"
                fill="currentColor"
                className="text-primary animate-pulse"
                style={{
                  animationDelay: `${(row + col) * 0.3}s`,
                  animationDuration: "4s",
                }}
              />
            ))
          )}
        </svg>

        {/* Additional Dot Shapes */}
        {/* Top Right Corner Dots */}
        <svg
          className="absolute top-16 right-16 w-20 sm:w-28 h-16 sm:h-20 opacity-10 sm:opacity-15"
          viewBox="0 0 120 80"
          fill="none"
        >
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 6 }, (_, col) => (
              <circle
                key={`top-right-${row}-${col}`}
                cx={8 + col * 18}
                cy={8 + row * 16}
                r="2"
                fill="currentColor"
                className="text-primary animate-pulse"
                style={{
                  animationDelay: `${(row + col) * 0.5}s`,
                  animationDuration: "6s",
                }}
              />
            ))
          )}
        </svg>

        {/* Middle Left Dots */}
        <svg
          className="absolute top-1/2 left-8 transform -translate-y-1/2 w-18 sm:w-24 h-20 sm:h-28 opacity-8 sm:opacity-12"
          viewBox="0 0 100 120"
          fill="none"
        >
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 4 }, (_, col) => (
              <circle
                key={`mid-left-${row}-${col}`}
                cx={8 + col * 20}
                cy={8 + row * 18}
                r="1.8"
                fill="currentColor"
                className="text-primary animate-pulse"
                style={{
                  animationDelay: `${(row + col) * 0.6}s`,
                  animationDuration: "7s",
                }}
              />
            ))
          )}
        </svg>

        {/* Bottom Left Corner Dots */}
        <svg
          className="absolute bottom-32 left-32 w-22 sm:w-30 h-18 sm:h-24 opacity-12 sm:opacity-18"
          viewBox="0 0 130 100"
          fill="none"
        >
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 7 }, (_, col) => (
              <circle
                key={`bottom-left-${row}-${col}`}
                cx={8 + col * 16}
                cy={8 + row * 16}
                r="1.6"
                fill="currentColor"
                className="text-primary animate-pulse"
                style={{
                  animationDelay: `${(row + col) * 0.25}s`,
                  animationDuration: "5.5s",
                }}
              />
            ))
          )}
        </svg>

        {/* Additional 10 Floating Icons */}
        <div className="hidden sm:block absolute top-20 right-32 animate-float">
          <div className="w-9 h-9 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div className="hidden md:block absolute top-72 left-48 animate-float-delayed">
          <div className="w-11 h-11 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-40 right-32 animate-float">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="hidden sm:block absolute top-56 right-12 animate-float-delayed">
          <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Rocket className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div className="hidden md:block absolute bottom-56 left-32 animate-float">
          <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Music className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute top-44 left-8 animate-float-delayed">
          <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-24 right-48 animate-float">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Brush className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="hidden md:block absolute top-88 right-20 animate-float-delayed">
          <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-72 left-12 animate-float">
          <div className="w-11 h-11 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="hidden sm:block absolute top-32 left-56 animate-float-delayed">
          <div className="w-9 h-9 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Trophy className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Repeat some icons for more density */}
        <div className="hidden md:block absolute top-60 left-72 animate-float">
          <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Download className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-80 right-56 animate-float-delayed">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="px-4 sm:px-5 py-4">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          <Card className="border-border dark:bg-muted/80 shadow-xs">
            <CardHeader className="space-y-1 text-center">
              <CardTitle
                className={`text-2xl font-bold text-foreground ${isRTL ? "text-right" : "text-left"}`}
              >
                {t("register.title")}
              </CardTitle>
              <CardDescription
                className={`text-muted-foreground ${isRTL ? "text-right" : "text-left"}`}
              >
                {t("register.subtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <User className="w-4 h-4 inline" />
                      {t("register.form.firstName.label")}
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder={t("register.form.firstName.placeholder")}
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={`${isRTL ? "text-right" : "text-left"} ${errors.firstName ? "border-destructive" : ""}`}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    {errors.firstName && (
                      <p
                        className={`text-sm text-destructive ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className={isRTL ? "text-right" : "text-left"}
                    >
                      <User className="w-4 h-4 inline" />
                      {t("register.form.lastName.label")}
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder={t("register.form.lastName.placeholder")}
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={`${isRTL ? "text-right" : "text-left"} ${errors.lastName ? "border-destructive" : ""}`}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    {errors.lastName && (
                      <p
                        className={`text-sm text-destructive ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className={isRTL ? "text-right" : "text-left"}
                  >
                    <Mail className="w-4 h-4 inline" />
                    {t("register.form.email.label")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("register.form.email.placeholder")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`${isRTL ? "text-right" : "text-left"} ${errors.email ? "border-destructive" : ""}`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  {errors.email && (
                    <p
                      className={`text-sm text-destructive ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className={isRTL ? "text-right" : "text-left"}
                  >
                    <Lock className="w-4 h-4 inline" />
                    {t("register.form.password.label")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("register.form.password.placeholder")}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`${isRTL ? "text-right pr-10" : "text-left pr-10"} ${errors.password ? "border-destructive" : ""}`}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground ${isRTL ? "left-3" : "right-3"}`}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p
                      className={`text-sm text-destructive ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className={isRTL ? "text-right" : "text-left"}
                  >
                    <Lock className="w-4 h-4 inline" />
                    {t("register.form.confirmPassword.label")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t(
                        "register.form.confirmPassword.placeholder"
                      )}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className={`${isRTL ? "text-right pr-10" : "text-left pr-10"} ${errors.confirmPassword ? "border-destructive" : ""}`}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground ${isRTL ? "left-3" : "right-3"}`}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p
                      className={`text-sm text-destructive ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="space-y-2">
                  <div
                    className={`flex items-start space-x-2 ${isRTL ? "space-x-reverse !space-x-2" : ""}`}
                  >
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeToTerms", checked)
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor="terms"
                      className={`text-[11px] sm:text-sm leading-relaxed cursor-pointer ${isRTL ? "text-right text-[13px]" : "text-left"}`}
                    >
                      {t("register.form.terms.label")}{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                        {t("register.form.terms.termsLink")}
                      </Link>{" "}
                      {t("register.form.terms.and")}{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline"
                      >
                        {t("register.form.terms.privacyLink")}
                      </Link>
                    </Label>
                  </div>
                  {errors.terms && (
                    <p
                      className={`text-sm text-destructive ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {errors.terms}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      {t("register.form.submitting")}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      {t("register.form.submitButton")}
                    </>
                  )}
                </Button>

                {/* Footer */}
                <div
                  className={`text-center text-sm text-muted-foreground ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t("register.footer.alreadyHaveAccount")}{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    {t("register.footer.loginLink")}
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

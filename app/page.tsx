"use client";

import {
  Search,
  Image as ImageIcon,
  Video,
  Eye,
  PhoneCall,
  Menu,
  X,
  Cat,
  Check,
  Zap,
  Crown,
  Globe,
  Timer,
  Coins,
  ExternalLink,
  Shield,
  Download,
  Sparkles,
  Users,
  Star,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/user-dropdown";

const categories = [
  "Nature",
  "Business",
  "Technology",
  "Travel",
  "Sports",
  "Art",
];

// Fake site data for supported sites
const supportedSites = {
  basic: [
    {
      id: 1,
      name: "Freepik",
      icon: "https://cdn.worldvectorlogo.com/logos/freepik-1.svg",
    },
    {
      id: 2,
      name: "Shutterstock",
      icon: "https://cdn.worldvectorlogo.com/logos/shutterstock.svg",
    },
  ],
  advanced: [
    {
      id: 1,
      name: "Freepik",
      icon: "https://cdn.worldvectorlogo.com/logos/freepik-1.svg",
    },
    {
      id: 2,
      name: "Shutterstock",
      icon: "https://cdn.worldvectorlogo.com/logos/shutterstock.svg",
    },
    {
      id: 3,
      name: "Adobe Stock",
      icon: "https://cdn.worldvectorlogo.com/logos/adobe-2.svg",
    },
  ],
  premium: [
    {
      id: 1,
      name: "Freepik",
      icon: "https://cdn.worldvectorlogo.com/logos/freepik-1.svg",
    },
    {
      id: 2,
      name: "Shutterstock",
      icon: "https://cdn.worldvectorlogo.com/logos/shutterstock.svg",
    },
    {
      id: 3,
      name: "Adobe Stock",
      icon: "https://cdn.worldvectorlogo.com/logos/adobe-2.svg",
    },
    {
      id: 4,
      name: "Getty Images",
      icon: "https://cdn.worldvectorlogo.com/logos/getty-images-1.svg",
    },
    {
      id: 5,
      name: "Unsplash",
      icon: "https://cdn.worldvectorlogo.com/logos/unsplash-1.svg",
    },
  ],
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-5">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="cursor-pointer md:hidden p-2 hover:bg-muted rounded-lg transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
              </div>
              <Link
                href="/"
                className="text-lg sm:text-xl font-semibold text-foreground"
              >
                ResourceHub
              </Link>
            </div>
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/categories">
                <Button
                  variant="ghost"
                  className="hover:bg-primary hover:text-white"
                >
                  Categories
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="ghost"
                  className="hover:bg-primary hover:text-white"
                >
                  Pricing
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="ghost"
                  className="hover:bg-primary hover:text-white"
                >
                  About
                </Button>
              </Link>
            </nav>
            {/* User Dropdown */}
            <UserDropdown />
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {/* Mobile Navigation Menu */}
      <aside
        className={`fixed left-0 top-0 w-72 h-screen bg-background border-r border-border z-50 transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Mobile Close Button */}
          <div className="absolute right-6 top-5">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="cursor-pointer p-2 hover:bg-muted rounded-lg transition-colors min-h-[33px] min-w-[33px] flex items-center justify-center"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Logo Section */}
            <div className="flex items-center space-x-2 pb-4 border-b border-border">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
              </div>
              <span className="text-lg font-semibold text-foreground">
                ResourceHub
              </span>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              <Link
                href="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-base">Categories</span>
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-base">Pricing</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-base">About</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary/20 via-primary/5 to-primary/20 py-12 md:pb-20 md:pt-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-35"></div>
        {/* Shape 1 - Grid Dots Pattern (like your reference image) */}
        <div className="absolute bottom-32 left-5/12 transform -translate-x-1/2 md:bottom-40">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            className="text-primary/60"
          >
            {/* Grid of dots - 8 rows x 10 columns */}
            {Array.from({ length: 8 }, (_, row) =>
              Array.from({ length: 10 }, (_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={10 + col * 14}
                  cy={10 + row * 12}
                  r="2"
                  fill="currentColor"
                  className="animate-pulse-slow"
                  style={{
                    animationDelay: `${(row + col) * 0.1}s`,
                    opacity: Math.random() * 0.5 + 0.3,
                  }}
                />
              ))
            )}
          </svg>
        </div>
        {/* Shape 2 - Square Grid Pattern (Left Side) */}
        <div className="hidden md:block absolute top-1/3 left-4 md:left-8">
          <svg
            width="100"
            height="120"
            viewBox="0 0 100 120"
            fill="none"
            className="text-primary/40"
          >
            {/* Grid of squares - 8 rows x 8 columns */}
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
        {/* Shape 3 - Diamond Grid Pattern (Bottom Right) */}
        <div className="absolute bottom-20 right-12 md:bottom-32 md:right-20">
          <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            className="text-primary/45"
          >
            {/* Grid of diamonds - 5 rows x 5 columns */}
            {Array.from({ length: 5 }, (_, row) =>
              Array.from({ length: 5 }, (_, col) => (
                <rect
                  key={`diamond-${row}-${col}`}
                  x={10 + col * 16}
                  y={10 + row * 16}
                  width="4"
                  height="4"
                  transform={`rotate(45 ${12 + col * 16} ${12 + row * 16})`}
                  fill="currentColor"
                  className="animate-pulse-slow"
                  style={{
                    animationDelay: `${(row + col) * 0.15}s`,
                    opacity: Math.random() * 0.4 + 0.4,
                  }}
                />
              ))
            )}
          </svg>
        </div>
        {/* Shape 4 - Top Center Left Dots */}
        <div className="absolute top-12 left-1/3 md:top-16 md:left-2/5 opacity-30">
          <svg
            width="60"
            height="40"
            viewBox="0 0 60 40"
            fill="none"
            className="text-primary/40"
          >
            {/* Small grid of dots - 3 rows x 4 columns */}
            {Array.from({ length: 3 }, (_, row) =>
              Array.from({ length: 4 }, (_, col) => (
                <circle
                  key={`top-center-${row}-${col}`}
                  cx={8 + col * 12}
                  cy={8 + row * 12}
                  r="1.5"
                  fill="currentColor"
                  className="animate-pulse-slow"
                  style={{
                    animationDelay: `${(row + col) * 0.2}s`,
                    opacity: Math.random() * 0.5 + 0.4,
                  }}
                />
              ))
            )}
          </svg>
        </div>
        {/* Shape 5 - Top Center Right Floating Icon */}
        <div className="hidden md:block absolute top-8 right-1/3 md:top-12 md:right-2/5">
          <div className="w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center animate-float">
            <Shield className="w-5 h-5 text-primary" />
          </div>
        </div>
        {/* Shape 6 - Top Center Right Small Squares */}
        <div className="absolute top-16 right-1/4 md:top-20 md:right-1/3 opacity-35">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="text-primary/30"
          >
            {/* Small squares grid - 3x3 */}
            {Array.from({ length: 3 }, (_, row) =>
              Array.from({ length: 3 }, (_, col) => (
                <rect
                  key={`square-top-${row}-${col}`}
                  x={6 + col * 12}
                  y={6 + row * 12}
                  width="3"
                  height="3"
                  fill="currentColor"
                  className="animate-pulse-slow"
                  style={{
                    animationDelay: `${(row + col) * 0.15}s`,
                    opacity: Math.random() * 0.5 + 0.3,
                  }}
                />
              ))
            )}
          </svg>
        </div>
        <div className="container mx-auto max-w-7xl px-5 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-8 lg:space-y-10">
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
                  Discover Millions of{" "}
                  <span className="text-primary sm:text-6xl">
                    Creative Resources
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Download high-quality stock photos, vectors, illustrations,
                  and videos. Get credits to access premium content from top
                  creative platforms worldwide.
                </p>
              </div>
              {/* Search Bar */}
              <div className="w-full max-w-2xl">
                {/* Mobile Layout */}
                <div className="sm:hidden space-y-3">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 stroke-3 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search photos, vectors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="pl-12 pr-4 py-6 text-lg border-2 border-border focus:border-primary rounded-xl bg-background/80 backdrop-blur-sm w-full"
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                  >
                    <Search className="w-5 h-5 stroke-3" />
                    Search
                  </Button>
                </div>
                {/* Desktop Layout */}
                <div className="hidden sm:block">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search for photos, vectors, illustrations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="pl-4 sm:pl-8 pr-32 py-7 text-lg border-2 border-border focus:border-primary rounded-xl bg-background/80 backdrop-blur-sm"
                    />
                    <Button
                      onClick={handleSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 !h-11 bg-primary hover:bg-primary/90"
                    >
                      <Search className="w-4 h-4 stroke-3" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
              {/* Popular Searches */}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground font-medium">
                  Popular searches :
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Business",
                    "Nature",
                    "Technology",
                    "People",
                    "Abstract",
                    "Astronomy",
                  ].map((term) => (
                    <Badge
                      key={term}
                      variant="outline"
                      onClick={() => {
                        setSearchQuery(term);
                        window.location.href = `/search?q=${encodeURIComponent(term)}`;
                      }}
                      className="px-3 py-2 cursor-pointer bg-background hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* CTA Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="!px-8 py-6 font-semibold">
                  <Eye className="size-5" />
                  View Pricing
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="!px-8 py-6 font-semibold"
                >
                  <PhoneCall className="size-5" />
                  Contact Us
                </Button>
              </div>
            </div>
            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg lg:max-w-xl">
                <div className="relative">
                  <Image
                    src="/hero.svg"
                    alt="Creative resources illustration"
                    width={500}
                    height={500}
                    className="w-full h-auto"
                    priority
                  />
                  {/* Floating elements for visual appeal */}
                  <div className="absolute -top-3 right-3 sm:-right-3 w-14 h-14 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center animate-float">
                    <ImageIcon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="absolute -bottom-8 -left-1 sm:-left-8 w-14 h-14 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center animate-float-delayed">
                    <Video className="w-7 h-7 text-primary" />
                  </div>
                  <div className="absolute top-1/4 -left-6 sm:-left-10 w-12 h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center animate-bounce-slow">
                    <Download className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute top-5/8 -right-4 sm:-right-8 w-12 h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center animate-float-delayed">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute top-3/4 -left-8 sm:-left-12 w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center animate-float">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="absolute bottom-5/8 -right-6 sm:-right-10 w-10 h-10 bg-primary/10 border border-primary/10 rounded-lg flex items-center justify-center animate-bounce-slow">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-secondary via-secondary/50 to-secondary relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-5 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight font-sans">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Resource Hub
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Everything you need to access premium creative resources from top
              platforms worldwide.
            </p>
          </div>
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 - High Quality Resources */}
            <div className="group bg-card border border-border rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:border-primary/30 relative overflow-hidden">
              {/* Hover effect overlay - diagonal sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl transform translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 border border-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-150">
                  <Star className="w-7 h-7 text-primary" />
                </div>
                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3 font-sans">
                  Premium Quality
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  Access millions of high-resolution images, vectors, and videos
                  from top creative platforms with guaranteed quality.
                </p>
              </div>
            </div>
            {/* Feature 2 - Fast Downloads */}
            <div className="group bg-card border border-border rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:border-primary/30 relative overflow-hidden">
              {/* Hover effect overlay - diagonal sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl transform translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 border border-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-150">
                  <Download className="w-7 h-7 text-primary" />
                </div>
                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3 font-sans">
                  Instant Downloads
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  Download your favorite resources instantly with our optimized
                  servers and lightning-fast delivery system.
                </p>
              </div>
            </div>
            {/* Feature 3 - Multiple Platforms */}
            <div className="group bg-card border border-border rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:border-primary/30 relative overflow-hidden">
              {/* Hover effect overlay - diagonal sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl transform translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 border border-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-150">
                  <Globe className="w-7 h-7 text-primary" />
                </div>
                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3 font-sans">
                  All Platforms
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  One subscription gives you access to Freepik, Shutterstock,
                  Adobe Stock, and many more premium platforms.
                </p>
              </div>
            </div>
            {/* Feature 4 - Secure & Safe */}
            <div className="group bg-card border border-border rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:border-primary/30 relative overflow-hidden">
              {/* Hover effect overlay - diagonal sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl transform translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 border border-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-150">
                  <Shield className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3 font-sans">
                  Secure & Safe
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  Your data is protected with enterprise-grade security. Safe
                  downloads with no malware or unwanted software.
                </p>
              </div>
            </div>
            {/* Feature 5 - 24/7 Support */}
            <div className="group bg-card border border-border rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:border-primary/30 relative overflow-hidden">
              {/* Hover effect overlay - diagonal sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl transform translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 border border-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-150">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3 font-sans">
                  24/7 Support
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  Get help whenever you need it with our dedicated support team
                  available around the clock.
                </p>
              </div>
            </div>
            {/* Feature 6 - Easy to Use */}
            <div className="group bg-card border border-border rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:border-primary/30 relative overflow-hidden">
              {/* Hover effect overlay - diagonal sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl transform translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 border border-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-150">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3 font-sans">
                  Easy to Use
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  Simple and intuitive interface designed for creators. Search,
                  preview, and download in just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-12 pb-16 bg-gradient-to-br from-secondary/10 via-secondary/20 to-secondary/10 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Popular{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover trending content across our most popular categories and
              find exactly what you&apos;re looking for.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {categories.map((category, index) => {
              // Function to render appropriate icon for each category
              const renderCategoryIcon = () => {
                switch (category) {
                  case "Art":
                    return <Cat className="w-8 h-8 text-primary" />;
                  case "Nature":
                    return (
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    );
                  case "Business":
                    return (
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    );
                  case "Technology":
                    return (
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      </svg>
                    );
                  case "Travel":
                    return (
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    );
                  case "Sports":
                    return (
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    );
                  default:
                    return (
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    );
                }
              };
              return (
                <div
                  key={index}
                  onClick={() => {
                    window.location.href = `/search?q=${encodeURIComponent(category)}`;
                  }}
                  className="group relative dark:bg-card bg-background/50 shadow-2xs backdrop-blur-sm border border-border/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-background/80 hover:border-primary/30 flex flex-col items-center text-center"
                >
                  {/* Category icon */}
                  <div className="w-14 h-14 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {renderCategoryIcon()}
                  </div>

                  <h3 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                    {category}
                  </h3>
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-br from-secondary via-secondary/50 to-secondary relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-5 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Get access to millions of premium resources with our flexible
              pricing plans designed for every need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Basic Plan */}
            <div className="group relative dark:bg-card bg-background backdrop-blur-sm shadow-xs border border-border/50 rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:bg-background/80 hover:border-primary/30 flex flex-col">
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex flex-col h-full space-y-6">
                {/* Plan Header */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        Basic Plan
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Perfect for getting started
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-foreground">
                        Contact Us
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Custom pricing available
                    </p>
                  </div>
                </div>

                {/* Plan Features */}
                <div className="space-y-4 flex-1">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Credits:
                      </span>
                      <div className="flex items-center space-x-1">
                        <Coins className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          50
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Validity:
                      </span>
                      <div className="flex items-center space-x-1">
                        <Timer className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          15 days
                        </span>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex items-center justify-between cursor-pointer hover:bg-muted rounded-lg p-2 -m-2 transition-colors">
                          <span className="text-sm text-muted-foreground">
                            Supported Sites:
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            2 sites
                          </span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Supported Sites - Basic Plan
                          </DialogTitle>
                          <DialogDescription>
                            These are the websites you can access with this plan
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                          {supportedSites.basic.map((site) => (
                            <div
                              key={site.id}
                              className="flex flex-col items-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <Image
                                src={site.icon}
                                alt={`${site.name} icon`}
                                width={96}
                                height={96}
                                className="w-24 h-24 rounded-lg mb-3 object-contain"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "https://via.placeholder.com/96x96/6366f1/ffffff?text=" +
                                    site.name.charAt(0);
                                }}
                              />
                              <span className="text-sm font-medium text-foreground text-center">
                                {site.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-3">
                      Features included:
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Access to all sites",
                        "24/7 Support",
                        "Admin Management",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button - Now at bottom */}
                <div className="mt-auto pt-4">
                  <Button
                    className="w-full py-6 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                    asChild
                  >
                    <a
                      href="https://example.com/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 stroke-3" />
                      Contact Us
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            {/* Advanced Plan */}
            <div className="group relative dark:bg-card bg-background/50 backdrop-blur-sm shadow-xs border border-border/50 rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:bg-background/80 hover:border-primary/30 flex flex-col">
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex flex-col h-full space-y-6">
                {/* Plan Header */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Crown className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        Advanced Plan
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Perfect for management
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold text-primary">
                        $99
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /month
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Best value for professionals
                    </p>
                  </div>
                </div>

                {/* Plan Features */}
                <div className="space-y-4 flex-1">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Credits:
                      </span>
                      <div className="flex items-center space-x-1">
                        <Coins className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          1,000
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Validity:
                      </span>
                      <div className="flex items-center space-x-1">
                        <Timer className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          30 days
                        </span>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex items-center justify-between cursor-pointer hover:bg-muted rounded-lg p-2 -m-2 transition-colors">
                          <span className="text-sm text-muted-foreground">
                            Supported Sites:
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            3 sites
                          </span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Supported Sites - Advanced Plan
                          </DialogTitle>
                          <DialogDescription>
                            These are the websites you can access with this plan
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                          {supportedSites.advanced.map((site) => (
                            <div
                              key={site.id}
                              className="flex flex-col items-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <Image
                                src={site.icon}
                                alt={`${site.name} icon`}
                                width={96}
                                height={96}
                                className="w-24 h-24 rounded-lg mb-3 object-contain"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "https://via.placeholder.com/96x96/6366f1/ffffff?text=" +
                                    site.name.charAt(0);
                                }}
                              />
                              <span className="text-sm font-medium text-foreground text-center">
                                {site.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-3">
                      Features included:
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Access to all sites",
                        "24/7 Support",
                        "Admin Management",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button - Now at bottom */}
                <div className="mt-auto pt-4">
                  <Button className="w-full py-6 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                    <Crown className="w-4 h-4" />
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
            {/* Premium Plan */}
            <div className="group relative dark:bg-card bg-background/50 backdrop-blur-sm shadow-xs border border-border/50 rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:bg-background/80 hover:border-primary/30 flex flex-col">
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex flex-col h-full space-y-6">
                {/* Plan Header */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        Premium Plan
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        For power users and teams
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-foreground">
                        $199
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /month
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maximum resources and features
                    </p>
                  </div>
                </div>

                {/* Plan Features */}
                <div className="space-y-4 flex-1">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Credits:
                      </span>
                      <div className="flex items-center space-x-1">
                        <Coins className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          5,000
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Validity:
                      </span>
                      <div className="flex items-center space-x-1">
                        <Timer className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          60 days
                        </span>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex items-center justify-between cursor-pointer hover:bg-muted rounded-lg p-2 -m-2 transition-colors">
                          <span className="text-sm text-muted-foreground">
                            Supported Sites:
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            All sites
                          </span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Supported Sites - Premium Plan
                          </DialogTitle>
                          <DialogDescription>
                            These are the websites you can access with this plan
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                          {supportedSites.premium.map((site) => (
                            <div
                              key={site.id}
                              className="flex flex-col items-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <Image
                                src={site.icon}
                                alt={`${site.name} icon`}
                                width={96}
                                height={96}
                                className="w-24 h-24 rounded-lg mb-3 object-contain"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "https://via.placeholder.com/96x96/6366f1/ffffff?text=" +
                                    site.name.charAt(0);
                                }}
                              />
                              <span className="text-sm font-medium text-foreground text-center">
                                {site.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-3">
                      Features included:
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Access to all sites",
                        "Priority Support",
                        "Advanced Analytics",
                        "Team Management",
                        "API Access",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button - Now at bottom */}
                <div className="mt-auto pt-4">
                  <Button className="w-full py-6 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                    <Globe className="w-4 h-4" />
                    Get Premium
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Additional Info */}
          <div className="pt-14 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              All plans include access to our premium resource library and
              customer support.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}

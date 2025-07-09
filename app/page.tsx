"use client";

import {
  Search,
  ChevronDown,
  Settings,
  LogOut,
  Image as ImageIcon,
  Video,
  Eye,
  PhoneCall,
  Menu,
  X,
  Cat,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const categories = [
  "Nature",
  "Business",
  "Technology",
  "Travel",
  "Sports",
  "Art",
];

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
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/categories"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/pricing"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
            </nav>

            {/* User Dropdown */}
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 rounded-lg px-2 py-1 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="avatar"
                      />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        YM
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm text-muted-foreground">
                      Youssef Mohammed
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-foreground">
                      Youssef Mohammed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      youssef.mohammed@example.com
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a
                      href="/settings"
                      className="flex items-center cursor-pointer"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 text-destructive" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
                      className="pl-4 sm:pl-8 pr-32 py-6 text-lg border-2 border-border focus:border-primary rounded-xl bg-background/80 backdrop-blur-sm"
                    />
                    <Button
                      onClick={handleSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary hover:bg-primary/90"
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
                  <div className="absolute -top-3 right-3 sm:-right-3 w-16 h-16 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -bottom-8 -left-1 sm:-left-8 w-16 h-16 bg-primary/10 border border-primary/10 rounded-xl flex items-center justify-center">
                    <Video className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-12 bg-gradient-to-br from-secondary/10 via-secondary/20 to-secondary/10 relative overflow-hidden">
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
              find exactly what you&apos;re looking for
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
                  className="group relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-background/80 hover:border-primary/30 flex flex-col items-center text-center"
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
    </div>
  );
}

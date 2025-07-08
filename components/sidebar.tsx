"use client";

import {
  BarChart3,
  Users,
  Globe,
  DollarSign,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const Sidebar = ({ isOpen = false, onToggle }: SidebarProps) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLinkClick = () => {
    if (isMobile && onToggle) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 w-72 h-screen bg-background border-r border-border z-50 transition-transform duration-300 ease-in-out",
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        )}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Mobile Close Button */}
          {isMobile && (
            <div className="absolute right-6 top-2 lg:hidden">
              <button
                onClick={onToggle}
                className="cursor-pointer p-2 hover:bg-muted rounded-lg transition-colors min-h-[33px] min-w-[33px] flex items-center justify-center"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          )}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                <div className="size-3 bg-primary rounded-full"></div>
                <span className="text-sm">OVERVIEW</span>
              </div>
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/dashboard"
                      ? "bg-secondary text-foreground"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  <div className="size-8 bg-blue-500 flex items-center justify-center">
                    <BarChart3 className="size-4 text-white" />
                  </div>
                  <span
                    className={cn(
                      "text-base font-medium",
                      pathname === "/dashboard"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Dashboard
                  </span>
                </Link>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                <div className="size-3 bg-primary rounded-full"></div>
                <span className="text-sm">MANAGEMENT</span>
              </div>
              <div className="space-y-1">
                <Link
                  href="/users"
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/users"
                      ? "bg-secondary text-foreground"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  <div className="size-8 bg-green-500 flex items-center justify-center">
                    <Users className="size-4 text-white" />
                  </div>
                  <span
                    className={cn(
                      "text-base",
                      pathname === "/users"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Users Management
                  </span>
                </Link>
                <Link
                  href="/sites"
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/sites"
                      ? "bg-secondary text-foreground"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  <div className="size-8 bg-orange-500 flex items-center justify-center">
                    <Globe className="size-4 text-white" />
                  </div>
                  <span
                    className={cn(
                      "text-base",
                      pathname === "/sites"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Sites Management
                  </span>
                </Link>
                <Link
                  href="/pricing"
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/pricing"
                      ? "bg-secondary text-foreground"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  <div className="size-8 bg-yellow-500 flex items-center justify-center">
                    <DollarSign className="size-4 text-white" />
                  </div>
                  <span
                    className={cn(
                      "text-base",
                      pathname === "/pricing"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Pricing Management
                  </span>
                </Link>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                <div className="size-3 bg-primary rounded-full"></div>
                <span className="text-sm">ACCOUNT</span>
              </div>
              <div className="space-y-1">
                <Link
                  href="/settings"
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/settings"
                      ? "bg-primary/20 text-foreground"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  <div className="size-8 bg-gray-500 flex items-center justify-center">
                    <Settings className="size-4 text-white" />
                  </div>
                  <span
                    className={cn(
                      "text-base",
                      pathname === "/settings"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Settings
                  </span>
                </Link>
                <button
                  onClick={handleLinkClick}
                  className="cursor-pointer flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted w-full text-left"
                >
                  <div className="size-8 bg-pink-500 flex items-center justify-center">
                    <LogOut className="size-4 text-white" />
                  </div>
                  <span className="text-base text-muted-foreground">
                    Sign Out
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

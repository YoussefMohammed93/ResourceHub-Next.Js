"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/i18n-provider";
import { ChevronDown, LogOut, User2, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserDropdown() {
  const { isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.account) return "U";
    const firstName = user.account.firstName || "";
    const lastName = user.account.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get user full name
  const getUserFullName = () => {
    if (!user?.account) return "User";
    return `${user.account.firstName} ${user.account.lastName}`.trim();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex items-center gap-1 sm:gap-2 cursor-pointer hover:bg-muted/75 rounded-lg px-2 py-1 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
            <AvatarImage
              src={
                user?.account?.picture || "/placeholder.svg?height=32&width=32"
              }
              alt="avatar"
            />
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs sm:text-sm">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:block text-sm text-muted-foreground">
            {getUserFullName()}
          </span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground transition-transform duration-200" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium text-foreground">
            {getUserFullName()}
          </p>
          <p className="text-xs text-muted-foreground">
            {user?.account?.email || "user@example.com"}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            href="/profile"
            className={`flex items-center gap-2 cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <User2 className="w-4 h-4 text-foreground" />
            <span>Profile</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`text-destructive focus:text-destructive cursor-pointer flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <Loader2 className="w-5 h-5 text-destructive animate-spin" />
          ) : (
            <LogOut className="w-4 h-4 text-destructive" />
          )}
          <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

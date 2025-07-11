"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/components/i18n-provider";
import { ChevronDown, LogOut, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserDropdown() {
  const { isRTL } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex items-center gap-2 cursor-pointer hover:bg-muted/75 rounded-lg px-2 py-1 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="avatar"
            />
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs sm:text-sm">
              YM
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:block text-sm text-muted-foreground">
            Youssef Mohammed
          </span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground transition-transform duration-200" />
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
        >
          <LogOut className="w-4 h-4 text-destructive" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

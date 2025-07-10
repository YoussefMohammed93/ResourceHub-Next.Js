"use client";

import {
  DropdownMenu,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/components/i18n-provider";
import { ThemeToggleMenuItem } from "@/components/mode-toggle";
import { ChevronDown, LogOut, Globe, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserDropdown() {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-muted/75 rounded-lg px-2 py-1 transition-colors">
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
          <a href="/profile" className="flex items-center cursor-pointer">
            <User2 className="w-4 h-4 text-foreground" />
            Profile
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ThemeToggleMenuItem />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center cursor-pointer">
            <Globe className="w-4 h-4 mr-2" />
            Language
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="min-w-[160px]">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center gap-2 mb-1 last:mb-0 cursor-pointer ${
                  language === lang.code ? "bg-secondary" : ""
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="flex-1">{lang.name}</span>
                {language === lang.code && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
          <LogOut className="w-4 h-4 text-destructive" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/i18n-provider";

export function LanguageToggleButton() {
  const [mounted, setMounted] = React.useState(false);
  const { language, changeLanguage, isLoading, isRTL } = useLanguage();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-muted/75 transition-colors"
      >
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isLoading}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-muted/75 transition-all duration-200 relative"
          aria-label="Change language"
        >
          {isLoading ? (
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground transition-transform duration-200 hover:scale-110" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-2 cursor-pointer transition-colors ${
              language === lang.code ? "bg-secondary" : ""
            } ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {language === lang.code && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

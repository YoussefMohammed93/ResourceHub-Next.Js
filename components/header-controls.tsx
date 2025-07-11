"use client";

import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { LanguageToggleButton } from "@/components/language-toggle-button";
import { UserDropdown } from "@/components/user-dropdown";
import { useLanguage } from "@/components/i18n-provider";

export function HeaderControls() {
  const { isRTL } = useLanguage();

  return (
    <div
      className={`flex items-center gap-1 sm:gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
    >
      {/* Theme Toggle Button */}
      <div className="hidden xs:block">
        <ThemeToggleButton />
      </div>

      {/* Language Toggle Button */}
      <div className="hidden xs:block">
        <LanguageToggleButton />
      </div>

      {/* Mobile Controls - Show only on very small screens */}
      <div className="flex items-center gap-1 xs:hidden">
        <ThemeToggleButton />
        <LanguageToggleButton />
      </div>

      {/* User Dropdown */}
      <UserDropdown />
    </div>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Settings, LogOut } from "lucide-react";
import { ThemeToggleMenuItem } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserDropdown() {
  return (
    <div className="flex items-center space-x-4">
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
            <a href="/settings" className="flex items-center cursor-pointer">
              <Settings className="w-4 h-4" />
              Settings
            </a>
          </DropdownMenuItem>
          <ThemeToggleMenuItem />
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
            <LogOut className="w-4 h-4 text-destructive" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

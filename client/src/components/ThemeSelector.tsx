import { useThemeContext, ColorTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSelector() {
  const { colorTheme, setColorTheme } = useThemeContext();

  const themeOptions: { value: ColorTheme; label: string; color: string }[] = [
    { value: "green", label: "Green", color: "bg-emerald-500" },
    { value: "blue", label: "Blue", color: "bg-blue-500" },
    { value: "orange", label: "Orange", color: "bg-orange-500" },
    { value: "yellow", label: "Yellow", color: "bg-yellow-500" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          title="Change color theme"
        >
          <Palette size={16} />
          <span className="sr-only">Change color theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptions.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setColorTheme(theme.value)}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              colorTheme === theme.value && "font-semibold"
            )}
          >
            <div className={cn("h-4 w-4 rounded-full", theme.color)} />
            <span>{theme.label}</span>
            {colorTheme === theme.value && (
              <span className="ml-auto">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
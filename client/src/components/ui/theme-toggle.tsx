import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full border-primary/20 bg-background hover:bg-muted"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon size={20} className="text-primary transition-all" />
      ) : (
        <Sun size={20} className="text-primary transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
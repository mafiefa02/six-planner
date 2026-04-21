import { Moon, Sun } from "lucide-react";
import { useCallback } from "react";

import type { Theme } from "#/components/theme-provider";
import { Button } from "#/components/ui/button";
import { useTheme } from "#/hooks/use-theme";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    const newTheme = (theme === "light" ? "dark" : "light") as Theme;
    setTheme(newTheme);
  }, [theme, setTheme]);

  return (
    <Button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      size="icon"
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
};

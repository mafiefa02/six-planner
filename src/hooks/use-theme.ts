import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { use, useCallback } from "react";

import { ThemeContext, type Theme } from "#/components/theme-provider";
import { setThemeServerFn } from "#/lib/theme.functions";

export const useTheme = () => {
  const themeContext = use(ThemeContext);
  const setThemeFn = useServerFn(setThemeServerFn);
  const router = useRouter();

  const setTheme = useCallback(
    (theme: Theme) => {
      setThemeFn({ data: theme }).then(() => router.invalidate());
    },
    [setThemeFn, router],
  );

  if (!themeContext) throw new Error("useTheme called outside of ThemeProvider!");
  return { theme: themeContext.theme, setTheme };
};

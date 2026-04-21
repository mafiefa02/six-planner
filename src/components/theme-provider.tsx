import { createContext, type PropsWithChildren } from "react";
import { z } from "zod";

export const postThemeValidator = z.union([z.literal("light"), z.literal("dark")]);
export type Theme = z.infer<typeof postThemeValidator>;
export const themeStorageKey = "_six-planner-theme";

// TODO: We should properly type `setTheme` here. Probably need to
// consult to TanStack Start's docs.
type ThemeContextVal = { theme: Theme };
type Props = PropsWithChildren<{ theme: Theme }>;

export const ThemeContext = createContext<ThemeContextVal | null>(null);

export function ThemeProvider({ children, theme }: Props) {
  return <ThemeContext value={{ theme }}>{children}</ThemeContext>;
}

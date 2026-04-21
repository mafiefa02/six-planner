import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";

import { postThemeValidator, themeStorageKey, type Theme } from "#/components/theme-provider";

export const getThemeServerFn = createServerFn().handler(
  async () => (getCookie(themeStorageKey) || "dark") as Theme,
);

export const setThemeServerFn = createServerFn({ method: "POST" })
  .inputValidator(postThemeValidator)
  .handler(async ({ data }) => setCookie(themeStorageKey, data));

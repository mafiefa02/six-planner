import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import { SIDEBAR_COOKIE_NAME } from "#/components/ui/sidebar";

export const getSidebarServerStateFn = createServerFn().handler(
  async () => getCookie(SIDEBAR_COOKIE_NAME)?.toLowerCase() === "true",
);

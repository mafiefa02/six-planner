import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { getCookie } from "@tanstack/react-start/server";

import { RootSidebar } from "#/components/root-sidebar";
import { ThemeProvider } from "#/components/theme-provider";
import { SIDEBAR_COOKIE_NAME, SidebarInset, SidebarProvider } from "#/components/ui/sidebar";
import { TooltipProvider } from "#/components/ui/tooltip";
import { getThemeServerFn } from "#/lib/theme";

import appCss from "../styles.css?url";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { title: "SIX Planner" },
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  loader: async () => {
    const theme = await getThemeServerFn();
    const sidebarState = getCookie(SIDEBAR_COOKIE_NAME) === "true";
    return { theme, sidebarState };
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme, sidebarState } = Route.useLoaderData();
  return (
    <html
      className={theme}
      lang="en"
    >
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <TooltipProvider>
            <SidebarProvider defaultOpen={sidebarState}>
              <RootSidebar />
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{ position: "bottom-right", hideUntilHover: true }}
          plugins={[
            {
              name: "Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: "Query",
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

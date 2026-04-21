import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  type ErrorComponentProps,
  type NotFoundRouteProps,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { RootSidebar } from "#/components/root-sidebar";
import { ThemeProvider } from "#/components/theme-provider";
import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar";
import { TooltipProvider } from "#/components/ui/tooltip";
import { getSidebarServerStateFn } from "#/lib/sidebar.functions";
import { getThemeServerFn } from "#/lib/theme.functions";

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
    const isSidebarOpen = await getSidebarServerStateFn();
    return { theme, isSidebarOpen };
  },
  shellComponent: RootDocument,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme, isSidebarOpen } = Route.useLoaderData();
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
            <SidebarProvider defaultOpen={isSidebarOpen}>
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

function NotFoundComponent(props: NotFoundRouteProps) {
  return <div {...props}>This page is not found!</div>;
}

function ErrorComponent(props: ErrorComponentProps) {
  return <div {...props}>Something went wrong when loading this page!</div>;
}

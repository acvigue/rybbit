"use client";

import { useAppEnv } from "@/hooks/useIsProduction";
import { useStopImpersonation } from "@/hooks/useStopImpersonation";
import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AuthenticationGuard } from "../components/AuthenticationGuard";
import { OrganizationInitializer } from "../components/OrganizationInitializer";
import { Toaster } from "../components/ui/sonner";
import { VersionCheck } from "../components/VersionCheck";
import { TooltipProvider } from "../components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  useStopImpersonation();
  const appEnv = useAppEnv();

  return (
    <NuqsAdapter>
      <ThemeProvider attribute="class" enableSystem={true} disableTransitionOnChange>
        <TooltipProvider>
          <QueryProvider>
            <OrganizationInitializer />
            <AuthenticationGuard />
            {children}
          </QueryProvider>
          <VersionCheck />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
      {appEnv === "prod" && (
        <Script src="https://demo.rybbit.com/api/script.js" data-site-id="21" strategy="afterInteractive" />
      )}
      {appEnv === "demo" && (
        <Script src="https://demo.rybbit.com/api/script.js" data-site-id="22" strategy="afterInteractive" />
      )}
    </NuqsAdapter>
  );
}

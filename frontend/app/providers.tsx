"use client";

import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import assert from "assert";
import { useState } from "react";

assert(
  process.env.GOOGLE_CLIENT_ID,
  "env variable not set or made publically available: GOOGLE_CLIENT_ID",
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ""}>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NextUIProvider>
    </GoogleOAuthProvider>
  );
}

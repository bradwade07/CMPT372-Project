"use client";

import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

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
			})
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

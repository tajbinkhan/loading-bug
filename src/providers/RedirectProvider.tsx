"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface RedirectContextType {
	redirectUrl: string | null;
	getRedirectUrl: (baseUrl: string) => string;
}

export const RedirectContext = createContext<RedirectContextType | undefined>(undefined);

export function RedirectProvider({ children }: { children: React.ReactNode }) {
	const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
	const searchParams = useSearchParams();

	// Capture redirect when it exists in URL
	useEffect(() => {
		const redirectParam = searchParams.get("redirect");
		if (redirectParam) {
			setRedirectUrl(redirectParam);
		}
	}, [searchParams]);

	// Helper function to append redirect to any auth-related URL
	const getRedirectUrl = (baseUrl: string): string => {
		if (!redirectUrl) return baseUrl;

		// Check if baseUrl already has query parameters
		const hasQueryParams = baseUrl.includes("?");
		const separator = hasQueryParams ? "&" : "?";
		return `${baseUrl}${separator}redirect=${encodeURIComponent(redirectUrl)}`;
	};

	return (
		<RedirectContext.Provider value={{ redirectUrl, getRedirectUrl }}>
			{children}
		</RedirectContext.Provider>
	);
}

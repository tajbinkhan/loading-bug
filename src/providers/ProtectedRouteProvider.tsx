"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import useSession from "@/hooks/use-session";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes/middleware-routes";

export default function ProtectedRouteProvider({ children }: Readonly<GlobalLayoutProps>) {
	const { user } = useSession();
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirect = searchParams.get("redirect") || DEFAULT_LOGIN_REDIRECT;

	useEffect(() => {
		if (user) {
			router.push(redirect);
		}
	}, [user, router, redirect]);

	if (!user) {
		return children;
	}

	return null;
}

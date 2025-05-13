"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import Loader from "@/components/ui/loader";

import useSession from "@/hooks/use-session";
import { route } from "@/routes/routes";

interface OnboardingJsonData {
	isAccreditedInvestor: "yes" | "no";
	identityVerified: boolean;
	incomeBasedAccreditation: {
		earnedThreshold: "yes" | "no";
		expectThreshold: "yes" | "no";
	};
	netWorthBasedAccreditation: "yes" | "no";
	professionalCertification: {
		series7: "yes" | "no";
		series65: "yes" | "no";
		series82: "yes" | "no";
		noneOfTheAbove: "yes" | "no";
	};
	entityBasedAccreditation: {
		assets5Million: "yes" | "no";
		allOwnersAccredited: "yes" | "no";
	};
	acknowledgement: boolean;
	documentsUploaded: boolean;
	bankVerified: boolean;
}

interface PrivateContextType {
	id: number;
	userId: number;
	complete: boolean;
	accreditationStatus: boolean;
	onboardingJsonData: OnboardingJsonData;
	currentStep: number;
	createdAt: string; // ISO Date string
	updatedAt: string; // ISO Date string
}

export default function PrivateProvider({ children }: Readonly<GlobalLayoutProps>) {
	const { user } = useSession();
	const pathname = usePathname();
	const router = useRouter();

	const currentUrl = process.env.NEXT_PUBLIC_FRONTEND_URL + pathname;

	const redirect = encodeURIComponent(currentUrl);

	useEffect(() => {
		if (!user) {
			router.push(`${route.protected.login}?redirect=${redirect}`);
		}
	}, [redirect, router, user]);

	if (!user) return <Loader />;

	return children;
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	display: "swap",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: {
		default: "Dashboard - Homevest",
		template: "%s - Homevest"
	},
	description: "Homevest"
};

export default function RootLayout({ children }: Readonly<GlobalLayoutProps>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn(poppins.className, "antialiased")} suppressHydrationWarning>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}

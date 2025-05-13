import Link from "next/link";

import { cn } from "@/lib/utils";

import BrandLogo from "@/components/helpers/brand-logo";

import { route } from "@/routes/routes";

export function FormHeading({ className, title }: { className?: string; title?: string }) {
	return (
		<div className={cn(className || "text-center sm:mx-auto sm:w-full sm:max-w-md")}>
			<Link href={route.private.home}>
				<BrandLogo className={`mx-auto`} />
			</Link>

			<h2 className="mt-6 text-2xl leading-9 font-bold tracking-tight">{title || "Untitled"}</h2>
		</div>
	);
}

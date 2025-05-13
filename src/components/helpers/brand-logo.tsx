import Image from "next/image";

import { cn } from "@/lib/utils";

import { siteTitle } from "@/core/constants";

interface BrandLogoInterface {
	className?: string;
	brandName?: string;
	width?: number;
	height?: number;
}

export default function BrandLogo({ className, width = 150, height = 150 }: BrandLogoInterface) {
	return (
		<Image
			src="/images/logo.webp"
			alt={siteTitle}
			width={width}
			height={height}
			className={cn(className)}
			priority
			style={{ width: "auto", height: "auto" }}
		/>
	);
}

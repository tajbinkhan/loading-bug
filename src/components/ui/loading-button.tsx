import type { VariantProps } from "class-variance-authority";
import { LucideLoader2 } from "lucide-react";
import React from "react";

import { Button, buttonVariants } from "@/components/ui/button";

interface LoadingButtonProps
	extends React.ComponentProps<"button">,
		VariantProps<typeof buttonVariants> {
	isLoading: boolean;
	loadingText: string;
	children: React.ReactNode;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
	asChild?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
	isLoading,
	children,
	loadingText,
	disabled = isLoading,
	className,
	onClick,
	...props
}) => {
	return (
		<Button type="submit" onClick={onClick} className={className} disabled={disabled} {...props}>
			{isLoading ? (
				<>
					<LucideLoader2 className="size-4 animate-spin" aria-hidden="true" />
					{loadingText}
				</>
			) : (
				children
			)}
		</Button>
	);
};

export { LoadingButton };

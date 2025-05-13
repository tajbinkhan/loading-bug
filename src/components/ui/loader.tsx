import { Loader2 } from "lucide-react";

interface LoaderProps {
	/**
	 * Optional height for the loader component.
	 * If not provided, defaults to 48rem.
	 */
	height?: number;
	text?: string;
}

export default function Loader({ height, text = "Loading..." }: LoaderProps) {
	return (
		<div
			className="flex h-96 w-full items-center justify-center gap-2"
			style={{
				height: height ? `${height}rem` : "48rem"
			}}
		>
			<Loader2 className="animate-spin" />
			<span>{text}</span>
		</div>
	);
}

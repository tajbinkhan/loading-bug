"use client";

import { MDXEditor, MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { ALL_PLUGINS } from "@/components/ui/mdx-plugins";

// Extend the MDXEditorProps to include our custom error prop
interface ExtendedMDXEditorProps extends MDXEditorProps {
	hasError?: boolean;
}

export const MdxEditor = forwardRef<MDXEditorMethods, ExtendedMDXEditorProps>((props, ref) => {
	const { hasError, ...restProps } = props;

	return (
		<MDXEditor
			className={cn(
				"bg-background rounded-md border px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none",
				hasError
					? "border-destructive focus-within:ring-destructive/20 dark:focus-within:ring-destructive/40 focus-within:ring-[3px]"
					: "border-input focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
				props.className
			)}
			contentEditableClassName="prose h-[250px] overflow-y-auto"
			aria-invalid={hasError ? "true" : undefined}
			{...restProps}
			ref={ref}
			plugins={ALL_PLUGINS}
		/>
	);
});

MdxEditor.displayName = "MdxEditor";

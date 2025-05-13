"use client";

import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import React from "react";

// Extend the MDXEditorProps to include our custom error prop
interface ExtendedMDXEditorProps extends MDXEditorProps {
	hasError?: boolean;
}

const MdxEditor = dynamic(() => import("@/components/ui/mdx-editor").then(mod => mod.MdxEditor), {
	ssr: false
});

export const MdxEditorWrapper = dynamic(
	() => {
		const ForwardedEditor = React.forwardRef<MDXEditorMethods, ExtendedMDXEditorProps>(
			(props, ref) => <MdxEditor {...props} ref={ref} />
		);
		ForwardedEditor.displayName = "ForwardedMdxEditor";
		return Promise.resolve(ForwardedEditor);
	},
	{ ssr: false }
);

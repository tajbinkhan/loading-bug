import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	CodeToggle,
	CreateLink,
	DiffSourceToggleWrapper,
	InsertCodeBlock,
	InsertFrontmatter,
	InsertImage,
	InsertTable,
	InsertThematicBreak,
	ListsToggle,
	Separator,
	UndoRedo,
	codeBlockPlugin,
	codeMirrorPlugin,
	diffSourcePlugin,
	frontmatterPlugin,
	headingsPlugin,
	imagePlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	markdownShortcutPlugin,
	quotePlugin,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin
} from "@mdxeditor/editor";
import { toast } from "sonner";

import axiosApi from "@/lib/axios-config";

import { apiRoute } from "@/routes/routes";

async function imageUploaderHandler(image: File) {
	const formData = new FormData();
	formData.append("file", image);

	try {
		const responsePromise = axiosApi.post(apiRoute.media, formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});

		toast.promise(responsePromise, {
			loading: "Uploading image...",
			success: "Image uploaded successfully",
			error: "Failed to upload image"
		});

		const awaitResponse = await responsePromise;

		return Promise.resolve(awaitResponse.data.data.secureUrl);
	} catch (error) {
		return Promise.reject(error);
	}
}

export const ALL_PLUGINS = [
	toolbarPlugin({
		toolbarContents: () => (
			<>
				{/* <KitchenSinkToolbar /> */}
				<DiffSourceToggleWrapper>
					<UndoRedo />
					<Separator />
					<BoldItalicUnderlineToggles />
					<CodeToggle />
					<Separator />
					<ListsToggle />
					<Separator />
					<BlockTypeSelect />
					<Separator />
					<CreateLink />
					<InsertImage />
					<Separator />
					<InsertTable />
					<InsertThematicBreak />
					<Separator />
					<InsertCodeBlock />
					<InsertFrontmatter />
				</DiffSourceToggleWrapper>
			</>
		)
	}),
	listsPlugin(),
	quotePlugin(),
	headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
	linkPlugin(),
	linkDialogPlugin(),
	imagePlugin({
		imageUploadHandler: (image: File) => imageUploaderHandler(image)
	}),
	tablePlugin(),
	thematicBreakPlugin(),
	frontmatterPlugin(),
	codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
	codeMirrorPlugin({
		codeBlockLanguages: {
			js: "JavaScript",
			css: "CSS",
			txt: "Plain Text",
			tsx: "TypeScript",
			"": "Unspecified"
		}
	}),
	diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
	markdownShortcutPlugin()
];

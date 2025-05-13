import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";

interface DataTableDeleteSelectedProps {
	selectedIds: number[];
	isDeleting: boolean;
	handleDeleteSelected: () => void;
	showDeleteAll?: boolean;
}

export default function DataTableDeleteSelected({
	selectedIds,
	isDeleting,
	handleDeleteSelected,
	showDeleteAll = false
}: DataTableDeleteSelectedProps) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!isDeleting) setIsOpen(false);
	}, [isDeleting]);

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				{selectedIds.length > 0 ? (
					<Button size="sm" className="hidden h-8 lg:flex" variant="destructive">
						<Trash className="size-4" aria-hidden="true" />
						Delete ({selectedIds.length})
					</Button>
				) : (
					showDeleteAll && (
						<Button size="sm" className="hidden h-8 lg:flex" variant="destructive">
							<Trash className="size-4" aria-hidden="true" />
							Delete All
						</Button>
					)
				)}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
					<LoadingButton
						variant="destructive"
						isLoading={isDeleting}
						onClick={handleDeleteSelected}
						loadingText="Deleting..."
					>
						{selectedIds.length > 0 ? (
							<>
								<Trash className="size-4" aria-hidden="true" />
								Delete ({selectedIds.length})
							</>
						) : (
							<>
								<Trash className="size-4" aria-hidden="true" />
								Delete All
							</>
						)}
					</LoadingButton>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

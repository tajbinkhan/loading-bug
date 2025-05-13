import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	pagination: Pagination;
	handleOptionFilter: (key: string, value?: string | string[] | null) => void;
}

export function DataTablePagination<TData>({
	table,
	pagination,
	handleOptionFilter
}: DataTablePaginationProps<TData>) {
	const rowsPerPageOptions = [10, 20, 30, 40, 50];

	useEffect(() => {
		table.setPageSize(pagination.limit);
	}, [pagination.limit, table]);

	return (
		<div className="flex items-center justify-between px-2">
			<div className="flex-1 text-sm text-muted-foreground">
				{table.getFilteredSelectedRowModel().rows.length} of{" "}
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Rows per page</p>
					<Select
						value={`${pagination.limit}`}
						onValueChange={value => {
							handleOptionFilter("limit", value);
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={pagination.limit} />
						</SelectTrigger>
						<SelectContent side="top">
							{rowsPerPageOptions.map(pageSize => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {pagination.currentPage} of {pagination.totalPages}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => handleOptionFilter("page", "1")}
						disabled={pagination.currentPage === 1}
					>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeft />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={
							pagination.currentPage > 1
								? () => handleOptionFilter("page", `${pagination.currentPage - 1}`)
								: undefined
						}
						disabled={pagination.currentPage === 1}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={
							pagination.currentPage < pagination.totalPages
								? () => handleOptionFilter("page", `${pagination.currentPage + 1}`)
								: undefined
						}
						disabled={
							pagination.currentPage === pagination.totalPages || pagination.totalPages === 0
						}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRight />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={
							pagination.currentPage < pagination.totalPages
								? () => handleOptionFilter("page", `${pagination.totalPages}`)
								: undefined
						}
						disabled={
							pagination.currentPage === pagination.totalPages || pagination.totalPages === 0
						}
					>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</div>
	);
}

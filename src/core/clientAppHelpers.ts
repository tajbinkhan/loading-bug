export default class ClientAppHelpers {
	/**
	 * Formats a file size in bytes to a human-readable string.
	 * @param bytes - The file size in bytes.
	 * @returns The formatted file size string.
	 */
	static formatFileSize(bytes: number): string {
		if (bytes === 0) return "0 Bytes";

		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	}

	/**
	 * Formats a date string to a human-readable format.
	 * @param dateString - The date string to format.
	 * @returns The formatted date string.
	 */
	static formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric"
		});
	}
}

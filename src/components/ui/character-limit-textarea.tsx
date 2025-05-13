import * as React from "react";

import { cn } from "@/lib/utils";

// Define the props, extending TextareaHTMLAttributes and adding maxLength for characters
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	maxLength: number;
}

const CharacterLimitTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, maxLength, value = "", onChange, ...props }, ref) => {
		const [charCount, setCharCount] = React.useState<number>(0);

		// Update character count based on value prop
		React.useEffect(() => {
			const stringValue = String(value); // Convert to string
			setCharCount(Math.min(stringValue.length, maxLength)); // Limit initial count to maxLength
		}, [value, maxLength]);

		// Handle character limit
		const handleCharacterLimit = (inputValue: string): string => {
			const trimmedValue = inputValue.slice(0, maxLength); // Trim the value if it exceeds maxLength
			setCharCount(trimmedValue.length); // Update character count
			return trimmedValue;
		};

		// Handle the change event
		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const limitedText = handleCharacterLimit(e.target.value);

			// Call the onChange with the new value if it's provided
			if (onChange) {
				onChange({
					...e,
					target: {
						...e.target,
						value: limitedText // Only override the value in the event
					}
				} as React.ChangeEvent<HTMLTextAreaElement>);
			}
		};

		// When the user pastes text, ensure the input is limited to the max length
		const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
			const pasteData = e.clipboardData.getData("text");

			// Prevent default paste behavior to manage our own limit
			e.preventDefault();
			const limitedText = handleCharacterLimit(pasteData); // Limit the pasted text

			// Call the onChange with the new value
			if (onChange) {
				onChange({
					...e,
					target: {
						...e.currentTarget,
						value: limitedText // Use the limited text
					}
				} as React.ChangeEvent<HTMLTextAreaElement>);
			}
		};

		return (
			<div>
				<textarea
					className={cn(
						"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					value={value} // Controlled value
					onChange={handleChange}
					onPaste={handlePaste} // Handle the paste event
					{...props} // Spread any other props (placeholder, etc.)
				/>
				<p className="mt-1 text-sm text-muted-foreground">
					Character count: {charCount}/{maxLength}
				</p>
			</div>
		);
	}
);

CharacterLimitTextarea.displayName = "CharacterLimitTextarea";

export { CharacterLimitTextarea };

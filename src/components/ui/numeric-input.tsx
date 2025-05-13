import { Input } from "@/components/ui/input";
import React, { forwardRef } from "react";

type InputOmitValue = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

interface NumericInputOptions extends InputOmitValue {
	numberType?: "integer" | "decimal";
	numberSign?: "positive" | "negative" | "both";
}

const NumericInput = forwardRef<HTMLInputElement, NumericInputOptions>(
	(
		{
			numberType = "integer",
			numberSign = "both",
			...props
		}: NumericInputOptions,
		ref
	) => {
		const sanitizeInput = (
			event: any,
			type: "integer" | "decimal",
			sign: "positive" | "negative" | "both"
		) => {
			const inputElement = event.target as HTMLInputElement;
			let value = inputElement.value;

			if (type === "integer" && sign === "positive") {
				value = value.replace(/[^0-9]/g, "");
			} else if (type === "integer" && sign === "negative") {
				value = value.replace(/^(-?)(-*)([0-9]*)(.*)/, "$1$3");
			} else if (type === "integer" && sign === "both") {
				value = value.replace(/^(-?)(-*)([0-9]*)(.*)/, "$1$3");
			} else if (type === "decimal" && sign === "positive") {
				value = value.replace(/[^0-9.]/g, "").replace(/(\..*?)\./g, "$1");
			} else if (type === "decimal" && sign === "negative") {
				value = value
					.replace(/^(-?)(-*)([0-9.]*)(.*)/, "$1$3")
					.replace(/(\..*?)\./g, "$1");
			} else if (type === "decimal" && sign === "both") {
				value = value
					.replace(/^(-?)(-*)([0-9.]*)(.*)/, "$1$3")
					.replace(/(\..*?)\./g, "$1");
			} else {
				return;
			}

			inputElement.value = value;
		};

		return (
			<Input
				type="text"
				onInput={(e) => sanitizeInput(e, numberType, numberSign)}
				{...props}
				autoComplete="number"
				ref={ref}
			/>
		);
	}
);

NumericInput.displayName = "NumericInput";

export default NumericInput;

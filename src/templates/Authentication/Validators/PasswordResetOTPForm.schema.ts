import { z } from "zod";

import { zodMessages } from "@/core/messages";
import { validateEmail, validateNumber } from "@/validators/commonRules";

export const PasswordResetOTPFormSchema = z.object({
	email: validateEmail,
	otp: z
		.string({
			required_error: zodMessages.error.required.fieldIsRequired("OTP"),
			invalid_type_error: zodMessages.error.invalid.invalidNumber("OTP")
		})
		.min(1, zodMessages.error.required.fieldIsRequired("OTP"))
		.refine(value => {
			return !isNaN(Number(value));
		}, zodMessages.error.invalid.invalidNumber("OTP"))
});

export const PasswordResetOTPServerFormSchema = PasswordResetOTPFormSchema.omit({
	otp: true
}).extend({
	otp: validateNumber("OTP")
});

export type PasswordResetOTPFormSchemaType = z.infer<typeof PasswordResetOTPFormSchema>;

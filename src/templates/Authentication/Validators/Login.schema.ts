import { z } from "zod";

import { validateEmail, validateString } from "@/validators/commonRules";

export const LoginSchema = z.object({
	email: validateEmail,
	password: validateString("Password")
});

export const LoginOTPSchema = z.object({
	email: validateEmail,
	password: validateString("Password"),
	otp: validateString("Password").min(4, "OTP must be 4 digits").max(4, "OTP must be 4 digits")
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type LoginOTPSchemaType = z.infer<typeof LoginOTPSchema>;

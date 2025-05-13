import { z } from "zod";

import { validateConfirmPassword, validateEmail, validatePassword } from "@/validators/commonRules";

export const PasswordResetUpdateFormSchema = z.object({
	email: validateEmail,
	password: validatePassword,
	confirmPassword: validateConfirmPassword
});

export type PasswordResetUpdateFormSchemaType = z.infer<typeof PasswordResetUpdateFormSchema>;

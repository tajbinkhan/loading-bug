import { z } from "zod";

import { validateEmail } from "@/validators/commonRules";

export const PasswordResetSchema = z.object({
	email: validateEmail
});

export type PasswordResetSchemaType = z.infer<typeof PasswordResetSchema>;

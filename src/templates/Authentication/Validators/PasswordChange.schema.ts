import { z } from "zod";

import {
	validateConfirmPassword,
	validateNewPassword,
	validatePassword
} from "@/validators/commonRules";

export const PasswordChangeSchema = z.object({
	old_password: validatePassword,
	new_password: validateNewPassword,
	confirm_password: validateConfirmPassword
});

export type PasswordChangeSchemaType = z.infer<typeof PasswordChangeSchema>;

import { z } from "zod";

import { validateString } from "@/validators/commonRules";

export const envSchema = z.object({
	NEXT_PUBLIC_FRONTEND_URL: validateString("NEXT_PUBLIC_FRONTEND_URL"),
	NEXT_PUBLIC_BACKEND_API_URL: validateString("NEXT_PUBLIC_BACKEND_API_URL")
});

const Env = envSchema.safeParse(process.env);

if (!Env.success) {
	const errorMessages = Env.error.errors.map(e => e.message).join("\n");
	console.error(`Environment validation failed:\n${errorMessages}`);
	process.exit(1);
}

export type EnvType = z.infer<typeof envSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvType {}
	}
}

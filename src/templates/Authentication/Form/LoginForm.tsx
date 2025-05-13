"use client";

import Link from "next/link";
import { UseFormReturn } from "react-hook-form";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import PasswordVisibilityToggle from "@/components/ui/password-visibility-toggle";

import useRedirect from "@/hooks/use-redirect";
import { route } from "@/routes/routes";
import { LoginSchemaType } from "@/templates/Authentication/Validators/Login.schema";

interface LoginFormProps {
	form: UseFormReturn<LoginSchemaType>;
	isFormSubmitting: boolean;
	onSubmit: (data: LoginSchemaType) => void;
}

export default function LoginForm({ form, isFormSubmitting, onSubmit }: LoginFormProps) {
	const { getRedirectUrl } = useRedirect();

	// Use the context helper to generate URLs with preserved redirect
	const passwordResetUrl = getRedirectUrl(route.protected.passwordReset);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
				<div className="grid gap-6">
					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="email">Email</FormLabel>
									<FormControl>
										<Input
											id="email"
											type="email"
											placeholder="m@example.com"
											{...field}
											disabled={isFormSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center justify-between">
										<FormLabel htmlFor="password">Password</FormLabel>
										<Link
											href={passwordResetUrl}
											className="ml-auto text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</Link>
									</div>
									<FormControl>
										<PasswordVisibilityToggle
											id="password"
											placeholder="*********"
											autoComplete="off"
											{...field}
											disabled={isFormSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<LoadingButton
						loadingText="Please wait..."
						className="w-full"
						isLoading={isFormSubmitting}
					>
						Login
					</LoadingButton>
				</div>
			</form>
		</Form>
	);
}

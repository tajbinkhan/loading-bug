import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import axiosApi from "@/lib/axios-config";

import { FormHeading } from "@/components/helpers/form-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import PasswordVisibilityToggle from "@/components/ui/password-visibility-toggle";

import { apiRoute, route } from "@/routes/routes";
import { CurrentStatusType } from "@/templates/Authentication/PasswordResetTemplateView";
import {
	PasswordResetUpdateFormSchema,
	PasswordResetUpdateFormSchemaType
} from "@/templates/Authentication/Validators/PasswordResetUpdateForm.schema";

export default function PasswordResetForm({
	email,
	setCurrentStatus
}: {
	email: string;
	setCurrentStatus: React.Dispatch<React.SetStateAction<CurrentStatusType>>;
}) {
	const form = useForm<PasswordResetUpdateFormSchemaType>({
		resolver: zodResolver(PasswordResetUpdateFormSchema),
		defaultValues: {
			email: email,
			password: "",
			confirmPassword: ""
		}
	});

	const isFormSubmitting = form.formState.isSubmitting;

	const router = useRouter();

	const redirectUrl = useSearchParams()!.get("redirect");
	const loginUrl = redirectUrl
		? `${route.protected.login}?redirect=${encodeURIComponent(redirectUrl)}`
		: route.protected.login;

	const onSubmit = async (data: PasswordResetUpdateFormSchemaType) => {
		await axiosApi
			.post(apiRoute.resetPassword, data)
			.then(() => {
				toast.success("Password updated successfully");
				setCurrentStatus({
					initialized: true,
					emailSendCompleted: true,
					otpVerifyCompleted: true
				});
				router.push(loginUrl);
			})
			.catch(error => {
				toast.error(error.response.data.message);
			});
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-5">
			<FormHeading title={"Dashboard Portal"} />
			<Card className="mx-auto w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Update Admin Password</CardTitle>
					<CardDescription>Please update the password for your admin account.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="password">Password</FormLabel>
										<FormControl>
											<PasswordVisibilityToggle
												id="password"
												placeholder="********"
												{...field}
												disabled={isFormSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
										<FormControl>
											<PasswordVisibilityToggle
												id="confirmPassword"
												placeholder="********"
												{...field}
												disabled={isFormSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<LoadingButton
								isLoading={isFormSubmitting}
								loadingText="Updating password..."
								className="w-full"
							>
								Update Password
							</LoadingButton>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

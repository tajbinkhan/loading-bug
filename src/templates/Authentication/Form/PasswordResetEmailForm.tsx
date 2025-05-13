"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";

import axiosApi from "@/lib/axios-config";

import { Button } from "@/components/ui/button";
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

import { apiRoute, route } from "@/routes/routes";
import { CurrentStatusType } from "@/templates/Authentication/PasswordResetTemplateView";
import {
	PasswordResetSchema,
	PasswordResetSchemaType
} from "@/templates/Authentication/Validators/PasswordReset.schema";

export default function PasswordResetEmailForm({
	setEmail,
	setCurrentStatus
}: {
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	setCurrentStatus: React.Dispatch<React.SetStateAction<CurrentStatusType>>;
}) {
	const form = useForm<PasswordResetSchemaType>({
		resolver: zodResolver(PasswordResetSchema),
		defaultValues: {
			email: ""
		}
	});

	const isFormSubmitting = form.formState.isSubmitting;

	const redirectUrl = useSearchParams()!.get("redirect");
	const loginUrl = redirectUrl
		? `${route.protected.login}?redirect=${encodeURIComponent(redirectUrl)}`
		: route.protected.login;

	const onSubmit = async (data: PasswordResetSchemaType) => {
		await axiosApi
			.post(apiRoute.resetPassword, data)
			.then(() => {
				toast.success("Password reset email sent successfully");
				setEmail(data.email);
				setCurrentStatus({
					initialized: true,
					emailSendCompleted: true,
					otpVerifyCompleted: false
				});
			})
			.catch(err => {
				toast.error(err.response.data.message);
			});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
				<div className="grid gap-2">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="email">Email Address</FormLabel>
								<FormControl>
									<Input
										id="email"
										placeholder="example@example.com"
										{...field}
										disabled={isFormSubmitting}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<LoadingButton loadingText="Please wait..." className="w-full" isLoading={isFormSubmitting}>
					Send Reset Email
				</LoadingButton>
				<Button variant={"outline"} asChild>
					<Link href={loginUrl}>
						<FaArrowLeft className="mr-2" /> Back To Login
					</Link>
				</Button>
			</form>
		</Form>
	);
}

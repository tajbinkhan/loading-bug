import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import axiosApi from "@/lib/axios-config";

import { FormHeading } from "@/components/helpers/form-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { LoadingButton } from "@/components/ui/loading-button";

import { apiRoute } from "@/routes/routes";
import { CurrentStatusType } from "@/templates/Authentication/PasswordResetTemplateView";
import {
	PasswordResetOTPFormSchema,
	PasswordResetOTPFormSchemaType
} from "@/templates/Authentication/Validators/PasswordResetOTPForm.schema";

export default function PasswordResetOTPFormView({
	email,
	setCurrentStatus
}: {
	email: string;
	setCurrentStatus: React.Dispatch<React.SetStateAction<CurrentStatusType>>;
}) {
	const form = useForm<PasswordResetOTPFormSchemaType>({
		resolver: zodResolver(PasswordResetOTPFormSchema),
		defaultValues: {
			email: email,
			otp: ""
		}
	});

	const isFormSubmitting = form.formState.isSubmitting;

	const onSubmit = async (data: PasswordResetOTPFormSchemaType) => {
		const modifiedData = {
			...data,
			otp: Number(data.otp)
		};

		await axiosApi
			.post(apiRoute.resetPasswordConfirm, modifiedData)
			.then(() => {
				toast.success("OTP verified successfully");
				setCurrentStatus({
					initialized: true,
					emailSendCompleted: true,
					otpVerifyCompleted: true
				});
			})
			.catch(err => {
				toast.error(err.response.data.message);
			});
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-5">
			<FormHeading title={"OTP Verification"} />
			<Card className="mx-auto w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-center text-2xl">Verify OTP</CardTitle>
					<CardDescription className="text-center">
						Please enter the OTP sent to your email address. If you did not receive the OTP, please
						check your spam folder.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="otp"
								render={({ field }) => (
									<FormItem className="flex flex-col items-center gap-3">
										<FormLabel>One-Time Password</FormLabel>
										<FormControl>
											<InputOTP maxLength={4} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormDescription className="text-center">
											Please enter the one-time password sent to your email.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<LoadingButton
								isLoading={isFormSubmitting}
								loadingText="Verifying OTP..."
								className="w-full"
							>
								Verify OTP
							</LoadingButton>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

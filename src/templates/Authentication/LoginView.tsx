import { useState } from "react";

import { FormHeading } from "@/components/helpers/form-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import LoginForm from "@/templates/Authentication/Form/LoginForm";
import LoginOTPForm from "@/templates/Authentication/Form/LoginOTPForm";
import useLoginForm from "@/templates/Authentication/Hooks/useLoginForm";

export default function LoginView({
	setLoginSuccess
}: {
	setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [otpRequested, setOtpRequested] = useState<boolean>(false);
	const { form, isFormSubmitting, onSubmit } = useLoginForm(setOtpRequested);

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-5">
			<FormHeading title={"Dashboard Portal"} />
			{!otpRequested ? (
				<Card className="mx-auto w-full max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>Enter your email below to login to your account</CardDescription>
					</CardHeader>
					<CardContent>
						<LoginForm form={form} isFormSubmitting={isFormSubmitting} onSubmit={onSubmit} />
					</CardContent>
				</Card>
			) : (
				<Card className="mx-auto w-full max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl">Login with OTP</CardTitle>
						<CardDescription>
							Enter the OTP sent to your email to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<LoginOTPForm
							email={form.getValues("email")}
							password={form.getValues("password")}
							setLoginSuccess={setLoginSuccess}
						/>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

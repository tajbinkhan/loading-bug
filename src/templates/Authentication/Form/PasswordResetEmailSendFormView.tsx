import { FormHeading } from "@/components/helpers/form-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import PasswordResetEmailForm from "@/templates/Authentication/Form/PasswordResetEmailForm";
import { CurrentStatusType } from "@/templates/Authentication/PasswordResetTemplateView";

export default function PasswordResetEmailSendFormView({
	setEmail,
	setCurrentStatus
}: {
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	setCurrentStatus: React.Dispatch<React.SetStateAction<CurrentStatusType>>;
}) {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-5">
			<FormHeading title={"Dashboard Portal"} />
			<Card className="mx-auto w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Reset your password</CardTitle>
					<CardDescription>Enter your email below to reset your password</CardDescription>
				</CardHeader>
				<CardContent>
					<PasswordResetEmailForm setEmail={setEmail} setCurrentStatus={setCurrentStatus} />
				</CardContent>
			</Card>
		</div>
	);
}

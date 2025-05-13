"use client";

import { useState } from "react";

import PasswordResetEmailSendFormView from "@/templates/Authentication/Form/PasswordResetEmailSendFormView";
import PasswordResetForm from "@/templates/Authentication/Form/PasswordResetForm";
import PasswordResetOTPFormView from "@/templates/Authentication/Form/PasswordResetOTPFormView";

const status = {
	initialized: true,
	emailSendCompleted: false,
	otpVerifyCompleted: false
};

export type CurrentStatusType = typeof status;

export default function PasswordResetTemplateView() {
	const [currentStatus, setCurrentStatus] = useState(status);
	const [email, setEmail] = useState("");

	return currentStatus.initialized &&
		currentStatus.emailSendCompleted &&
		currentStatus.otpVerifyCompleted ? (
		<PasswordResetForm email={email} setCurrentStatus={setCurrentStatus} />
	) : currentStatus.initialized && currentStatus.emailSendCompleted ? (
		<PasswordResetOTPFormView email={email} setCurrentStatus={setCurrentStatus} />
	) : (
		<PasswordResetEmailSendFormView setEmail={setEmail} setCurrentStatus={setCurrentStatus} />
	);
}

"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import axiosApi from "@/lib/axios-config";

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
import useLoginOTPForm from "@/templates/Authentication/Hooks/useLoginOTPForm";

interface LoginOTPFormProps {
	email: string;
	password: string;
	setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginOTPForm({ email, password, setLoginSuccess }: LoginOTPFormProps) {
	const { form, isFormSubmitting, onSubmit } = useLoginOTPForm(email, password, setLoginSuccess);
	const [resendDisabled, setResendDisabled] = useState<boolean>(true);
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const [isSendingOTP, setIsSendingOTP] = useState<boolean>(false);

	// Function to start or restart the timer
	const startTimer = () => {
		// Clear any existing timer
		if (timerIntervalRef.current) {
			clearInterval(timerIntervalRef.current);
		}

		// Check if there's a stored expiry time in localStorage
		const storedExpiryTime = localStorage.getItem("otpResendExpiry");
		const currentTime = Date.now();

		if (storedExpiryTime) {
			const expiryTime = parseInt(storedExpiryTime, 10);

			if (currentTime < expiryTime) {
				// Timer is still active
				const remainingSeconds = Math.ceil((expiryTime - currentTime) / 1000);
				setTimeLeft(remainingSeconds);
				setResendDisabled(true);
			} else {
				// Timer has expired
				setResendDisabled(false);
				setTimeLeft(0);
				localStorage.removeItem("otpResendExpiry");
				return; // No need to start a timer if expired
			}
		} else {
			// First load - set initial timer
			const expiryTime = currentTime + 120000; // 2 minutes from now
			localStorage.setItem("otpResendExpiry", expiryTime.toString());
			setTimeLeft(120);
			setResendDisabled(true);
		}

		// Set up timer interval
		timerIntervalRef.current = setInterval(() => {
			setTimeLeft(prevTime => {
				if (prevTime <= 1) {
					setResendDisabled(false);
					localStorage.removeItem("otpResendExpiry");
					if (timerIntervalRef.current) {
						clearInterval(timerIntervalRef.current);
					}
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);
	};

	// Function to handle OTP resend
	const handleResendOTP = async () => {
		if (!resendDisabled) {
			try {
				setIsSendingOTP(true);
				const payload = {
					username: email,
					password: password,
					otp: true
				};

				await axiosApi
					.post(apiRoute.checkUser, payload)
					.then(() => {
						toast.success("OTP sent successfully. Please check your email.");

						// Reset the timer
						const expiryTime = Date.now() + 120000; // 2 minutes from now
						localStorage.setItem("otpResendExpiry", expiryTime.toString());
						setResendDisabled(true);
						setTimeLeft(120);

						// Restart the timer
						startTimer();
					})
					.catch(error => {
						toast.error(error.response?.data?.message || "Failed to resend OTP. Please try again.");
					})
					.finally(() => {
						setIsSendingOTP(false);
					});
			} catch (error) {
				toast.error("An error occurred while resending the OTP. Please try again.");
			}
		}
	};

	useEffect(() => {
		// Initialize timer on component mount
		startTimer();

		// Clean up interval on unmount
		return () => {
			if (timerIntervalRef.current) {
				clearInterval(timerIntervalRef.current);
			}
		};
	}, []);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
				<div className="grid gap-6">
					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="otp"
							render={({ field }) => (
								<FormItem className="flex flex-col items-center gap-3">
									<FormLabel>One-Time Password</FormLabel>
									<FormControl>
										<InputOTP maxLength={4} {...field} disabled={isFormSubmitting}>
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
									<div className="mt-1 flex items-center justify-center gap-2">
										<LoadingButton
											loadingText="Please wait..."
											isLoading={isSendingOTP}
											type="button"
											variant="ghost"
											size="sm"
											onClick={handleResendOTP}
											className="text-sm"
										>
											Resend OTP
										</LoadingButton>
										{resendDisabled && timeLeft > 0 && (
											<span className="text-muted-foreground text-sm">
												{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
											</span>
										)}
									</div>
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
						Login with OTP
					</LoadingButton>
				</div>
			</form>
		</Form>
	);
}

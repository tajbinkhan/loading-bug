import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import axiosApi from "@/lib/axios-config";

import { apiRoute } from "@/routes/routes";
import { LoginSchema, LoginSchemaType } from "@/templates/Authentication/Validators/Login.schema";

export default function useLoginForm(
	setOtpRequested: React.Dispatch<React.SetStateAction<boolean>>
) {
	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const isFormSubmitting = form.formState.isSubmitting;

	const onSubmit = async (data: LoginSchemaType) => {
		const payload = {
			username: data.email,
			password: data.password,
			otp: true
		};

		await axiosApi
			.post(apiRoute.checkUser, payload)
			.then(() => {
				toast.success("Please check your email for the OTP.");
				setOtpRequested(true);
			})
			.catch(error => {
				toast.error(error.response.data.message || "Login failed. Please check your credentials.");
			});
	};

	return {
		form,
		isFormSubmitting,
		onSubmit
	};
}

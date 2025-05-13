import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import axiosApi from "@/lib/axios-config";

import useSession from "@/hooks/use-session";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes/middleware-routes";
import { apiRoute } from "@/routes/routes";
import {
	LoginOTPSchema,
	LoginOTPSchemaType
} from "@/templates/Authentication/Validators/Login.schema";

export default function useLoginOTPForm(
	email: string,
	password: string,
	setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>
) {
	const { refresh } = useSession();
	const router = useRouter();

	const form = useForm<LoginOTPSchemaType>({
		resolver: zodResolver(LoginOTPSchema),
		defaultValues: {
			email,
			password,
			otp: ""
		}
	});

	const isFormSubmitting = form.formState.isSubmitting;

	const searchParams = useSearchParams().get("redirect");
	const redirect = searchParams ? searchParams : DEFAULT_LOGIN_REDIRECT;

	const onSubmit = async (data: LoginOTPSchemaType) => {
		const payload = {
			username: data.email,
			password: data.password,
			otp: Number(data.otp)
		};

		await axiosApi
			.post(apiRoute.login, payload)
			.then(() => {
				toast.success("Login successful!");
				setLoginSuccess(true);
				refresh();
				window.location.href = redirect;
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

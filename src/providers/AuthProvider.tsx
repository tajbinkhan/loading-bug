"use client";

import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

import axiosApi from "@/lib/axios-config";

import Loader from "@/components/ui/loader";

import { apiRoute, route } from "@/routes/routes";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	logout: () => void;
	refresh: () => void;
	isAdmin: boolean;
	isInvestor: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: Readonly<GlobalLayoutProps>) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
	const [isRefresh, setIsRefresh] = useState<boolean>(true);

	const fetchUser = async () => {
		await axiosApi
			.get(apiRoute.me)
			.then(response => {
				setUser(response.data.data);
				setIsRefresh(false);
			})
			.catch(() => {
				setUser(null);
				setIsRefresh(false);
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		if (isRefresh) {
			fetchUser();
			setIsRefresh(false);
		}
	}, [isRefresh]);

	const logout = async () => {
		setIsLoggingOut(true);
		await axiosApi
			.post(apiRoute.logout)
			.then(() => {
				setUser(null);
				window.location.href = route.protected.login;
			})
			.catch(error =>
				toast.error(error.response.data.message || "Logout failed. Please try again.")
			)
			.finally(() => setIsLoggingOut(false));
	};

	const refresh = () => {
		setIsRefresh(true);
	};

	const isAdmin = user?.role === "ADMIN";
	const isInvestor = user?.role === "INVESTOR";

	return (
		<AuthContext.Provider
			value={{
				user,
				loading: isLoading,
				logout,
				refresh,
				isAdmin,
				isInvestor
			}}
		>
			{isLoading ? <Loader /> : isLoggingOut ? <Loader text="Logging out..." /> : children}
		</AuthContext.Provider>
	);
}

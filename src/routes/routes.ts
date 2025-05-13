export const route = {
	private: {
		home: "/dashboard"
	},
	protected: {
		login: "/login",
		register: "/register",
		passwordReset: "/password-reset"
	}
};

export const apiRoute = {
	checkUser: "/auth/check-user",
	login: "/auth/login/otp",
	logout: "/auth/logout",
	me: "/auth/me",
	googleLogin: "/auth/login/google",
	register: "/auth/register",
	profile: "/auth/profile",
	verifyUser: "/auth/verify-user",
	resetPassword: "/auth/reset-password",
	resetPasswordConfirm: "/auth/reset-password/confirm",
	changePassword: "/auth/change-password",
	csrfToken: "/csrf-token",
	media: "/media/upload",
	portfolio: "/portfolio",
	portfolioId: (id: number) => `/portfolio/${id}`,
	investorPortfolio: "/payment/portfolios",
	investorTransactions: "/payment/transactions",
	onboarding: "/onboarding"
} as const;

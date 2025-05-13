"use client";

import { useState } from "react";

import LoginSuccessView from "@/templates/Authentication/LoginSuccessView";
import LoginView from "@/templates/Authentication/LoginView";

export default function LoginTemplate() {
	const [loginSuccess, setLoginSuccess] = useState(false);
	return loginSuccess ? <LoginSuccessView /> : <LoginView setLoginSuccess={setLoginSuccess} />;
}

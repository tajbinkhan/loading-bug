import { route } from "@/routes/routes";

const DEFAULT_LOGIN_REDIRECT = route.private.home;

const appRoutePrefix = process.env.NEXT_PUBLIC_FRONTEND_URL;

export { appRoutePrefix, DEFAULT_LOGIN_REDIRECT };

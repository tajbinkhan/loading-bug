import ProtectedRouteProvider from "@/providers/ProtectedRouteProvider";
import { RedirectProvider } from "@/providers/RedirectProvider";

export default function ProtectedLayout({ children }: Readonly<GlobalLayoutProps>) {
	return (
		<RedirectProvider>
			<ProtectedRouteProvider>{children}</ProtectedRouteProvider>
		</RedirectProvider>
	);
}

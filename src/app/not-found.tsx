import PageNotFound from "@/components/helpers/page-not-found";

import AuthProvider from "@/providers/AuthProvider";

export default function NotFound() {
	return (
		<AuthProvider>
			<PageNotFound />
		</AuthProvider>
	);
}

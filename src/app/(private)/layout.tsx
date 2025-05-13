import PrivateProvider from "@/providers/PrivateProvider";

export default function StoreLayout({ children }: Readonly<GlobalLayoutProps>) {
	return <PrivateProvider>{children}</PrivateProvider>;
}

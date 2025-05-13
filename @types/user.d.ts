interface User {
	id: number;
	name: string | null;
	username: string | null;
	email: string | null;
	emailVerified: Date | null;
	image: string | null;
	role: "ADMIN" | "INVESTOR" | "VISITOR";
	createdAt: Date;
	updatedAt: Date;
	walletBalance: number;
	dividend: number;
}

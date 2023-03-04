type JwtType = {
	username: string;
	email: string;
	verifiedEmail: boolean;
	sub: string;
	iat: number;
	exp: number;
};

export { JwtType };

type UserType = {
	_id: string;
	username: string;
	email: string;
	password?: string;
	role: string;
	verifiedEmail: boolean;
};

export default UserType;

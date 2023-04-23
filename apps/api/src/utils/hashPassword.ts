// External dependencies
import bcrypt from 'bcryptjs';

function hashPassword(password: string): string {
	const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	return hashedPassword;
}

function comparePassword(password: string, hashedPassword: string): boolean {
	const isPasswordValid = bcrypt.compareSync(password, hashedPassword);

	return isPasswordValid;
}

export { hashPassword, comparePassword };

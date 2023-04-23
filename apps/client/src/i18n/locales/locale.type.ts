export type TranslationKeys = {
	setupSidebar: {
		footer: string;
	};
	resetPassword: {
		title: string;
		successReset: string;
		errorReset: string;
	};
	login: {
		title: string;
		successLogin: string;
		invalidLogin: string;
		rememberMe: string;
		forgotPassword: string;
		resetPassword: string;
		notRegistered: string;
		login: string;
		password: string;
	};
	register: {
		title: string;
		errorCreate: string;
		successCreate: string;
		alreadyRegistered: string;
		username: string;
		confirmPassword: string;
		create: string;
		register: string;
		schema: {
			username: {
				min: string;
				max: string;
				required: string;
			};
			email: {
				required: string;
				invalid: string;
			};
			password: {
				min: string;
				required: string;
			};
			confirmPassword: {
				notMatch: string;
				required: string;
			};
		};
	};
};

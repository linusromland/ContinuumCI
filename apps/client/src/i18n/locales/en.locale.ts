// Internal dependencies
import { TranslationKeys } from './locale.type';

export const en: TranslationKeys = {
	lang: 'English',
	setupSidebar: {
		footer: 'ContinuumCI is a project by Linus Romland. The source code is available on'
	},
	sidebar: {
		analytics: {
			title: 'Analytics',
			overview: 'Overview'
		},
		deployments: {
			title: 'Deployments',
			projects: 'Projects',
			containers: 'Containers',
			domains: 'Domains'
		},
		settings: {
			title: 'Settings',
			general: 'General',
			users: 'Users'
		},
		footer: {
			authenticatedAs: 'Authenticated as',
			signOut: 'Sign out'
		}
	},
	resetPassword: {
		title: 'Reset password',
		successReset: "If the email is valid, you'll receive an email with a link to reset your password.",
		errorReset: 'An error occurred while resetting your password. Please try again later.'
	},
	login: {
		title: 'Welcome back! Please login to your account.',
		successLogin: 'You have been logged in successfully.',
		invalidLogin: 'Invalid email or password.',
		rememberMe: 'Remember me',
		forgotPassword: 'Forgot password?',
		resetPassword: 'Reset password',
		notRegistered: "Don't have an account?",
		login: 'Login',
		password: 'Password'
	},
	register: {
		title: 'Welcome! Please register for an account.',
		successCreate: 'Your account has been created successfully.',
		errorCreate: 'An error occurred while creating your account. Please try again later.',
		alreadyRegistered: 'Already have an account?',
		username: 'Username',
		confirmPassword: 'Confirm password',
		create: 'Create account',
		register: 'Register',
		schema: {
			username: {
				min: 'Username must be at least 3 characters long.',
				max: 'Username must be at most 20 characters long.',
				required: 'Username is required.'
			},
			email: {
				required: 'Email is required.',
				invalid: 'Email is invalid.'
			},
			password: {
				min: 'Password must be at least 8 characters long.',
				required: 'Password is required.'
			},
			confirmPassword: {
				notMatch: 'Passwords do not match.',
				required: 'Confirm password is required.'
			}
		}
	}
};

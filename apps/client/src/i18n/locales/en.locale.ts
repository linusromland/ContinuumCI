// Internal dependencies
import { TranslationKeys } from './locale.type';

export const en: TranslationKeys = {
	lang: 'English',
	table: {
		noData: 'No data available'
	},
	setupSidebar: {
		footer: 'ContinuumCI by Linus Romland. Source code on'
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
			users: 'Users',
			mail: 'Mail'
		},
		footer: {
			authenticatedAs: 'Logged in as',
			signOut: 'Sign out'
		},
		logoutSuccess: 'You have been successfully logged out!',
		logoutError: 'An error occurred while logging out.'
	},
	resetPassword: {
		title: 'Reset password',
		successReset: "If the email is valid, you'll receive a link to reset your password.",
		errorReset: 'An error occurred. Please try again later.'
	},
	login: {
		title: 'Welcome back! Login to your account.',
		successLogin: 'Logged in successfully.',
		invalidLogin: 'Invalid email or password.',
		rememberMe: 'Remember me',
		forgotPassword: 'Forgot password?',
		resetPassword: 'Reset password',
		notRegistered: 'No account yet?',
		login: 'Login',
		password: 'Password'
	},
	register: {
		title: 'Welcome! Register for an account.',
		successCreate: 'Account created successfully.',
		errorCreate: 'An error occurred. Please try again later.',
		alreadyRegistered: 'Already have an account?',
		username: 'Username',
		confirmPassword: 'Confirm password',
		create: 'Create account',
		register: 'Register',
		schema: {
			username: {
				min: 'At least 3 characters.',
				max: 'At most 20 characters.',
				required: 'Username is required.'
			},
			email: {
				required: 'Email is required.',
				invalid: 'Email is invalid.'
			},
			password: {
				min: 'At least 8 characters.',
				required: 'Password is required.'
			},
			confirmPassword: {
				notMatch: 'Passwords do not match.',
				required: 'Confirm password is required.'
			}
		}
	},
	overview: {
		welcomeBack: 'Welcome back',
		applicationStatus: {
			title: 'Application status',
			errorDescription: 'Some applications are not running.',
			successDescription: 'Everything operating normally!',
			activeApplications: 'applications active'
		},
		cpuUsage: {
			title: 'CPU Usage',
			on: 'on',
			cores: 'cores'
		},
		memoryUsage: {
			title: 'Memory Usage',
			ofTotal: 'of'
		},
		networkUsage: {
			title: 'Network Usage',
			sending: 'Sending',
			receiving: 'Receiving'
		},
		images: 'Images',
		requestTable: {
			title: '10 latest requests',
			time: 'Time',
			method: 'Method',
			status: 'Status',
			url: 'URL',
			ip: 'IP',
			size: 'Size (bytes)'
		}
	},
	projects: {
		header: {
			title: 'Projects',
			lastUpdated: 'Last updated'
		},
		newProjectButton: 'New project',
		search: 'Search',
		noProjects: 'No projects found.',
		projectCard: {
			status: {
				title: 'Status',
				unknown: 'Unknown',
				running: 'Running',
				notRunning: 'Not running',
				restarting: 'Restarting',
				crashed: 'Crashed',
				partiallyRunning: 'Partially running'
			},
			syncStatus: {
				title: 'Sync status',
				unknown: 'Unknown',
				inSync: 'In sync',
				outOfSync: 'Out of sync'
			},
			repository: 'Repository'
		},
		newProject: {
			title: 'Create new project',
			projectName: 'Project name',
			repositoryUrl: 'Repository URL',
			repositoryUrlHint: '(should end with .git)',
			branch: 'Branch',
			create: 'Create project',
			successCreate: 'Project created successfully.',
			errorCreate: 'An error occurred. Please try again later.',
			schema: {
				name: {
					min: 'At least 3 characters.',
					required: 'Project name is required.'
				},
				repositoryUrl: {
					required: 'Repository URL is required.',
					invalid: 'Repository URL is invalid.'
				},
				branch: {
					required: 'Branch is required.'
				}
			}
		}
	},
	project: {
		projectDetails: 'Project Details',
		name: 'Name',
		sync: 'Sync',
		syncSuccess: 'Project synced!',
		alreadyInSync: 'Project already in sync.',
		syncError: 'An error occurred while syncing project.',
		start: 'Start',
		started: 'started',
		stop: 'Stop',
		stopped: 'stopped',
		stopError: 'An error occurred while stopping project.',
		startError: 'An error occurred while starting project.',
		remove: 'Remove',
		confirmRemove: 'Confirm Removal',
		removeSuccess: 'Project removed!',
		removeError: 'An error occurred while removing project.',
		manualStop: 'Manually stopped',
		editNameTitle: 'Edit project name',
		projectNameSuccess: 'Project name updated!',
		projectNameError: 'An error occurred while updating project name.',
		nameRequired: 'Project name required.',
		notFound: 'Project not found.'
	},
	editModal: {
		title: 'Edit',
		update: 'Update'
	},
	enviromentVariablesTable: {
		title: 'Environment Variables',
		description: 'All variables for the project.',
		addNew: 'Add new',
		save: 'Save',
		remove: 'Remove',
		confirmRemove: 'Confirm',
		removeSuccess: 'Variable removed!',
		removeError: 'An error occurred while removing variable.',
		updateSuccess: 'Variable updated!',
		updateError: 'An error occurred while updating variable.',
		createSuccess: 'Variable created!',
		createError: 'An error occurred while creating variable.',
		all: 'All',
		name: 'Name',
		value: 'Value',
		services: 'Services',
		availableServices: 'Available for which services?',
		actions: 'Actions'
	},
	createEnviromentVariables: {
		title: 'Create Variable',
		schema: {
			name: {
				required: 'Name is required.',
				match: 'Name can only contain alphanumeric characters and underscores.'
			},
			value: {
				required: 'Value is required.'
			},
			services: {
				min: 'At least one service must be selected.'
			}
		}
	},
	containersTable: {
		title: 'Containers',
		description: 'All containers for the project.',
		name: 'Name',
		state: 'State',
		created: 'Created'
	},
	accessControl: {
		title: 'Access Control Management',
		description: 'The root user and all administrators have full access to all projects.',
		username: 'Username',
		email: 'Email Address',
		role: 'User Role',
		actions: 'Available Actions',
		remove: 'Remove User',
		confirmRemove: 'Confirm Removal',
		addNew: 'Add New User',
		projectStatus: {
			owner: 'Project Owner',
			developer: 'Project Developer',
			viewer: 'Project Viewer',
			unknown: 'Unknown Role'
		}
	},
	containers: {
		title: 'Container Management',
		availableContainers: 'Available Containers',
		noContainersFound: 'No containers found.',
		name: 'Container Name',
		state: 'Current State',
		created: 'Creation Date'
	},
	container: {
		title: 'Container Details',
		id: 'Container ID',
		logs: 'Container Logs',
		lastUpdated: 'Last Updated On',
		notFound: 'Container not found.'
	},
	domains: {
		title: 'Domain Management',
		createDomain: 'Create New Domain',
		createDomainSuccess: 'The domain has been successfully created!',
		createDomainError: 'An error occurred while creating the domain.',
		noDomainsFound: 'No domains found.',
		serverName: 'Server Name',
		leaveEmptyForRoot: 'Leave empty for root domain',
		locations: 'Domain Locations',
		location: 'Location',
		project: 'Associated Project',
		service: 'Associated Service',
		port: 'Service Port',
		proxyPass: 'Proxy Pass',
		sslConfigured: 'SSL Configured',
		websocketConfigured: 'Websocket Configured',
		internalOnly: 'Internal Domain Only',
		remove: 'Remove Domain',
		confirmRemove: 'Confirm Domain Removal',
		removeSuccess: 'The domain has been successfully removed!',
		removeError: 'An error occurred while removing the domain.',
		yes: 'Yes',
		no: 'No',
		schema: {
			serverName: {
				required: 'Server name is required.',
				matches: 'Server name may only contain lowercase letters, a-z.'
			},
			domain: {
				required: 'Domain is required.'
			},
			location: {
				required: 'Location is required.'
			},
			locationMin: 'At least one location must be selected.',
			proxyPass: {
				required: 'Proxy Pass is required.'
			},
			project: {
				id: {
					required: 'Project ID is required.'
				},
				service: {
					required: 'Service is required.'
				}
			},
			ssl: {
				required: 'SSL is required.'
			}
		},
		type: {
			title: 'Domain Type',
			project: 'Project Service Domain',
			custom: 'Custom Domain'
		}
	},
	settings: {
		title: 'Application Settings'
	},
	generalSettings: {
		title: 'General Settings',
		general: 'General Information',
		accountRole: 'Account Role',
		username: 'Username',
		email: 'Email Address',
		change: 'Modify',
		usernameRequired: 'Username is required.',
		usernameSuccess: 'Username has been successfully changed!',
		usernameError: 'An error occurred while changing the username.',
		emailRequired: 'Email is required.',
		emailInvalid: 'Invalid email address.',
		emailSuccess: 'Email has been successfully changed!',
		emailError: 'An error occurred while changing the email.'
	},
	changePasswordModal: {
		oldPassword: {
			title: 'Old Password',
			required: 'Old password is required.'
		},
		newPassword: {
			title: 'New Password',
			required: 'New password is required.',
			minLength: 'Password must be at least 8 characters long.'
		},
		confirmPassword: {
			title: 'Confirm New Password',
			required: 'Confirm password is required.',
			match: 'Passwords do not match.'
		},
		submit: 'Change Password',
		success: 'Password has been successfully changed!',
		error: 'An error occurred while changing the password.'
	},
	userSettings: {
		title: 'User Settings',
		noUsersFound: 'No users found.',
		users: 'Users List',
		accountType: 'Account Type',
		username: 'Username',
		email: 'Email Address',
		lastLogin: 'Last Login Date',
		lastIp: 'Last IP Address',
		actions: 'Actions',
		edit: 'Edit User',
		never: 'Never Logged In'
	},
	changeRoleModal: {
		title: 'Change User Role',
		description: "This will change the user's role.",
		schema: {
			roleRequired: 'Role is required.'
		},
		role: 'User Role',
		root: 'Root User',
		admin: 'Administrator',
		user: 'Standard User',
		unknown: 'Unknown Role',
		submit: 'Change Role',
		success: 'Role has been successfully changed!',
		error: 'An error occurred while changing the role.'
	},
	nginx: {
		title: 'Nginx Settings',
		nginx: 'Nginx Configuration',
		configuration: {
			title: 'Nginx Configuration',
			sitesEnabledDirectory: 'Sites Enabled Directory',
			sitesEnabledDirectoryRequired: 'Sites Enabled directory is required.',
			accessLogLocation: 'Access Log Location',
			accessLogLocationRequired: 'Access log location is required.',
			localIpAddresses: 'Local IP Addresses',
			localIpAddressesRequired: 'Local IP addresses are required.',
			edit: 'Edit Configuration',
			notSet: 'Not set',
			successfullyUpdated: 'Configuration has been successfully updated!',
			failedToUpdate: 'An error occurred while updating the configuration.'
		},
		domains: {
			title: 'Nginx Domains',
			availableDomains: 'Available Domains',
			noDomainsFound: 'No domains found.',
			addDomainName: 'Add Domain Name',
			failedToAddDomain: 'Failed to add domain name.',
			removeDomainName: 'Remove Domain Name',
			failedToRemoveDomain: 'Failed to remove domain name.',
			add: 'Add Domain',
			remove: 'Remove Domain'
		}
	},
	addUserModal: {
		title: 'Add User to Project',
		user: 'Select User',
		role: 'Select Role',
		add: 'Add User',
		addSuccess: 'User has been successfully added to the project!',
		addError: 'An error occurred while adding the user to the project.',
		removeSuccess: 'User has been successfully removed from the project!',
		removeError: 'An error occurred while removing the user from the project.',
		schema: {
			user: {
				required: 'User selection is required.'
			},
			role: {
				required: 'Role selection is required.'
			}
		}
	},
	mainLayout: {
		verifiedEmailSuccess: 'Email has been successfully verified!'
	},
	unverifiedBanner: {
		description: 'Your email address has not been verified. Please check your email for a verification link.',
		resendEmail: 'Resend email',
		checkVerification: 'Check verification status',
		resendSuccess: 'Verification email has been successfully resent!',
		resendError: 'An error occurred while resending the verification email.'
	},
	newPassword: {
		schema: {
			password: {
				required: 'Password is required.',
				min: 'Password must be at least 8 characters long.'
			},
			confirmPassword: {
				required: 'Confirm password is required.',
				match: 'Passwords do not match.'
			}
		},
		invalidToken: 'Invalid token.',
		title: 'Reset Password',
		submit: 'Reset Password',
		submitSuccess: 'Password has been successfully reset!',
		submitError: 'An error occurred while resetting the password.',
		newPassword: 'New Password',
		confirmPassword: 'Confirm New Password'
	},
	setup: {
		emailSettingsError: 'An error occurred while configuring the email settings.',
		emailSettingsSuccess: 'Email settings have been successfully configured!',
		userCreateError: 'An error occurred while creating the root user.',
		rootConfiguration:
			'The first step in configuring ContinuumCI is to create your first root user. This user will have access to all of the features and settings within ContinuumCI and will be responsible for managing your projects.',
		emailConfiguration:
			'It is now time to configure the email settings for ContinuumCI. This is not required, but is highly recommended. If you do not configure email settings, ContinuumCI will not be able to send you any notifications.'
	},
	continuousDeployment: {
		title: 'Continuous Deployment',
		token: 'Token',
		regenerateToken: 'Regenerate Token',
		confirmRegenerateToken: 'Confirm Regenerate Token',
		copy: 'Copy',
		copySuccess: 'Copied to clipboard!',
		copyError: 'Failed to copy to clipboard.',
		apiURL: 'API URL',
		footerText: 'You can find more information about Continuous Deployment in the',
		documentation: 'documentation.',
		regenerateSuccess: 'Token has been successfully regenerated!',
		regenerateError: 'An error occurred while regenerating the token.'
	},
	mail: {
		title: 'Mail Settings',
		configurationStatus: 'Configuration Status',
		configurationNotSet: 'Not set',
		configurationWorking: 'Working',
		configurationNotWorking: 'Error',
		save: 'Save',
		skip: 'Skip',
		email: 'Email',
		oneTimePassword: 'One Time Password',
		continue: 'Continue',
		service: 'Email Service Provider'
	},
	welcome: {
		firstSection:
			'We are thrilled to have you on board and ready to start managing your projects, nginx, docker, and more with our powerful, free, and open-source software.',
		secondSection:
			'In this first time setup guide, we will walk you through the necessary steps to set up your ContinuumCI instance, create the first root user, configure email settings, set up Nginx, and more. By following these instructions carefully, you will be up and running in no time and ready to start managing your projects with ease.',
		thirdSection:
			'The first step in configuring ContinuumCI is to create your first root user. This user will have access to all of the features and settings within ContinuumCI and will be responsible for managing your projects. You can do this by logging into the ContinuumCI web interface and following the prompts to create your user.',
		getStarted: 'Get Started'
	}
};

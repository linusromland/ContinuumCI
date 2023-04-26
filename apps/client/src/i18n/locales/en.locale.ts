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
			users: 'Users'
		},
		footer: {
			authenticatedAs: 'Logged in as',
			signOut: 'Sign out'
		}
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
		remove: 'Remove',
		confirmRemove: 'Confirm Removal',
		removeSuccess: 'Project removed!',
		removeError: 'An error occurred while removing project.',
		manualStop: 'Manually stopped',
		editNameTitle: 'Edit project name',
		nameRequired: 'Project name required.'
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
		title: 'Access Control',
		description: 'The root user and all administrators have full access to all projects.',
		username: 'Username',
		email: 'Email',
		role: 'Role',
		actions: 'Actions',
		remove: 'Remove',
		confirmRemove: 'Confirm',
		addNew: 'Add new',
		projectStatus: {
			owner: 'Owner',
			developer: 'Developer',
			viewer: 'Viewer',
			unknown: 'Unknown'
		}
	},
	containers: {
		title: 'Containers',
		availableContainers: 'Available containers',
		noContainersFound: 'No containers found.',
		name: 'Name',
		state: 'State',
		created: 'Created'
	},
	container: {
		title: 'Container Details',
		id: 'Id',
		logs: 'Logs',
		lastUpdated: 'Last Updated'
	},
	domains: {
		title: 'Domains',
		createDomain: 'Create Domain',
		createDomainSuccess: 'The domain has been created!',
		createDomainError: 'An error occurred while creating the domain.',
		noDomainsFound: 'No domains found.',
		serverName: 'Server Name',
		leaveEmptyForRoot: 'Leave empty for root',
		locations: 'Locations',
		location: 'Location',
		project: 'Project',
		service: 'Service',
		port: 'Port',
		proxyPass: 'Proxy Pass',
		sslConfigured: 'SSL configured',
		websocketConfigured: 'Websocket configured',
		internalOnly: 'Internal only',
		remove: 'Remove',
		confirmRemove: 'Confirm removal',
		removeSuccess: 'The domain has been removed!',
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
			title: 'Type',
			project: 'Project Service',
			custom: 'Custom'
		}
	},
	settings: {
		title: 'Settings'
	},
	generalSettings: {
		title: 'General Settings',
		general: 'General',
		accountRole: 'Account Role',
		username: 'Username',
		email: 'Email',
		change: 'Change',
		usernameRequired: 'Username is required.',
		usernameSuccess: 'Username has been changed!',
		usernameError: 'An error occurred while changing the username.',
		emailRequired: 'Email is required.',
		emailInvalid: 'Invalid email.',
		emailSuccess: 'Email has been changed!',
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
			title: 'Confirm Password',
			required: 'Confirm password is required.',
			match: 'Passwords do not match.'
		},
		submit: 'Change Password',
		success: 'Password has been changed!',
		error: 'An error occurred while changing the password.'
	},
	userSettings: {
		title: 'User Settings',
		noUsersFound: 'No users found.',
		users: 'Users',
		accountType: 'Account Type',
		username: 'Username',
		email: 'Email',
		lastLogin: 'Last Login',
		lastIp: 'Last IP',
		actions: 'Actions',
		edit: 'Edit',
		never: 'Never'
	},
	changeRoleModal: {
		title: 'Change Role',
		description: "This will change the user's role.",
		schema: {
			roleRequired: 'Role is required.'
		},
		role: 'Role',
		root: 'Root',
		admin: 'Administrator',
		user: 'User',
		unknown: 'Unknown',
		submit: 'Change Role',
		success: 'Role has been changed!',
		error: 'An error occurred while changing the role.'
	},
	nginx: {
		title: 'Nginx Settings',
		nginx: 'Nginx',
		configuration: {
			title: 'Configuration',
			sitesEnabledDirectory: 'Sites Enabled directory',
			sitesEnabledDirectoryRequired: 'Sites Enabled directory is required.',
			accessLogLocation: 'Access log location',
			accessLogLocationRequired: 'Access log location is required.',
			localIpAddresses: 'Local IP addresses',
			localIpAddressesRequired: 'Local IP addresses is required.',
			edit: 'Edit',
			notSet: 'Not set',
			successfullyUpdated: 'Configuration has been updated!',
			failedToUpdate: 'An error occurred while updating the configuration.'
		},
		domains: {
			title: 'Domains',
			availableDomains: 'Available Domains',
			noDomainsFound: 'No domains found.',
			addDomainName: 'Add domain name',
			failedToAddDomain: 'Failed to add domain name.',
			removeDomainName: 'Remove domain name',
			failedToRemoveDomain: 'Failed to remove domain name.',
			add: 'Add',
			remove: 'Remove'
		}
	},
	addUserModal: {
		title: 'Add User to Project',
		user: 'User',
		role: 'Role',
		add: 'Add',
		addSuccess: 'User has been added to the project!',
		addError: 'An error occurred while adding the user to the project.',
		removeSuccess: 'User has been removed from the project!',
		removeError: 'An error occurred while removing the user from the project.',
		schema: {
			user: {
				required: 'User is required.'
			},
			role: {
				required: 'Role is required.'
			}
		}
	}
};

export type TranslationKeys = {
	lang: string;
	table: {
		noData: string;
	};
	setupSidebar: {
		footer: string;
	};
	sidebar: {
		analytics: {
			title: string;
			overview: string;
		};
		deployments: {
			title: string;
			projects: string;
			containers: string;
			domains: string;
		};
		settings: {
			title: string;
			general: string;
			users: string;
		};
		footer: {
			authenticatedAs: string;
			signOut: string;
		};
		logoutSuccess: string;
		logoutError: string;
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
	overview: {
		welcomeBack: string;
		applicationStatus: {
			title: string;
			errorDescription: string;
			successDescription: string;
			activeApplications: string;
		};
		cpuUsage: {
			title: string;
			on: string;
			cores: string;
		};
		memoryUsage: {
			title: string;
			ofTotal: string;
		};
		networkUsage: {
			title: string;
			sending: string;
			receiving: string;
		};
		images: string;
		requestTable: {
			title: string;
			time: string;
			method: string;
			status: string;
			url: string;
			ip: string;
			size: string;
		};
	};
	projects: {
		header: {
			title: string;
			lastUpdated: string;
		};
		newProjectButton: string;
		search: string;
		noProjects: string;
		projectCard: {
			status: {
				title: string;
				unknown: string;
				running: string;
				notRunning: string;
				restarting: string;
				crashed: string;
				partiallyRunning: string;
				[key: string]: string;
			};
			syncStatus: {
				title: string;
				unknown: string;
				inSync: string;
				outOfSync: string;
			};
			repository: string;
		};
		newProject: {
			title: string;
			projectName: string;
			repositoryUrl: string;
			repositoryUrlHint: string;
			branch: string;
			create: string;
			successCreate: string;
			errorCreate: string;
			schema: {
				name: {
					min: string;
					required: string;
				};
				repositoryUrl: {
					required: string;
					invalid: string;
				};
				branch: {
					required: string;
				};
			};
		};
	};
	project: {
		projectDetails: string;
		name: string;
		sync: string;
		syncSuccess: string;
		alreadyInSync: string;
		syncError: string;
		start: string;
		started: string;
		stop: string;
		stopped: string;
		stopError: string;
		startError: string;
		remove: string;
		confirmRemove: string;
		removeSuccess: string;
		removeError: string;
		manualStop: string;
		editNameTitle: string;
		projectNameSuccess: string;
		projectNameError: string;
		nameRequired: string;
		notFound: string;
	};
	editModal: {
		title: string;
		update: string;
	};
	enviromentVariablesTable: {
		title: string;
		description: string;
		addNew: string;
		save: string;
		remove: string;
		confirmRemove: string;
		removeSuccess: string;
		removeError: string;
		updateSuccess: string;
		updateError: string;
		createSuccess: string;
		createError: string;
		all: string;
		name: string;
		value: string;
		services: string;
		availableServices: string;
		actions: string;
	};
	createEnviromentVariables: {
		title: string;
		schema: {
			name: {
				required: string;
				match: string;
			};
			value: {
				required: string;
			};
			services: {
				min: string;
			};
		};
	};
	containersTable: {
		title: string;
		description: string;
		name: string;
		state: string;
		created: string;
	};
	accessControl: {
		title: string;
		description: string;
		username: string;
		email: string;
		role: string;
		actions: string;
		remove: string;
		confirmRemove: string;
		addNew: string;
		projectStatus: {
			owner: string;
			developer: string;
			viewer: string;
			unknown: string;
		};
	};
	containers: {
		title: string;
		availableContainers: string;
		noContainersFound: string;
		name: string;
		state: string;
		created: string;
	};
	container: {
		title: string;
		id: string;
		logs: string;
		lastUpdated: string;
		notFound: string;
	};
	domains: {
		title: string;
		createDomain: string;
		createDomainSuccess: string;
		createDomainError: string;
		noDomainsFound: string;
		serverName: string;
		leaveEmptyForRoot: string;
		locations: string;
		location: string;
		project: string;
		service: string;
		port: string;
		proxyPass: string;
		websocketConfigured: string;
		internalOnly: string;
		remove: string;
		confirmRemove: string;
		removeSuccess: string;
		removeError: string;
		sslConfigured: string;
		yes: string;
		no: string;
		schema: {
			serverName: {
				required: string;
				matches: string;
			};
			domain: {
				required: string;
			};
			location: {
				required: string;
			};
			locationMin: string;
			proxyPass: {
				required: string;
			};
			project: {
				id: {
					required: string;
				};
				service: {
					required: string;
				};
			};
			ssl: {
				required: string;
			};
		};
		type: {
			title: string;
			project: string;
			custom: string;
		};
	};
	settings: {
		title: string;
	};
	generalSettings: {
		title: string;
		general: string;
		accountRole: string;
		username: string;
		email: string;
		change: string;
		usernameRequired: string;
		usernameSuccess: string;
		usernameError: string;
		emailRequired: string;
		emailInvalid: string;
		emailSuccess: string;
		emailError: string;
	};
	changePasswordModal: {
		oldPassword: {
			title: string;
			required: string;
		};
		newPassword: {
			title: string;
			required: string;
			minLength: string;
		};
		confirmPassword: {
			title: string;
			required: string;
			match: string;
		};
		submit: string;
		success: string;
		error: string;
	};
	userSettings: {
		title: string;
		noUsersFound: string;
		users: string;
		accountType: string;
		username: string;
		email: string;
		lastLogin: string;
		lastIp: string;
		actions: string;
		edit: string;
		never: string;
	};
	changeRoleModal: {
		title: string;
		description: string;
		schema: {
			roleRequired: string;
		};
		role: string;
		root: string;
		admin: string;
		user: string;
		unknown: string;
		submit: string;
		success: string;
		error: string;
	};
	nginx: {
		title: string;
		nginx: string;
		configuration: {
			title: string;
			sitesEnabledDirectory: string;
			sitesEnabledDirectoryRequired: string;
			accessLogLocation: string;
			accessLogLocationRequired: string;
			localIpAddresses: string;
			localIpAddressesRequired: string;
			edit: string;
			notSet: string;
			successfullyUpdated: string;
			failedToUpdate: string;
		};
		domains: {
			title: string;
			availableDomains: string;
			noDomainsFound: string;
			addDomainName: string;
			failedToAddDomain: string;
			removeDomainName: string;
			failedToRemoveDomain: string;
			add: string;
			remove: string;
		};
	};
	addUserModal: {
		title: string;
		user: string;
		role: string;
		add: string;
		addSuccess: string;
		addError: string;
		removeSuccess: string;
		removeError: string;
		schema: {
			user: {
				required: string;
			};
			role: {
				required: string;
			};
		};
	};
	mainLayout: {
		verifiedEmailSuccess: string;
	};
	unverifiedBanner: {
		description: string;
		resendEmail: string;
		checkVerification: string;
		resendSuccess: string;
		resendError: string;
	};
	newPassword: {
		schema: {
			password: {
				required: string;
				min: string;
			};
			confirmPassword: {
				required: string;
				match: string;
			};
		};
		invalidToken: string;
		title: string;
		submit: string;
		submitSuccess: string;
		submitError: string;
		newPassword: string;
		confirmPassword: string;
	};
	setup: {
		emailSettingsError: string;
		userCreateError: string;
	};
};

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
		syncError: string;
		start: string;
		started: string;
		stop: string;
		stopped: string;
		remove: string;
		confirmRemove: string;
		removeSuccess: string;
		removeError: string;
		manualStop: string;
		editNameTitle: string;
		nameRequired: string;
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
};

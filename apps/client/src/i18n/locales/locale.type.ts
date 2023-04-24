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
};

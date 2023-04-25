// Internal dependencies
import { TranslationKeys } from './locale.type';

export const sv: TranslationKeys = {
	lang: 'Svenska',
	table: {
		noData: 'Ingen data tillgänglig'
	},
	setupSidebar: {
		footer: 'ContinuumCI är ett projekt av Linus Romland. Källkoden är tillgänglig på'
	},
	sidebar: {
		analytics: {
			title: 'Analys',
			overview: 'Översikt'
		},
		deployments: {
			title: 'Utplaceringar',
			projects: 'Projekt',
			containers: 'Containrar',
			domains: 'Domäner'
		},
		settings: {
			title: 'Inställningar',
			general: 'Allmänt',
			users: 'Användare'
		},
		footer: {
			authenticatedAs: 'Inloggad som',
			signOut: 'Logga ut'
		}
	},
	resetPassword: {
		title: 'Återställ lösenord',
		successReset:
			'Om e-postadressen är giltig kommer du att få ett e-postmeddelande med en länk för att återställa ditt lösenord.',
		errorReset: 'Ett fel uppstod vid återställning av ditt lösenord. Försök igen senare.'
	},
	login: {
		title: 'Välkommen tillbaka! Vänligen logga in.',
		successLogin: 'Du har loggat in!',
		invalidLogin: 'Ogiltig e-postadress eller lösenord.',
		rememberMe: 'Kom ihåg mig',
		forgotPassword: 'Glömt lösenordet?',
		resetPassword: 'Återställ lösenord',
		notRegistered: 'Har du inget konto?',
		login: 'Logga in',
		password: 'Lösenord'
	},
	register: {
		title: 'Välkommen! Vänligen registrera ett konto.',
		successCreate: 'Ditt konto har skapats!',
		errorCreate: 'Ett fel uppstod vid skapande av ditt konto. Försök igen senare.',
		alreadyRegistered: 'Har du redan ett konto?',
		username: 'Användarnamn',
		confirmPassword: 'Bekräfta lösenordet',
		create: 'Skapa konto',
		register: 'Registrera',
		schema: {
			username: {
				min: 'Användarnamnet måste vara minst 3 tecken långt.',
				max: 'Användarnamnet får vara högst 20 tecken långt.',
				required: 'Användarnamn krävs.'
			},
			email: {
				required: 'E-postadress krävs.',
				invalid: 'E-postadressen är ogiltig.'
			},
			password: {
				min: 'Lösenordet måste vara minst 8 tecken långt.',
				required: 'Lösenord krävs.'
			},
			confirmPassword: {
				notMatch: 'Lösenorden matchar inte.',
				required: 'Bekräfta lösenord krävs.'
			}
		}
	},
	overview: {
		welcomeBack: 'Välkommen tillbaka',
		applicationStatus: {
			title: 'Applikationsstatus',
			errorDescription: 'Vissa applikationer körs inte.',
			successDescription: 'Alla applikationer körs.',
			activeApplications: 'aktiva applikationer'
		},
		cpuUsage: {
			title: 'CPU Användning',
			on: 'på',
			cores: 'kärnor'
		},
		memoryUsage: {
			title: 'Minnesanvändning',
			ofTotal: 'av totalt'
		},
		networkUsage: {
			title: 'Nätverksanvändning',
			sending: 'Skickar',
			receiving: 'Tar emot'
		},
		images: 'Dockerbilder',
		requestTable: {
			title: '10 senaste requesterna',
			time: 'Tid',
			method: 'Metod',
			status: 'Status',
			url: 'URL',
			ip: 'IP',
			size: 'Storlek (bytes)'
		}
	},
	projects: {
		header: {
			title: 'Projekt',
			lastUpdated: 'Senast uppdaterad'
		},
		newProjectButton: 'Nytt projekt',
		search: 'Sök',
		noProjects: 'Inga projekt hittades.',
		projectCard: {
			status: {
				title: 'Status',
				unknown: 'Okänd',
				running: 'Kör',
				notRunning: 'Kör inte',
				restarting: 'Startar om',
				crashed: 'Kraschade',
				partiallyRunning: 'Delvis körning'
			},
			syncStatus: {
				title: 'Sync status',
				unknown: 'Okänd',
				inSync: 'I synk',
				outOfSync: 'Ej i synk'
			},
			repository: 'Repository'
		},
		newProject: {
			title: 'Nytt projekt',
			projectName: 'Projektnamn',
			repositoryUrl: 'Repository URL',
			repositoryUrlHint: '(skall sluta med .git)',
			branch: 'Branch',
			create: 'Skapa projekt',
			successCreate: 'Projektet har skapats!',
			errorCreate: 'Ett fel uppstod vid skapande av projektet. Försök igen senare.',
			schema: {
				name: {
					min: 'Projektnamnet måste vara minst 3 tecken långt.',
					required: 'Projektnamn krävs.'
				},
				repositoryUrl: {
					required: 'Repository URL krävs.',
					invalid: 'Repository URL är ogiltig.'
				},
				branch: {
					required: 'Branch krävs.'
				}
			}
		}
	},
	project: {
		projectDetails: 'Projektdetaljer',
		name: 'Namn',
		sync: 'Synkronisera',
		syncSuccess: 'Projektet har synkroniserats!',
		syncError: 'Ett fel uppstod vid synkronisering av projektet.',
		start: 'Starta',
		started: 'startades',
		stop: 'Stoppa',
		stopped: 'stoppades',
		remove: 'Ta bort',
		confirmRemove: 'Bekräfta borttagning',
		removeSuccess: 'Projektet har tagits bort!',
		removeError: 'Ett fel uppstod vid borttagning av projektet.',
		manualStop: 'Manuellt stoppad',
		editNameTitle: 'Ändra projektets namn',
		nameRequired: 'Projektnamn krävs.'
	},
	editModal: {
		title: 'Ändra',
		update: 'Uppdatera'
	},
	enviromentVariablesTable: {
		title: 'Miljövariabler',
		description: 'Alla miljövariabler för projektet.',
		addNew: 'Lägg till ny',
		save: 'Spara',
		remove: 'Ta bort',
		confirmRemove: 'Bekräfta',
		removeSuccess: 'Variabeln har tagits bort!',
		removeError: 'Ett fel uppstod vid borttagning av variabeln.',
		updateSuccess: 'Variabeln har uppdaterats!',
		updateError: 'Ett fel uppstod vid uppdatering av variabeln.',
		createSuccess: 'Variabeln har skapats!',
		createError: 'Ett fel uppstod vid skapande av variabeln.',
		all: 'Alla',
		name: 'Namn',
		value: 'Värde',
		services: 'Tjänster',
		availableServices: 'Tillgänglig för vilka tjänster?',
		actions: 'Åtgärder'
	},
	createEnviromentVariables: {
		title: 'Skapa variabel',
		schema: {
			name: {
				required: 'Namn krävs.',
				match: 'Namnet får endast innehålla alfanumeriska tecken och understreck.'
			},
			value: {
				required: 'Värde krävs.'
			},
			services: {
				min: 'Minst en tjänst måste väljas.'
			}
		}
	},
	containersTable: {
		title: 'Containers',
		description: 'Alla containers för projektet.',
		name: 'Namn',
		state: 'Status',
		created: 'Skapad'
	},
	accessControl: {
		title: 'Åtkomstkontroll',
		description: 'Root-användaren och alla administratörer har fullständig åtkomst till alla projekt.',
		username: 'Användarnamn',
		email: 'E-post',
		role: 'Roll',
		actions: 'Åtgärder',
		remove: 'Ta bort',
		addNew: 'Lägg till ny',
		projectStatus: {
			owner: 'Ägare',
			developer: 'Utvecklare',
			viewer: 'Läsare',
			unknown: 'Okänd'
		}
	},
	containers: {
		title: 'Containrar',
		availableContainers: 'Tillgängliga containrar',
		noContainersFound: 'Inga containrar hittades.',
		name: 'Namn',
		state: 'Status',
		created: 'Skapad'
	},
	container: {
		title: 'Containerdetaljer',
		id: 'Id',
		logs: 'Loggar',
		lastUpdated: 'Senast uppdaterad'
	},
	domains: {
		title: 'Domäner',
		createDomain: 'Skapa domän',
		createDomainSuccess: 'Domänen har skapats!',
		createDomainError: 'Ett fel uppstod vid skapande av domänen.',
		noDomainsFound: 'Inga domäner hittades.',
		serverName: 'Servernamn',
		leaveEmptyForRoot: 'Lämna tomt för root',
		locations: 'Platser',
		location: 'Plats',
		project: 'Projekt',
		service: 'Tjänst',
		port: 'Port',
		proxyPass: 'Proxy Pass',
		sslConfigured: 'SSL konfigurerad',
		websocketConfigured: 'Websocket konfigurerad',
		internalOnly: 'Endast internt',
		remove: 'Ta bort',
		confirmRemove: 'Bekräfta borttagning',
		removeSuccess: 'Domänen har tagits bort!',
		removeError: 'Ett fel uppstod vid borttagning av domänen.',
		yes: 'Ja',
		no: 'Nej',
		schema: {
			serverName: {
				required: 'Servernamn krävs.',
				matches: 'Servernamnet får endast innehålla små bokstäver, a-z.'
			},
			domain: {
				required: 'Domän krävs.'
			},
			location: {
				required: 'Plats krävs.'
			},
			locationMin: 'Minst en plats måste väljas.',
			proxyPass: {
				required: 'Proxy Pass krävs.'
			},
			project: {
				id: {
					required: 'Projektid krävs.'
				},
				service: {
					required: 'Tjänst krävs.'
				}
			},
			ssl: {
				required: 'SSL krävs.'
			}
		},
		type: {
			title: 'Typ',
			project: 'Projekt tjänst',
			custom: 'Anpassad'
		}
	}
};

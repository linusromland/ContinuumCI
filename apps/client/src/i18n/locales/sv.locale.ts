// Internal dependencies
import { TranslationKeys } from './locale.type';

export const sv: TranslationKeys = {
	lang: 'Svenska',
	table: {
		noData: 'Ingen data tillgänglig'
	},
	setupSidebar: {
		footer: 'ContinuumCI av Linus Romland. Källkod på'
	},
	sidebar: {
		analytics: {
			title: 'Analys',
			overview: 'Översikt'
		},
		deployments: {
			title: 'Distributioner',
			projects: 'Projekt',
			containers: 'Containers',
			domains: 'Domäner'
		},
		settings: {
			title: 'Inställningar',
			general: 'Allmänt',
			users: 'Användare',
			mail: 'E-post'
		},
		footer: {
			authenticatedAs: 'Inloggad som',
			signOut: 'Logga ut'
		},
		logoutSuccess: 'Du har loggats ut!',
		logoutError: 'Ett fel inträffade vid utloggning.'
	},
	resetPassword: {
		title: 'Återställ lösenord',
		successReset: 'Om e-postadressen är giltig kommer du att få en länk för att återställa ditt lösenord.',
		errorReset: 'Ett fel inträffade. Försök igen senare.'
	},
	login: {
		title: 'Välkommen tillbaka! Logga in på ditt konto.',
		successLogin: 'Inloggning lyckades.',
		invalidLogin: 'Ogiltig e-postadress eller lösenord.',
		rememberMe: 'Kom ihåg mig',
		forgotPassword: 'Glömt lösenord?',
		resetPassword: 'Återställ lösenord',
		notRegistered: 'Har du inget konto ännu?',
		login: 'Logga in',
		password: 'Lösenord'
	},
	register: {
		title: 'Välkommen! Registrera dig för ett konto.',
		successCreate: 'Kontot har skapats framgångsrikt.',
		errorCreate: 'Ett fel inträffade. Försök igen senare.',
		alreadyRegistered: 'Har du redan ett konto?',
		username: 'Användarnamn',
		confirmPassword: 'Bekräfta lösenord',
		create: 'Skapa konto',
		register: 'Registrera',
		schema: {
			username: {
				min: 'Minst 3 tecken.',
				max: 'Högst 20 tecken.',
				required: 'Användarnamn krävs.'
			},
			email: {
				required: 'E-postadress krävs.',
				invalid: 'E-postadressen är ogiltig.'
			},
			password: {
				min: 'Minst 8 tecken.',
				required: 'Lösenord krävs.'
			},
			confirmPassword: {
				notMatch: 'Lösenorden matchar inte.',
				required: 'Bekräftelse av lösenord krävs.'
			}
		}
	},
	overview: {
		welcomeBack: 'Välkommen tillbaka',
		applicationStatus: {
			title: 'Applikationsstatus',
			errorDescription: 'Vissa applikationer körs inte.',
			successDescription: 'Allt fungerar normalt!',
			activeApplications: 'aktiva applikationer'
		},
		cpuUsage: {
			title: 'CPU-användning',
			on: 'på',
			cores: 'kärnor'
		},
		memoryUsage: {
			title: 'Minnesanvändning',
			ofTotal: 'av'
		},
		networkUsage: {
			title: 'Nätverksanvändning',
			sending: 'Skickar',
			receiving: 'Tar emot'
		},
		images: 'Bilder',
		requestTable: {
			title: '10 senaste förfrågningarna',
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
				partiallyRunning: 'Delvis igång'
			},
			syncStatus: {
				title: 'Synkroniseringsstatus',
				unknown: 'Okänd',
				inSync: 'Synkroniserad',
				outOfSync: 'Inte synkroniserad'
			},
			repository: 'Repository'
		},
		newProject: {
			title: 'Skapa nytt projekt',
			projectName: 'Projektnamn',
			repositoryUrl: 'Repository URL',
			repositoryUrlHint: '(bör sluta med .git)',
			branch: 'Gren',
			create: 'Skapa projekt',
			successCreate: 'Projektet skapades framgångsrikt.',
			errorCreate: 'Ett fel inträffade. Försök igen senare.',
			schema: {
				name: {
					min: 'Minst 3 tecken.',
					required: 'Projektnamn krävs.'
				},
				repositoryUrl: {
					required: 'Repository URL krävs.',
					invalid: 'Repository URL är ogiltig.'
				},
				branch: {
					required: 'Gren krävs.'
				}
			}
		}
	},
	project: {
		projectDetails: 'Projektdetaljer',
		name: 'Namn',
		sync: 'Synkronisera',
		syncSuccess: 'Projekt synkroniserat!',
		alreadyInSync: 'Projektet är redan synkroniserat.',
		syncError: 'Ett fel inträffade vid synkronisering av projekt.',
		start: 'Starta',
		started: 'startade',
		stop: 'Stoppa',
		stopped: 'stoppade',
		stopError: 'Ett fel inträffade vid stopp av projekt.',
		startError: 'Ett fel inträffade vid start av projekt.',
		remove: 'Ta bort',
		confirmRemove: 'Bekräfta borttagning',
		removeSuccess: 'Projektet togs bort!',
		removeError: 'Ett fel inträffade vid borttagning av projekt.',
		manualStop: 'Manuellt stoppad',
		editNameTitle: 'Ändra projektnamn',
		projectNameSuccess: 'Projektnamn uppdaterat!',
		projectNameError: 'Ett fel inträffade vid uppdatering av projektnamn.',
		nameRequired: 'Projektnamn krävs.',
		notFound: 'Projektet hittades inte.'
	},
	editModal: {
		title: 'Redigera',
		update: 'Uppdatera'
	},
	enviromentVariablesTable: {
		title: 'Miljövariabler',
		description: 'Alla variabler för projektet.',
		addNew: 'Lägg till ny',
		save: 'Spara',
		remove: 'Ta bort',
		confirmRemove: 'Bekräfta',
		removeSuccess: 'Variabeln borttagen!',
		removeError: 'Ett fel inträffade vid borttagning av variabeln.',
		updateSuccess: 'Variabeln uppdaterad!',
		updateError: 'Ett fel inträffade vid uppdatering av variabeln.',
		createSuccess: 'Variabeln skapad!',
		createError: 'Ett fel inträffade vid skapande av variabeln.',
		all: 'Alla',
		name: 'Namn',
		value: 'Värde',
		services: 'Tjänster',
		availableServices: 'Tillgängliga för vilka tjänster?',
		actions: 'Åtgärder'
	},
	createEnviromentVariables: {
		title: 'Skapa variabel',
		schema: {
			name: {
				required: 'Namn krävs.',
				match: 'Namn kan endast innehålla alfanumeriska tecken och understreck.'
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
		title: 'Hantering av åtkomstkontroll',
		description: 'Rotanvändaren och alla administratörer har full åtkomst till alla projekt.',
		username: 'Användarnamn',
		email: 'E-postadress',
		role: 'Användarroll',
		actions: 'Tillgängliga åtgärder',
		remove: 'Ta bort användare',
		confirmRemove: 'Bekräfta borttagning',
		addNew: 'Lägg till ny användare',
		projectStatus: {
			owner: 'Projektägare',
			developer: 'Projektutvecklare',
			viewer: 'Projektvisare',
			unknown: 'Okänd roll'
		}
	},
	containers: {
		title: 'Hantering av containrar',
		availableContainers: 'Tillgängliga containrar',
		noContainersFound: 'Inga containrar hittades.',
		name: 'Containernamn',
		state: 'Nuvarande status',
		created: 'Skapad'
	},
	container: {
		title: 'Containerdetaljer',
		id: 'Container-ID',
		logs: 'Containerloggar',
		lastUpdated: 'Senast uppdaterad',
		notFound: 'Container hittades inte.'
	},
	domains: {
		title: 'Domänhantering',
		createDomain: 'Skapa ny domän',
		createDomainSuccess: 'Domänen har skapats framgångsrikt!',
		createDomainError: 'Ett fel inträffade vid skapande av domänen.',
		noDomainsFound: 'Inga domäner hittades.',
		serverName: 'Servernamn',
		leaveEmptyForRoot: 'Lämna tomt för rot-domän',
		locations: 'Domänplatser',
		location: 'Plats',
		project: 'Associerat projekt',
		service: 'Associerad tjänst',
		port: 'Tjänstport',
		proxyPass: 'Proxy Pass',
		sslConfigured: 'SSL konfigurerat',
		websocketConfigured: 'Websocket konfigurerat',
		internalOnly: 'Endast intern domän',
		remove: 'Ta bort domän',
		confirmRemove: 'Bekräfta domänborttagning',
		removeSuccess: 'Domänen har framgångsrikt tagits bort!',
		removeError: 'Ett fel inträffade vid borttagning av domänen.',
		yes: 'Ja',
		no: 'Nej',
		schema: {
			serverName: {
				required: 'Servernamn krävs.',
				matches: 'Servernamnet får endast innehålla gemener, a-z.'
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
					required: 'Projekt-ID krävs.'
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
			title: 'Domäntyp',
			project: 'Projekttjänstens domän',
			custom: 'Anpassad domän'
		}
	},
	settings: {
		title: 'Appinställningar'
	},
	generalSettings: {
		title: 'Allmänna inställningar',
		general: 'Allmän information',
		accountRole: 'Kontoroll',
		username: 'Användarnamn',
		email: 'E-postadress',
		change: 'Ändra',
		usernameRequired: 'Användarnamn krävs.',
		usernameSuccess: 'Användarnamnet har ändrats framgångsrikt!',
		usernameError: 'Ett fel inträffade vid ändring av användarnamnet.',
		emailRequired: 'E-post krävs.',
		emailInvalid: 'Ogiltig e-postadress.',
		emailSuccess: 'E-postadressen har ändrats framgångsrikt!',
		emailError: 'Ett fel inträffade vid ändring av e-postadressen.'
	},
	changePasswordModal: {
		oldPassword: {
			title: 'Gammalt lösenord',
			required: 'Gammalt lösenord krävs.'
		},
		newPassword: {
			title: 'Nytt lösenord',
			required: 'Nytt lösenord krävs.',
			minLength: 'Lösenordet måste vara minst 8 tecken långt.'
		},
		confirmPassword: {
			title: 'Bekräfta nytt lösenord',
			required: 'Bekräftelse av lösenord krävs.',
			match: 'Lösenorden matchar inte.'
		},
		submit: 'Byt lösenord',
		success: 'Lösenordet har ändrats framgångsrikt!',
		error: 'Ett fel inträffade vid ändring av lösenordet.'
	},
	userSettings: {
		title: 'Användarinställningar',
		noUsersFound: 'Inga användare hittades.',
		users: 'Användarlista',
		accountType: 'Kontotyp',
		username: 'Användarnamn',
		email: 'E-postadress',
		lastLogin: 'Senaste inloggning',
		lastIp: 'Senaste IP-adress',
		actions: 'Åtgärder',
		edit: 'Redigera användare',
		never: 'Aldrig inloggad'
	},
	changeRoleModal: {
		title: 'Ändra användarroll',
		description: 'Detta kommer att ändra användarens roll.',
		schema: {
			roleRequired: 'Roll krävs.'
		},
		role: 'Användarroll',
		root: 'Rotanvändare',
		admin: 'Administratör',
		user: 'Standardanvändare',
		unknown: 'Okänd roll',
		submit: 'Ändra roll',
		success: 'Rollen har ändrats framgångsrikt!',
		error: 'Ett fel inträffade vid ändring av rollen.'
	},
	nginx: {
		title: 'Nginx-inställningar',
		nginx: 'Nginx-konfiguration',
		configuration: {
			title: 'Nginx-konfiguration',
			sitesEnabledDirectory: 'Katalog för aktiverade webbplatser',
			sitesEnabledDirectoryRequired: 'Katalog för aktiverade webbplatser krävs.',
			accessLogLocation: 'Plats för åtkomstlogg',
			accessLogLocationRequired: 'Plats för åtkomstlogg krävs.',
			localIpAddresses: 'Lokala IP-adresser',
			localIpAddressesRequired: 'Lokala IP-adresser krävs.',
			edit: 'Redigera konfiguration',
			notSet: 'Inte inställt',
			successfullyUpdated: 'Konfigurationen har uppdaterats framgångsrikt!',
			failedToUpdate: 'Ett fel inträffade vid uppdatering av konfigurationen.'
		},
		domains: {
			title: 'Nginx-domäner',
			availableDomains: 'Tillgängliga domäner',
			noDomainsFound: 'Inga domäner hittades.',
			addDomainName: 'Lägg till domännamn',
			failedToAddDomain: 'Misslyckades med att lägga till domännamn.',
			removeDomainName: 'Ta bort domännamn',
			failedToRemoveDomain: 'Misslyckades med att ta bort domännamn.',
			add: 'Lägg till domän',
			remove: 'Ta bort domän'
		}
	},
	addUserModal: {
		title: 'Lägg till användare i projektet',
		user: 'Välj användare',
		role: 'Välj roll',
		add: 'Lägg till användare',
		addSuccess: 'Användaren har framgångsrikt lagts till i projektet!',
		addError: 'Ett fel inträffade vid tillägg av användaren i projektet.',
		removeSuccess: 'Användaren har tagits bort från projektet framgångsrikt!',
		removeError: 'Ett fel inträffade vid borttagning av användaren från projektet.',
		schema: {
			user: {
				required: 'Val av användare krävs.'
			},
			role: {
				required: 'Val av roll krävs.'
			}
		}
	},
	mainLayout: {
		verifiedEmailSuccess: 'E-postadressen har verifierats!'
	},
	unverifiedBanner: {
		description: 'Din e-postadress har inte verifierats. Kolla din e-post för att verifiera din e-postadress.',
		resendEmail: 'Skicka igen',
		checkVerification: 'Kontrollera verifiering',
		resendSuccess: 'Ett e-postmeddelande har skickats till din e-postadress.',
		resendError: 'Ett fel inträffade vid skickande av e-postmeddelande.'
	},
	newPassword: {
		schema: {
			password: {
				required: 'Lösenord krävs.',
				min: 'Lösenordet måste vara minst 8 tecken långt.'
			},
			confirmPassword: {
				required: 'Bekräftelse av lösenord krävs.',
				match: 'Lösenorden matchar inte.'
			}
		},
		invalidToken: 'Ogiltig token.',
		title: 'Återställ lösenord',
		submit: 'Återställ lösenord',
		submitSuccess: 'Lösenordet har återställts!',
		submitError: 'Ett fel inträffade vid återställning av lösenordet.',
		newPassword: 'Nytt lösenord',
		confirmPassword: 'Bekräfta nytt lösenord'
	},
	setup: {
		emailSettingsError: 'Ett fel inträffade vid uppdatering av e-postinställningarna.',
		emailSettingsSuccess: 'E-postinställningarna har uppdaterats framgångsrikt!',
		userCreateError: 'Ett fel inträffade vid skapande av rotanvändaren.'
	},
	continuousDeployment: {
		title: 'Continuous Deployment',
		token: 'Nyckel',
		regenerateToken: 'Generera ny nyckel',
		confirmRegenerateToken: 'Bekräfta generering av ny nyckel',
		copy: 'Kopiera',
		copySuccess: 'Kopierat till urklipp!',
		copyError: 'Ett fel inträffade vid kopiering till urklipp.',
		apiURL: 'API URL',
		footerText: 'Läs mer om hur du använder Continuous Deployment i',
		documentation: 'dokumentation.',
		regenerateSuccess: 'Ny nyckel har genererats!',
		regenerateError: 'Ett fel inträffade vid generering av ny nyckel.'
	},
	mail: {
		title: 'E-postinställningar',
		configurationStatus: 'Konfigurationsstatus',
		configurationNotSet: 'Inte inställd.',
		configurationWorking: 'Funkar.',
		configurationNotWorking: 'Fel.',
		save: 'Spara'
	}
};

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
	}
};

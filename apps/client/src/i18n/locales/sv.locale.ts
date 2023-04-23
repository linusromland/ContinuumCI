// Internal dependencies
import { TranslationKeys } from './locale.type';

export const sv: TranslationKeys = {
	setupSidebar: {
		footer: 'ContinuumCI är ett projekt av Linus Romland. Källkoden är tillgänglig på'
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
	}
};

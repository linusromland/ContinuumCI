// External dependencies
import { useTranslation as useTranslationsReact } from 'react-i18next';

// Internal dependencies
import { TranslationKeys } from './locales/locale.type';
import { en, sv } from './locales';

export const translations: Record<string, TranslationKeys> = { en, sv };

const useTranslations = (): TranslationKeys => {
	const { i18n } = useTranslationsReact();
	const language = i18n.language || 'en';
	return translations[language] || en;
};

export default useTranslations;

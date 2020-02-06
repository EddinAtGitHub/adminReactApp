import translationEN from '../i18n/en.json';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: translationEN
			}
		},
		lng: "en",
		fallbackLng: "en",
		debug: true,

		interpolation: {
			escapeValue: false
		}
	}).then(() => console.log('I18n initialised'));

export default i18n;
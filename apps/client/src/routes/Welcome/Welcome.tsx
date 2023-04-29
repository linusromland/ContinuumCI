// External Dependencies
import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import Button from '../../components/Button/Button';
import style from './Welcome.module.scss';
import useTranslations from '../../i18n/translations';

export default function Welcome(): JSX.Element {
	const t = useTranslations();
	const navigate = useNavigate();

	function handleGetStarted(): void {
		navigate('/setup');
	}

	return (
		<>
			<div className={style.container}>
				<p className={style.subtitle}>{t.welcome.firstSection}</p>
				<p className={style.subtitle}>{t.welcome.secondSection}</p>
				<p className={style.subtitle}>{t.welcome.thirdSection}</p>
				<Button
					onClick={handleGetStarted}
					text={t.welcome.getStarted}
				/>
			</div>
		</>
	);
}

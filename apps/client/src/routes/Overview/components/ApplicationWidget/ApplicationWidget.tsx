// Internal dependencies
import Widget from '../../../../components/Widget/Widget';
import useTranslations from '../../../../i18n/translations';
import style from './ApplicationWidget.module.scss';

export default function ApplicationWidget({
	applicationsRunning,
	applicationsTotal
}: {
	applicationsRunning: number;
	applicationsTotal: number;
}): JSX.Element {
	const t = useTranslations();

	return (
		<Widget minSize>
			<div className={style.main}>
				<h2 className={style.title}>{t.overview.applicationStatus.title}</h2>
				<img
					className={style.icon}
					src={applicationsRunning === applicationsTotal ? '/icons/check.svg' : '/icons/cross.svg'}
					alt={
						applicationsRunning === applicationsTotal
							? t.overview.applicationStatus.successDescription
							: t.overview.applicationStatus.errorDescription
					}
				/>
				<p className={style.text}>
					{applicationsRunning === applicationsTotal
						? t.overview.applicationStatus.successDescription
						: t.overview.applicationStatus.errorDescription}
				</p>
				<p className={style.text}>
					{applicationsRunning}/{applicationsTotal} {t.overview.applicationStatus.activeApplications}
				</p>
			</div>
		</Widget>
	);
}

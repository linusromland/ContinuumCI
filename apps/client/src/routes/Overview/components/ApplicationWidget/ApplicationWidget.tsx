// Internal dependencies
import Widget from '../../../../components/Widget/Widget';
import style from './ApplicationWidget.module.scss';

export default function ApplicationWidget({
	applicationsRunning,
	applicationsTotal
}: {
	applicationsRunning: number;
	applicationsTotal: number;
}): JSX.Element {
	return (
		<Widget>
			<div className={style.main}>
				<h2 className={style.title}>Applications status</h2>
				<img
					className={style.icon}
					src={applicationsRunning === applicationsTotal ? '/icons/check.svg' : '/icons/cross.svg'}
					alt={
						applicationsRunning === applicationsTotal
							? 'Nothing to report.'
							: 'Some applications are not running.'
					}
				/>
				<p className={style.text}>
					{applicationsRunning === applicationsTotal
						? 'Everything operating normally!'
						: 'Some applications are not running.'}
				</p>
				<p className={style.text}>
					{applicationsRunning}/{applicationsTotal} applications active
				</p>
			</div>
		</Widget>
	);
}

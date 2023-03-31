// Internal dependencies
import style from './StatusWidget.module.scss';
import Widget from '../../../../components/Widget/Widget';

export default function StatusWidget({
	icon,
	text
}: {
	icon: string;
	text: string;
}) {
	return (
		<Widget>
			<div className={style.statusContainer}>
				<img
					className={style.icon}
					src={icon}
					alt='Status'
				/>
				<p>{text}</p>
			</div>
		</Widget>
	);
}

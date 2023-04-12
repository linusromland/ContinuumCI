// Internal dependencies
import style from './StatusWidget.module.scss';
import Widget from '../../../../components/Widget/Widget';

interface StatusWidgetProps {
	icon: string;
	text: string;
}

export default function StatusWidget({ icon, text }: StatusWidgetProps) {
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

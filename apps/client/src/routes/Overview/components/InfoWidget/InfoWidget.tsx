// Internal Dependencies
import Widget from '../../../../components/Widget/Widget';
import style from './InfoWidget.module.scss';

interface InfoWidgetProps {
	icon: string;
	value: string;
	label: string;
}

export default function InfoWidget({ icon, value, label }: InfoWidgetProps) {
	return (
		<Widget>
			<div className={style.container}>
				<img
					className={style.icon}
					src={icon}
					alt='icon'
				/>
				<div>
					<p className={style.value}>{value}</p>
					<p className={style.label}>{label}</p>
				</div>
			</div>
		</Widget>
	);
}

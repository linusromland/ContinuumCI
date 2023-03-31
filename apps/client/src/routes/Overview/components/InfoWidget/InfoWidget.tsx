// Internal Dependencies
import Widget from '../../../../components/Widget/Widget';
import style from './InfoWidget.module.scss';

export default function InfoWidget({
	icon,
	value,
	label
}: {
	icon: string;
	value: string;
	label: string;
}) {
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

// Internal dependencies
import style from './StatusWidget.module.scss';
import Widget from '../Widget/Widget';

interface StatusWidgetProps {
	icon: string;
	text: string;
	widget?: boolean;
}

export default function StatusWidget({ icon, text, widget = true }: StatusWidgetProps) {
	const Wrapper = widget ? Widget : 'div';

	return (
		<Wrapper>
			<div className={style.statusContainer}>
				<img
					className={style.icon}
					src={icon}
					alt='Status'
				/>
				<p>{text}</p>
			</div>
		</Wrapper>
	);
}

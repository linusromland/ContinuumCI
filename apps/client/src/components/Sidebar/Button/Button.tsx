// Internal Dependencies
import style from './Button.module.scss';
import cs from '../../../utils/classNames';

export default function Button({
	text,
	icon,
	selected = false,
	onClick
}: {
	text: string;
	icon: string;
	selected?: boolean;
	onClick: () => void;
}): JSX.Element {
	return (
		<button
			className={cs(style.button, selected ? style.selected : '')}
			onClick={onClick}
		>
			<img
				src={icon}
				alt={text}
			/>
			<p>{text}</p>
		</button>
	);
}

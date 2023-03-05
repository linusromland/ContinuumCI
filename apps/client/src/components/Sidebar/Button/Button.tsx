// Internal Dependencies
import style from './Button.module.scss';

export default function Button({
	text,
	icon,
	onClick
}: {
	text: string;
	icon: string;
	onClick: () => void;
}): JSX.Element {
	return (
		<button
			className={style.button}
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

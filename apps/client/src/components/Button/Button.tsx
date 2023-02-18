// Internal Dependencies
import style from './Button.module.scss';

export default function Button({
	onClick,
	disabled = false,
	text = 'Button'
}: {
	onClick: () => void;
	disabled?: boolean;
	text: string;
}): JSX.Element {
	return (
		<button
			className={style.button}
			onClick={() => {
				if (!disabled) onClick();
			}}
			disabled={disabled}
		>
			{text}
		</button>
	);
}

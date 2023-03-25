// External Dependencies
import clsx from 'clsx';

// Internal Dependencies
import style from './Button.module.scss';

export default function Button({
	onClick,
	disabled = false,
	text = 'Button',
	theme = 'primary',
	icon,
	small = false,
	className
}: {
	onClick: () => void;
	disabled?: boolean;
	text: string;
	theme?: string;
	icon?: string;
	small?: boolean;
	className?: string;
}): JSX.Element {
	return (
		<button
			className={clsx(
				style.button,
				className,
				small ? style.small : '',
				style[theme]
			)}
			onClick={() => {
				if (!disabled) onClick();
			}}
			disabled={disabled}
		>
			{icon && (
				<img
					className={style.icon}
					src={icon}
					alt={text}
				/>
			)}
			{text}
		</button>
	);
}

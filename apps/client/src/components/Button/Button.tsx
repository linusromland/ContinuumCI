// External Dependencies
import clsx from 'clsx';

// Internal Dependencies
import style from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	theme?: string;
	icon?: string;
	small?: boolean;
}

export default function Button({
	text = 'Button',
	theme = 'primary',
	icon,
	small = false,
	className,
	...props
}: ButtonProps): JSX.Element {
	return (
		<button
			className={clsx(
				className,
				style.button,
				small ? style.small : '',
				style[theme]
			)}
			{...props}
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

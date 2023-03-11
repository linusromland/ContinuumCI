// External Dependencies
import clsx from 'clsx';

// Internal Dependencies
import style from './Button.module.scss';

export default function Button({
	onClick,
	disabled = false,
	text = 'Button',
	small = false,
	className
}: {
	onClick: () => void;
	disabled?: boolean;
	text: string;
	small?: boolean;
	className?: string;
}): JSX.Element {
	return (
		<button
			className={clsx(style.button, className, small ? style.small : '')}
			onClick={() => {
				if (!disabled) onClick();
			}}
			disabled={disabled}
		>
			{text}
		</button>
	);
}

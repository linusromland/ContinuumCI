// Internal Dependencies
import style from './ButtonWrapper.module.scss';

interface ButtonWrapperProps {
	children: JSX.Element;
	text?: string;
}

export default function ButtonWrapper({ children, text }: ButtonWrapperProps): JSX.Element {
	return (
		<div className={style.buttonWrapper}>
			{text && <p className={style.text}>{text.toUpperCase()}</p>}
			{children}
		</div>
	);
}

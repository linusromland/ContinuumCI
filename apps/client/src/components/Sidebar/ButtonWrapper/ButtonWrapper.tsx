// Internal Dependencies
import style from './ButtonWrapper.module.scss';

export default function ButtonWrapper({
	children,
	text
}: {
	children: JSX.Element;
	text: string;
}): JSX.Element {
	return (
		<div className={style.buttonWrapper}>
			<p className={style.text}>{text.toUpperCase()}</p>
			{children}
		</div>
	);
}

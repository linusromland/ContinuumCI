// Internal dependencies
import style from './Widget.module.scss';

export default function Widget({
	children
}: {
	children: JSX.Element;
}): JSX.Element {
	return (
		<div className={style.widget}>
			<div className={style.content}>{children}</div>
		</div>
	);
}

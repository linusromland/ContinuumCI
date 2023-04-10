// Internal dependencies
import clsx from 'clsx';
import style from './Widget.module.scss';

export default function Widget({
	children,
	contentClass
}: {
	children: JSX.Element;
	contentClass?: string;
}): JSX.Element {
	return (
		<div className={style.widget}>
			<div className={clsx(style.content, contentClass)}>{children}</div>
		</div>
	);
}

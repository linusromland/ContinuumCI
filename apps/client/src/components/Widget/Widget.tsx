// Internal dependencies
import clsx from 'clsx';
import style from './Widget.module.scss';

interface WidgetProps {
	children: JSX.Element;
	contentClass?: string;
}

export default function Widget({ children, contentClass }: WidgetProps): JSX.Element {
	return (
		<div className={style.widget}>
			<div className={clsx(style.content, contentClass)}>{children}</div>
		</div>
	);
}

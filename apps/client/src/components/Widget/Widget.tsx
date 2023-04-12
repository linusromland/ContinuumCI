// Internal dependencies
import clsx from 'clsx';
import style from './Widget.module.scss';

interface WidgetProps {
	children: JSX.Element;
	contentClass?: string;
	minSize?: boolean;
}

export default function Widget({ children, contentClass, minSize = false }: WidgetProps): JSX.Element {
	return (
		<div className={clsx(style.widget, minSize ? style.minSize : '')}>
			<div className={clsx(style.content, contentClass)}>{children}</div>
		</div>
	);
}

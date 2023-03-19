// External dependencies
import clsx from 'clsx';

// Internal dependencies
import style from './StatusBar.module.scss';

export default function StatusBar({
	succeeded,
	warning,
	failed
}: {
	succeeded: number;
	warning: number;
	failed: number;
}): JSX.Element {
	return (
		<div className={style.statusBar}>
			<div
				className={clsx(style.succeededBar, style.bar)}
				style={{ width: `${succeeded}%` }}
			/>
			<div
				className={clsx(style.warningBar, style.bar)}
				style={{ width: `${warning}%` }}
			/>
			<div
				className={clsx(style.failedBar, style.bar)}
				style={{ width: `${failed}%` }}
			/>
		</div>
	);
}

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
				title={`Succeeded: ${succeeded}%`}
			/>
			<div
				className={clsx(style.warningBar, style.bar)}
				style={{ width: `${warning}%` }}
				title={`Warning: ${warning}%`}
			/>
			<div
				className={clsx(style.failedBar, style.bar)}
				style={{ width: `${failed}%` }}
				title={`Failed: ${failed}%`}
			/>
		</div>
	);
}

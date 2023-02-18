// Internal Dependencies
import style from './SetupLayout.module.scss';

export default function SetupLayout({
	title = 'ContinuumCI',
	children
}: {
	title: string;
	children: JSX.Element;
}): JSX.Element {
	return (
		<div className={style.main}>
			<div className={style.wrapper}>
				<div className={style.header}>
					<img
						src='/logo.svg'
						alt='ContinuumCI Logo'
						className={style.logo}
					/>
					<h1 className={style.title}>{title}</h1>
				</div>
				{children}
			</div>
		</div>
	);
}

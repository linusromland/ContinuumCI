// External dependencies
import clsx from 'clsx';

// Internal dependencies
import Widget from '../../../components/Widget/Widget';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import style from './Users.module.scss';

export default function Users(): JSX.Element {
	return (
		<div className={style.main}>
			<Breadcrumbs path={[{ name: 'Settings' }, { name: 'Users' }]} />

			<h1 className={style.title}>User Settings</h1>
			<Widget>
				<>
					<div className={style.container}>
						<h2 className={style.subtitle}>Users</h2>
					</div>
				</>
			</Widget>
		</div>
	);
}

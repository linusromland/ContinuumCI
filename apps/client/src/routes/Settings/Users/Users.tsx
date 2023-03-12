// Internal dependencies
import Widget from '../../../components/Widget/Widget';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Table from '../../../components/Table/Table';
import Button from '../../../components/Button/Button';
import style from './Users.module.scss';

export default function Users(): JSX.Element {
	return (
		<div className={style.main}>
			<Breadcrumbs path={[{ name: 'Settings' }, { name: 'Users' }]} />

			<h1 className={style.title}>User Settings</h1>
			<Widget>
				<div className={style.container}>
					<h2 className={style.subtitle}>Users</h2>
					<Table
						headers={[
							'Account Type',
							'Username',
							'E-mail',
							'Last Login',
							'Last IP',
							'Actions'
						]}
						data={[
							[
								'Root',
								'linusromland',
								'hello@linusromland.com',
								'2021-05-01 12:00:00',
								'208.19.23.23',
								<Button
									text='Edit'
									small
									secondary
									onClick={() => console.log('Edit user')}
								/>
							]
						]}
						widget={false}
					/>
				</div>
			</Widget>
		</div>
	);
}

// External dependencies
import { useState, useEffect } from 'react';

// Internal dependencies
import style from './AccessControlTable.module.scss';
import Button from '../../../../components/Button/Button';
import Table from '../../../../components/Table/Table';
import Widget from '../../../../components/Widget/Widget';
import { ProjectClass, UserClass } from 'shared/src/classes';
import { ProjectRoleEnum } from 'shared/src/enums';

export default function AccessControlTable({
	project
}: {
	project: ProjectClass;
}): JSX.Element {
	return (
		<>
			<Widget>
				<div className={style.container}>
					<div className={style.title}>
						<img
							src='/icons/containers_black.svg'
							alt='Enviroment Varisables'
						/>
						<h1>Enviroment Variables</h1>
					</div>
					<p className={style.text}>
						These values will be used in all containers of this
						project.
					</p>
					<Table
						headers={['Username', 'E-mail', 'Added on', 'Actions']}
						data={(project.permissions || []).map((user) => [
							(user.user as UserClass).username,
							(user.user as UserClass).email,
							<Button
								text='Remove'
								small
								theme='danger'
								onClick={() => {
									console.log('remove');
								}}
								disabled={user.role === ProjectRoleEnum.OWNER}
							/>
						])}
						widget={false}
					/>
					<Button
						text='Add new'
						theme='primary'
						onClick={() => {
							console.log('add new');
						}}
						small
					/>
				</div>
			</Widget>
		</>
	);
}

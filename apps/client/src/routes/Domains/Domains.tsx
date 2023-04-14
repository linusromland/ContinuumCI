// External dependencies
import { useEffect, useState } from 'react';

// Internal dependencies
import style from './Domains.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Loading } from '../../components/Loading/Loading';

export default function Domains() {
	if (false) return <Loading />;

	return (
		<main className={style.main}>
			<Breadcrumbs
				path={[
					{
						name: 'Domains',
						link: '/domains'
					}
				]}
			/>
			<div className={style.content}>
				<h1 className={style.title}>Domains</h1>
			</div>
		</main>
	);
}

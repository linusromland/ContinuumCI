// External Dependencies
import { Outlet } from 'react-router-dom';

// Internal Dependencies
import style from './MainLayout.module.scss';
import Sidebar from '../../Sidebar/Sidebar';

export default function MainLayout(): JSX.Element {
	return (
		<div className={style.mainLayout}>
			<Sidebar />
			<Outlet />
		</div>
	);
}

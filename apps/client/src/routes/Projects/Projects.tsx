// External dependencies
import { useEffect, useState } from 'react';

// Internal dependencies
import Button from '../../components/Button/Button';
import style from './Projects.module.scss';
import Header from './components/Header/Header';
import StatusBar from './components/StatusBar/StatusBar';
import { getAllProjects } from '../../utils/api/projects';
import { ProjectClass } from 'shared/src/classes';

export default function Projects() {
	const [projects, setProjects] = useState([] as ProjectClass[]);

	async function getProjects() {
		const response = await getAllProjects();
		if (response.success) {
			setProjects(projects);
		}
	}

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<main className={style.main}>
			<Header />
			<div className={style.container}>
				<div className={style.topBar}>
					<div className={style.statusBar}>
						<StatusBar
							succeeded={50}
							warning={25}
							failed={25}
						/>
					</div>
					<Button
						text='New project'
						onClick={() => {
							console.log('clicked');
						}}
					/>
				</div>
			</div>
		</main>
	);
}

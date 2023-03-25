// External dependencies
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal dependencies
import style from './Project.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { ProjectClass } from 'shared/src/classes';
import { getProject } from '../../utils/api/projects';
import Button from '../../components/Button/Button';

export default function Project() {
	const { projectId } = useParams();
	const navigate = useNavigate();

	const [project, setProject] = useState({} as ProjectClass);

	async function getData() {
		if (!projectId) return console.error('No projectId provided');

		const response = await getProject(projectId);
		if (response.success) {
			setProject(response.data as ProjectClass);
		} else {
			navigate('/projects');
			toast.error(response.message);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	if (!project) return <h1>Loading...</h1>;

	return (
		<main className={style.main}>
			<Breadcrumbs
				path={[
					{
						name: 'Projects',
						link: '/projects'
					},
					{
						name: project.name
					}
				]}
			/>
			<div className={style.content}>
				<h1 className={style.title}>Project details</h1>
				<div className={style.infoContainer}>
					<p>Name:</p>
					<p>{project.name}</p>
					<img
						className={style.editIcon}
						src='/icons/edit.svg'
						alt='Edit'
					/>
				</div>
				<div className={style.infoContainer}>
					<p>Git repository:</p>
					<a
						href={project.gitUrl}
						target='_blank'
					>
						{project.gitUrl}
					</a>
				</div>

				<div className={style.buttons}>
					<Button
						text='Sync'
						theme='success'
						icon='/icons/sync.svg'
						onClick={() => {
							console.log('Sync');
						}}
						small
					/>
					<Button
						text='Stop'
						theme='warning'
						icon='/icons/stop.svg'
						onClick={() => {
							console.log('Stop');
						}}
						small
					/>
					<Button
						text='Delete'
						theme='error'
						icon='/icons/delete.svg'
						onClick={() => {
							console.log('Delete');
						}}
						small
					/>
				</div>
			</div>
		</main>
	);
}

// External dependencies
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal dependencies
import style from './Project.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { ProjectClass } from 'shared/src/classes';
import { getProject } from '../../utils/api/projects';

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
		</main>
	);
}

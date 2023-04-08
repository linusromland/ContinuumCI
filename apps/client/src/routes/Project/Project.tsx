// External dependencies
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

// Internal dependencies
import style from './Project.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../components/Button/Button';
import StatusWidget from './components/StatusWidget/StatusWidget';
import EnviromentVariablesTable from './components/EnviromentVariablesTable/EnviromentVariablesTable';
import ContainersTable from './components/ContainersTable/ContainersTable';
import AccessControlTable from './components/AccessControlTable/AccessControlTable';
import TextEditModal from '../../components/TextEditModal/TextEditModal';
import { Loading } from '../../components/Loading/Loading';
import { ProjectDeploymentStatus, ProjectSyncStatus } from 'shared/src/enums';
import { ProjectClass } from 'shared/src/classes';
import { syncProject, editProject, getProject } from '../../utils/api/projects';
import { createDeployment, removeDeployment } from '../../utils/api/deployment';

export default function Project() {
	const { projectId } = useParams();
	const navigate = useNavigate();

	const [project, setProject] = useState({} as ProjectClass);
	const [editNameModalOpen, setEditNameModalOpen] = useState(false);
	const [deploymentIcon, setDeploymentIcon] = useState('');
	const [syncLoading, setSyncLoading] = useState(false);
	const [deploymentLoading, setDeploymentLoading] = useState(false);

	async function getData() {
		if (!projectId) return console.error('No projectId provided');

		const response = await getProject(projectId);
		if (response.success) {
			setProject(response.data as ProjectClass);

			const proj = response.data as ProjectClass;
			if (!proj.enabled) setDeploymentIcon('/icons/paused.svg');
			else {
				if (proj.deploymentStatus === ProjectDeploymentStatus.RUNNING) setDeploymentIcon('/icons/check.svg');
				else if (project.deploymentStatus === ProjectDeploymentStatus.PARTIALLY_RUNNING)
					setDeploymentIcon('/icons/warning.svg');
				else setDeploymentIcon('/icons/cross.svg');
			}
		} else {
			navigate('/projects');
			toast.error(response.message);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	if (!project || !deploymentIcon) return <Loading />;

	return (
		<>
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
						<button
							className={style.editIcon}
							onClick={() => setEditNameModalOpen(true)}
						>
							<img
								src='/icons/edit.svg'
								alt='Edit'
							/>
						</button>
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
							onClick={async () => {
								setSyncLoading(true);
								const response = await syncProject(project._id);
								if (response.success) {
									toast.success('Project synced');
									getData();
								} else toast.error(response.message);
								setSyncLoading(false);
							}}
							loading={syncLoading}
							small
						/>
						<Button
							text={project.enabled ? 'Stop' : 'Start'}
							theme={project.enabled ? 'warning' : 'success'}
							icon={
								deploymentLoading
									? '/icons/sync.svg'
									: project.enabled
									? '/icons/stop.svg'
									: '/icons/play.svg'
							}
							onClick={async () => {
								setDeploymentLoading(true);
								const response = project.enabled
									? await removeDeployment(project._id)
									: await createDeployment(project._id);
								if (response.success) {
									toast.success('Deployment ' + (project.enabled ? 'stopped' : 'started'));
									getData();
								} else toast.error(response.message);
								setDeploymentLoading(false);
							}}
							loading={deploymentLoading}
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
					<div className={style.statusContainer}>
						<StatusWidget
							icon={deploymentIcon}
							text={project.enabled ? project.deploymentStatus : 'Manual stop'}
						/>
						<StatusWidget
							icon={
								project.syncStatus === ProjectSyncStatus.IN_SYNC
									? '/icons/check.svg'
									: '/icons/warning.svg'
							}
							text={project.syncStatus || ProjectSyncStatus.UNKNOWN}
						/>
					</div>
					<div className={style.tables}>
						<EnviromentVariablesTable project={project} />
						<ContainersTable projectId={projectId || ''} />
						<AccessControlTable project={project} />
					</div>
				</div>
			</main>
			<TextEditModal
				onClose={() => setEditNameModalOpen(false)}
				open={editNameModalOpen}
				title='Edit project name'
				fieldName='name'
				initialValues={{
					name: project.name
				}}
				validationSchema={yup.object({
					name: yup.string().required('Required')
				})}
				submit={async (values) => {
					const response = await editProject(
						{
							name: values.name,
							permissions: project.permissions
						},
						project._id as string
					);

					if (response.success) {
						setProject(response.data as ProjectClass);
						setEditNameModalOpen(false);
						getData();
						toast.success('Project name updated');
					} else {
						toast.error(response.message);
					}
				}}
			/>
		</>
	);
}

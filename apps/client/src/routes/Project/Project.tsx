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
import { ProjectClass, UserClass } from 'shared/src/classes';
import { syncProject, editProject, getProject, deleteProject, regenerateCdToken } from '../../utils/api/projects';
import { createDeployment, removeDeployment } from '../../utils/api/deployment';
import useTranslations from '../../i18n/translations';
import ContinuousDeployment from './components/ContinuousDeployment/ContinuousDeployment';

export default function Project() {
	const t = useTranslations();
	const { projectId } = useParams();
	const navigate = useNavigate();

	const [project, setProject] = useState({} as ProjectClass);
	const [editNameModalOpen, setEditNameModalOpen] = useState(false);
	const [deploymentIcon, setDeploymentIcon] = useState('');
	const [syncLoading, setSyncLoading] = useState(false);
	const [deploymentLoading, setDeploymentLoading] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

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
			toast.error(t.project.notFound);
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
							name: t.sidebar.deployments.projects,
							link: '/projects'
						},
						{
							name: project.name
						}
					]}
				/>
				<div className={style.content}>
					<h1 className={style.title}>{t.project.projectDetails}</h1>
					<div className={style.infoContainer}>
						<p>{t.project.name}:</p>
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
						<p>{t.projects.newProject.repositoryUrl}:</p>
						<a
							href={project.gitUrl}
							target='_blank'
						>
							{project.gitUrl}
						</a>
					</div>

					<div className={style.buttons}>
						<Button
							text={t.project.sync}
							theme='success'
							icon='/icons/sync.svg'
							onClick={async () => {
								setSyncLoading(true);
								const response = await syncProject(project._id);
								if (response.success) {
									if (response.message == 'alreadyInSync') toast.info(t.project.alreadyInSync);
									else toast.success(t.project.syncSuccess);
									getData();
								} else toast.error(t.project.syncError);
								setSyncLoading(false);
							}}
							loading={syncLoading}
							small
						/>
						<Button
							text={project.enabled ? t.project.stop : t.project.start}
							theme={project.enabled ? 'warning' : 'success'}
							icon={project.enabled ? '/icons/stop.svg' : '/icons/play.svg'}
							onClick={async () => {
								setDeploymentLoading(true);
								const response = project.enabled
									? await removeDeployment(project._id)
									: await createDeployment(project._id);
								if (response.success) {
									toast.success(
										`
										${t.projects.header.title}
										${project.name} 
										${project.enabled ? t.project.stopped : t.project.started}
										`
									);
									getData();
								} else toast.error(project.enabled ? t.project.stopError : t.project.startError);
								setDeploymentLoading(false);
							}}
							loading={deploymentLoading}
							small
						/>
						<Button
							text={confirmDelete ? t.project.confirmRemove : t.project.remove}
							theme='error'
							icon='/icons/delete.svg'
							onClick={async () => {
								if (!confirmDelete) return setConfirmDelete(true);

								const response = await deleteProject(project._id);

								if (response.success) {
									toast.success(t.project.removeSuccess);
									navigate('/projects');
								} else toast.error(t.project.removeError);
							}}
							small
						/>
					</div>
					<div className={style.statusContainer}>
						<StatusWidget
							icon={deploymentIcon}
							text={
								project.enabled
									? t.projects.projectCard.status[project.deploymentStatus.toString()]
									: t.project.manualStop
							}
						/>
						<StatusWidget
							icon={
								project.syncStatus === ProjectSyncStatus.IN_SYNC
									? '/icons/check.svg'
									: '/icons/warning.svg'
							}
							text={t.projects.projectCard.syncStatus[project.syncStatus || ProjectSyncStatus.UNKNOWN]}
						/>
					</div>
					<div className={style.tables}>
						<EnviromentVariablesTable project={project} />
						<ContainersTable projectId={projectId || ''} />
						<AccessControlTable
							project={project}
							submit={async (values, remove) => {
								if (remove) {
									const response = await editProject(
										{
											name: project.name,
											permissions: project.permissions
												.filter((user) => (user.user as UserClass)._id !== values.user)
												.map((user) => ({
													user: (user.user as UserClass)._id,
													role: user.role
												}))
										},
										project._id
									);

									if (response.success) {
										toast.success(t.addUserModal.removeSuccess);
										getData();
									} else {
										toast.error(t.addUserModal.removeError);
									}
									return;
								}

								const response = await editProject(
									{
										name: project.name,
										permissions: [
											...project.permissions.map((user) => ({
												user: (user.user as UserClass)._id,
												role: user.role
											})),
											{
												user: values.user,
												role: values.role
											}
										]
									},
									project._id
								);

								if (response.success) {
									toast.success(t.addUserModal.addSuccess);
									getData();
								} else {
									toast.error(t.addUserModal.addError);
								}
							}}
						/>
						<ContinuousDeployment
							token={project.cdToken as string}
							regenerateToken={async () => {
								const response = await regenerateCdToken(project._id);

								if (response.success) {
									toast.success(t.continuousDeployment.regenerateSuccess);
									getData();
								} else {
									toast.error(t.continuousDeployment.regenerateError);
								}
							}}
						/>
					</div>
				</div>
			</main>
			<TextEditModal
				onClose={() => setEditNameModalOpen(false)}
				open={editNameModalOpen}
				title={t.project.editNameTitle}
				fieldName={t.project.name.toLowerCase()}
				initialValues={{
					name: project.name
				}}
				validationSchema={yup.object({
					name: yup.string().required(t.project.nameRequired)
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
						toast.success(t.project.projectNameSuccess);
					} else {
						toast.error(t.project.projectNameError);
					}
				}}
			/>
		</>
	);
}

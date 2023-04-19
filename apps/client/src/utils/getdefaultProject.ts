// Internal dependencies
import { ProjectClass } from 'shared/src/classes';
import { ProjectDeploymentStatus, ProjectSyncStatus } from 'shared/src/enums';

const defaultProject: ProjectClass = {
	_id: 'default',
	name: 'ContinuumCI',
	gitUrl: '',
	enabled: true,
	services: [
		{
			name: 'continuumci',
			containerPorts: [8080],
			ports: [8080]
		}
	],
	branch: '',
	syncStatus: ProjectSyncStatus.IN_SYNC,
	deploymentStatus: ProjectDeploymentStatus.RUNNING,
	permissions: [],
	createdAt: new Date(),
	updatedAt: new Date()
};

export default defaultProject as ProjectClass;

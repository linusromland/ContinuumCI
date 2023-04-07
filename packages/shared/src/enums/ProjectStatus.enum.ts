enum ProjectSyncStatus {
	UNKNOWN = 'Unknown Sync Status',
	IN_SYNC = 'In Sync',
	OUT_OF_SYNC = 'Out of Sync'
}

enum ProjectDeploymentStatus {
	UNKNOWN = 'Unknown Deployment Status',
	RUNNING = 'Running',
	NOT_RUNNING = 'Not Running',
	RESTARTING = 'Restarting',
	CRASHED = 'Crashed',
	PARTIALLY_RUNNING = 'Partially Running'
}

export { ProjectSyncStatus, ProjectDeploymentStatus };

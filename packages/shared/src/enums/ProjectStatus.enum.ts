enum ProjectSyncStatus {
	UNKNOWN = 'unknown',
	IN_SYNC = 'inSync',
	OUT_OF_SYNC = 'outOfSync'
}

enum ProjectDeploymentStatus {
	UNKNOWN = 'unknown',
	RUNNING = 'running',
	NOT_RUNNING = 'notRunning',
	RESTARTING = 'restarting',
	CRASHED = 'crashed',
	PARTIALLY_RUNNING = 'partiallyRunning'
}

export { ProjectSyncStatus, ProjectDeploymentStatus };

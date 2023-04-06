// External Dependencies
import simpleGit from 'simple-git';
import { REPOSITORIES_DIRECTORY } from './env';

async function checkSync(projectId: string): Promise<boolean> {
	const git = simpleGit(`${REPOSITORIES_DIRECTORY}/${projectId}`);
	const status = await git.status();
	return status.isClean();
}

export default checkSync;

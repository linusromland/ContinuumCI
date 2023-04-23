// External Dependencies
import simpleGit from 'simple-git';
import { REPOSITORIES_DIRECTORY } from './env';

async function checkSync(projectId: string): Promise<boolean> {
	try {
		const git = simpleGit(`${REPOSITORIES_DIRECTORY}/${projectId}`);
		await git.fetch();
		const status = await git.status();
		return status.behind == 0;
	} catch (error) {
		console.log(error);
		return false;
	}
}

export default checkSync;

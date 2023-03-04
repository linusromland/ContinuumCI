// External dependencies
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import simpleGit from 'simple-git';

// Internal dependencies
import { ProjectClass } from 'shared/src/classes';
import { REPOSITORIES_DIRECTORY } from 'src/utils/env';

@Injectable()
export class ProjectsService {
	constructor(
		@Inject('PROJECT_MODEL')
		private ProjectModel: Model<ProjectClass>
	) {}

	async create(project: ProjectClass): Promise<ProjectClass> {
		const createdProject = new this.ProjectModel(project);

		// Clone the Git repository
		const git = simpleGit();
		await git.clone(
			createdProject.gitUrl,
			`${REPOSITORIES_DIRECTORY}/${createdProject._id}`
		);

		return createdProject.save();
	}
}

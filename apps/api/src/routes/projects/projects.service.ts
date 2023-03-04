// External dependencies
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

// Internal dependencies
import { ProjectClass } from 'shared/src/classes';

@Injectable()
export class ProjectsService {
	constructor(
		@Inject('PROJECT_MODEL')
		private ProjectModel: Model<ProjectClass>
	) {}

	async create(project: ProjectClass): Promise<ProjectClass> {
		const createdProject = new this.ProjectModel(project);

		return createdProject.save();
	}
}

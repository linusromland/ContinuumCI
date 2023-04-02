// External dependencies
import { Matches } from 'class-validator';

export class DeploymentQueryClass {
	@Matches(/^[0-9a-fA-F]{24}$/)
	project: string;
}

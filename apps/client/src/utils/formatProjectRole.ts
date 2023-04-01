// Internal dependencies
import { ProjectRoleEnum } from 'shared/src/enums';

function formatProjectRole(role: ProjectRoleEnum) {
	switch (role) {
		case ProjectRoleEnum.OWNER:
			return 'Owner';

		case ProjectRoleEnum.DEVELOPER:
			return 'Developer';

		case ProjectRoleEnum.VIEWER:
			return 'Viewer';

		default:
			return 'Unknown';
	}
}

export default formatProjectRole;

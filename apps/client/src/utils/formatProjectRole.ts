// Internal dependencies
import { ProjectRoleEnum } from 'shared/src/enums';

function formatProjectRole(role: ProjectRoleEnum) {
	switch (role) {
		case ProjectRoleEnum.OWNER:
			return 'owner';

		case ProjectRoleEnum.DEVELOPER:
			return 'developer';

		case ProjectRoleEnum.VIEWER:
			return 'viewer';

		default:
			return 'unknown';
	}
}

export default formatProjectRole;

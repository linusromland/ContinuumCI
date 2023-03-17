// Internal dependencies
import { UserRoleEnum } from 'shared/src/enums';

function formatRole(role: UserRoleEnum) {
	switch (role) {
		case UserRoleEnum.ROOT:
			return 'Root';

		case UserRoleEnum.ADMIN:
			return 'Admin';

		case UserRoleEnum.USER:
			return 'User';

		default:
			return 'Unknown';
	}
}

export default formatRole;

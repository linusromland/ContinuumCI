// Internal dependencies
import { UserRoleEnum } from 'shared/src/enums';
import { TranslationKeys } from '../i18n/locales/locale.type';

function formatRole(role: UserRoleEnum, t: TranslationKeys) {
	switch (role) {
		case UserRoleEnum.ROOT:
			return t.changeRoleModal.root;

		case UserRoleEnum.ADMIN:
			return t.changeRoleModal.admin;

		case UserRoleEnum.USER:
			return t.changeRoleModal.user;

		default:
			return t.changeRoleModal.unknown;
	}
}

export default formatRole;

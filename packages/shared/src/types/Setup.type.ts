// Internal dependencies
import { ResponseType } from '.';

type SetupType = {
	status: 'complete' | 'incomplete';
	emailConfiguration: boolean;
	rootUser: boolean;
};

type SetupResponseType = SetupType & ResponseType;

export { SetupResponseType, SetupType };

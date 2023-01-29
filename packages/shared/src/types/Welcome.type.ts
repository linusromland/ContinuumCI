// Internal dependencies
import { ResponseType } from './';

type WelcomeType = {
	firstTimeSetup: boolean;
};

type WelcomeResponseType = WelcomeType & ResponseType;

export default WelcomeResponseType;

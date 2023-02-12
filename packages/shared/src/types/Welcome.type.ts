// Internal dependencies
import { ResponseType } from './';

// eslint-disable-next-line @typescript-eslint/ban-types
type WelcomeType = {};

type WelcomeResponseType = WelcomeType & ResponseType;

export { WelcomeResponseType, WelcomeType };

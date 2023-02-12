// Internal dependencies
import { ResponseType } from './';

type NginxConfigurationType = {
	_id?: string;
	localIps: string;
	sitesEnabledLocation: string;
	accessLogLocation: string;
	domains: {
		name: string;
	}[];
};

type NginxConfigurationResponseType = NginxConfigurationType & ResponseType;

export { NginxConfigurationResponseType, NginxConfigurationType };

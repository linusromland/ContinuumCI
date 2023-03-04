type NginxConfigurationType = {
	_id?: string;
	localIps: string;
	sitesEnabledLocation: string;
	accessLogLocation: string;
	domains: {
		name: string;
	}[];
};

export { NginxConfigurationType };

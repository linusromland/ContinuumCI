type NginxDeploymentType = {
	_id?: string;
	server_name: string;
	locations: {
		location: string;
		proxy_pass: string;
		websocket: boolean;
		internal: boolean;
	}[];
	ssl: boolean;
};

export { NginxDeploymentType };

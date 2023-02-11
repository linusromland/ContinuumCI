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

type NginxDeploymentResponseType = {
	success: boolean;
	message: string;
	data?: NginxDeploymentType[];
}

export { NginxDeploymentResponseType, NginxDeploymentType };

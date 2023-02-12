type NginxLogsType = {
	_id: string;
	remote_address: string;
	remote_user?: string;
	time_local: string;
	request_method: string;
	request_url: string;
	request_protocol: string;
	status: number;
	body_bytes_sent: number;
	http_referer: string;
	http_user_agent?: string;
	http_x_forwarded_for?: string;
	createdAt: Date;
	updateAt: Date;
};

export { NginxLogsType };

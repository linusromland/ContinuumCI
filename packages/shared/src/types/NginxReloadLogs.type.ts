type NginxReloadLogsType = {
	_id?: string;
	success: boolean;
	message?: string;
	logs: string;
	createdAt?: Date;
	updateAt?: Date;
};

export { NginxReloadLogsType };

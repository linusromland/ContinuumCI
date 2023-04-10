type ContainerType = {
	id: string;
	name: string;
	state: string;
	created: number;
};

type ContainerTypeWithLogs = ContainerType & {
	logs: string;
};

export { ContainerType, ContainerTypeWithLogs };

interface ResponseType<T = undefined> {
	message: string;
	success: boolean;
	data?: T;
}

export { ResponseType };

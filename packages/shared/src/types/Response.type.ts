interface ResponseType<T = unknown> {
	message: string;
	success: boolean;
	data?: T;
}

export { ResponseType };

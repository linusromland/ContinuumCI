// External dependencies
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

// Internal dependencies
import { NGINX_API_URL } from 'src/utils/env';
import { NginxLogsType, ResponseType } from 'shared/src/types';

@Injectable()
export class LogsService {
	async get() {
		const request = await axios.get(`${NGINX_API_URL}/logs`, {
			validateStatus: () => true
		});

		if (request.status == 500) {
			throw new InternalServerErrorException(request.data);
		}

		if (!request.data.success) {
			throw new BadRequestException(request.data);
		}

		return request.data as ResponseType<NginxLogsType[]>;
	}
}

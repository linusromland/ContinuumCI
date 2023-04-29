// External dependencies
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

// Internal dependencies
import { ResponseType } from 'shared/src/types';
import { NGINX_API_URL } from 'src/utils/env';

@Injectable()
export class HealthService {
	async healthCheck(): Promise<ResponseType> {
		const request = await axios.get(
			`${NGINX_API_URL}/health`,

			{
				validateStatus: () => true
			}
		);

		const data = request.data as ResponseType;

		if (!data || !data.success) {
			throw new BadRequestException({
				success: false,
				message: 'Api is running but nginx api is not'
			});
		}

		return {
			success: true,
			message: 'API is running'
		};
	}
}

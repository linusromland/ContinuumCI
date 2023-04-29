// External dependencies
import { Injectable } from '@nestjs/common';

// Internal dependencies
import { ResponseType } from 'shared/src/types';

@Injectable()
export class HealthService {
	healthCheck(): ResponseType {
		return {
			success: true,
			message: 'API is running'
		};
	}
}

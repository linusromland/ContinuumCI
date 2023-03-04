// External dependencies
import { Injectable } from '@nestjs/common';

// Internal dependencies
import { ResponseType } from 'shared/src/types';

@Injectable()
export class WelcomeService {
	getWelcomeMessage(): ResponseType {
		return {
			success: true,
			message: 'ContinuumCI API'
		};
	}
}

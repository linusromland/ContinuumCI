// External dependencies
import { Injectable } from '@nestjs/common';

// Internal dependencies
import { WelcomeResponseType } from 'shared/src/types';

@Injectable()
export class WelcomeService {
	getWelcomeMessage(): WelcomeResponseType {
		return {
			success: true,
			message: 'ContinuumCI API',
			firstTimeSetup: true
		};
	}
}

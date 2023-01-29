// External dependencies
import { ApiProperty } from '@nestjs/swagger';

// Internal dependencies
import { WelcomeResponseType } from 'shared/src/types';

export class WelcomeEntity implements WelcomeResponseType {
	@ApiProperty()
	success: WelcomeResponseType['success'];

	@ApiProperty()
	message: WelcomeResponseType['message'];

	@ApiProperty()
	firstTimeSetup: WelcomeResponseType['firstTimeSetup'];
}

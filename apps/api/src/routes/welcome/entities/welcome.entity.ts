// External dependencies
import { ApiProperty } from '@nestjs/swagger';

// Internal dependencies
import { WelcomeType } from 'shared/src/types';

export class WelcomeEntity implements WelcomeType {
	@ApiProperty()
	message: WelcomeType['message'];

	@ApiProperty()
	firstTimeSetup: WelcomeType['firstTimeSetup'];
}

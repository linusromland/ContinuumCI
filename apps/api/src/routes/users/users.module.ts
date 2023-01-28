// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { UsersService } from './users.service';

@Module({
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}

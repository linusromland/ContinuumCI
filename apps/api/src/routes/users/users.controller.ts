// External dependencies
import { Controller, Request, Post } from '@nestjs/common';

// Internal dependencies
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post('create')
	getProfile(@Request() req) {
		return this.usersService.create(req.body);
	}
}

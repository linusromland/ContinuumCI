// External dependencies
import { Controller, Request, Post, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

// Internal dependencies
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post('create')
	getProfile(@Request() req) {
		return this.usersService.create(req.body);
	}

	@UseGuards(JwtAuthGuard)
	@Put('edit/username')
	updateUsername(@Request() req) {
		return this.usersService.updateUsername(req.user, req.body.username);
	}
}

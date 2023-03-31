// External dependencies
import { Controller, Request, Get, Post, Put } from '@nestjs/common';
import { Body, Param, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

// Internal dependencies
import { UsersService } from './users.service';
import { UserClass } from 'shared/src/classes';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post('create')
	createUser(@Body() user: UserClass) {
		return this.usersService.create(user);
	}

	@Get('verify/:verificationId')
	verifyUser(@Param('verificationId') verificationId: string) {
		return this.usersService.verifyUser(verificationId);
	}

	@UseGuards(JwtAuthGuard)
	@Get('all')
	getUsers(@Request() req) {
		return this.usersService.getUsers(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Put('edit/username')
	updateUsername(@Request() req) {
		return this.usersService.updateUsername(req.user, req.body.username);
	}

	@UseGuards(JwtAuthGuard)
	@Put('edit/email')
	updateEmail(@Request() req) {
		return this.usersService.updateEmail(req.user, req.body.email);
	}

	@UseGuards(JwtAuthGuard)
	@Put('edit/password')
	updatePassword(@Request() req) {
		return this.usersService.updatePassword(
			req.user,
			req.body.oldPassword,
			req.body.newPassword
		);
	}

	@UseGuards(JwtAuthGuard)
	@Put('edit/role')
	updateRole(@Request() req) {
		return this.usersService.updateRole(
			req.user,
			req.body.userId,
			req.body.role
		);
	}
}

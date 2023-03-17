// External dependencies
import { Controller, Post, ValidationPipe } from '@nestjs/common';
import {
	Body,
	Request,
	Param,
	Get,
	UseGuards,
	UsePipes,
	Delete
} from '@nestjs/common/decorators';
import { DomainsClass } from 'shared/src/classes';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

// Internal dependencies
import { DomainsService } from './domains.service';

@Controller('domains')
export class DomainsController {
	constructor(private domainsService: DomainsService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getDomains(@Request() req) {
		return this.domainsService.get(req.user.sub);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	createDomain(@Request() req, @Body() project: DomainsClass) {
		return this.domainsService.create(req.user.sub, project);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:domainId')
	deleteDomain(@Request() req, @Param('domainId') domainId: string) {
		return this.domainsService.delete(req.user.sub, domainId);
	}
}

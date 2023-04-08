import { BadRequestException, Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';

// Internal dependencies
import { NginxDeploymentType } from 'shared/src/types';
import argumentValidator from 'src/utils/argumentValidator';
import { DeploymentsService } from './deployments.service';

@Controller('deployments')
export class DeploymentsController {
	constructor(private readonly deploymentsService: DeploymentsService) {}

	@Post()
	async create(@Body() deploymentConfiguration: NginxDeploymentType) {
		try {
			argumentValidator(
				[
					{
						argument: 'server_name',
						type: 'string',
						required: true
					},
					{
						argument: 'locations',
						type: 'object',
						required: true,
						array: true
					},
					{
						argument: 'ssl',
						type: 'boolean',
						required: true
					}
				],
				deploymentConfiguration
			);

			for (const location of deploymentConfiguration.locations) {
				argumentValidator(
					[
						{
							argument: 'location',
							type: 'string',
							required: true
						},
						{
							argument: 'proxy_pass',
							type: 'string',
							required: true
						},
						{
							argument: 'websocket',
							type: 'boolean',
							required: true
						},
						{
							argument: 'internal',
							type: 'boolean',
							required: true
						}
					],
					location
				);
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			throw new BadRequestException({
				success: false,
				message: error.message
			});
		}

		return this.deploymentsService.create(deploymentConfiguration);
	}

	@Get()
	async get(@Query('id') id: string) {
		if (!id)
			throw new BadRequestException({
				success: false,
				message: 'No id provided'
			});

		const ids = Array.isArray(id) ? id : [id];
		return this.deploymentsService.get(ids);
	}

	@Delete()
	async delete(@Query('id') id: string) {
		return this.deploymentsService.delete(id);
	}
}

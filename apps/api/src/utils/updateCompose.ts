// External Dependencies
import fs from 'fs';
import { Model } from 'mongoose';
import yaml from 'js-yaml';
import http from 'http';

// Internal Dependencies
import { REPOSITORIES_DIRECTORY } from './env';
import { ProjectClass } from 'shared/src/classes';

async function updateCompose(project: ProjectClass, ProjectModel: Model<ProjectClass>): Promise<boolean> {
	try {
		const COMPOSE_FILE_LOCATION = `${REPOSITORIES_DIRECTORY}/${project._id}/docker-compose.yml`;

		// Read in the docker-compose.yml file
		const fileContents = fs.readFileSync(COMPOSE_FILE_LOCATION, 'utf8');

		// Parse the YAML into a JavaScript object
		const dockerCompose = yaml.load(fileContents);

		const services = Object.keys(dockerCompose.services);

		// Update the services in db
		project.services = services.map((service) => ({
			name: service,
			ports: []
		}));

		// Loop through each service in the docker-compose file
		for (let i = 0; i < services.length; i++) {
			const service = dockerCompose.services[services[i]];

			// Add label to the service to identify it
			dockerCompose.services[services[i]].labels = [
				...(dockerCompose.services[services[i]].labels || []),
				`continuumci.project.id=${project._id}`
			];

			if (service.ports && service.ports.length) {
				// Loop through each port mapping
				for (let j = 0; j < service.ports.length; j++) {
					const ports = service.ports[j].split(':');

					if (project.services[i].ports[j]) {
						ports[0] = project.services[i].ports[j];
					} else {
						// Generate a unique port
						ports[0] = await generateUniquePort(project, i, j, ProjectModel);
					}

					// Update the port mapping
					dockerCompose.services[services[i]].ports[j] = ports.join(':');
				}
			}
		}

		// Convert the JavaScript object back to YAML
		const updatedFileContents = yaml.dump(dockerCompose);

		// Write the updated YAML back out to disk
		fs.writeFileSync(COMPOSE_FILE_LOCATION, updatedFileContents);

		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}

function generateUniquePort(
	project: ProjectClass,
	serviceIndex: number,
	portIndex: number,
	ProjectModel: Model<ProjectClass>
): Promise<string> {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve) => {
		// Generate a random port number between 3000 and 10000
		const port = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;

		const portTaken = await ProjectModel.aggregate([
			{
				$lookup: {
					from: 'ports',
					localField: 'services.ports',
					foreignField: 'port',
					as: 'usedPorts'
				}
			},
			{
				$project: {
					_id: 0,
					usedPorts: '$usedPorts.port'
				}
			},
			{
				$group: {
					_id: null,
					usedPorts: {
						$push: '$usedPorts'
					}
				}
			},
			{
				$lookup: {
					from: 'ports',
					let: { usedPorts: '$usedPorts' },
					pipeline: [
						{
							$match: {
								$expr: {
									$or: [{ $in: [port, '$$usedPorts'] }, { $eq: ['$port', port] }]
								}
							}
						},
						{
							$project: {
								_id: 0,
								port: 1
							}
						}
					],
					as: 'ports'
				}
			},
			{
				$project: {
					result: {
						$cond: {
							if: { $gt: [{ $size: '$ports' }, 0] },
							then: true,
							else: false
						}
					}
				}
			}
		]);

		if (portTaken.length && portTaken[0].result) {
			// If the port is already taken, generate a new one
			generateUniquePort(project, serviceIndex, portIndex, ProjectModel).then(resolve);
		}

		// Try to create a server on the port
		const server = http.createServer();

		server.on('error', () => {
			// If an error occurs, the port is not available
			// Generate a new random port and try again
			generateUniquePort(project, serviceIndex, portIndex, ProjectModel).then(resolve);
		});

		server.on('listening', () => {
			// If we successfully start listening on the port, immediately close the server
			server.close(async () => {
				// The port is available, save it to the database
				project.services[serviceIndex].ports[portIndex] = port;

				await ProjectModel.findByIdAndUpdate(project._id, project);

				// Return the port
				resolve(String(port));
			});
		});

		server.listen(port);
	});
}

export default updateCompose;

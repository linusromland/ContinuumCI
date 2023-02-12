// External dependencies
import fs from 'fs';
import path from 'path';

// Internal dependencies
import { NginxDeploymentType } from 'shared/src/types';

const templateDir = `../templates`;

const baseTemplate = fs.readFileSync(
	path.resolve(__dirname, `${templateDir}/base`),
	'utf8'
);
const externalLocationTemplate = fs.readFileSync(
	path.resolve(__dirname, `${templateDir}/externalLocation`),
	'utf8'
);
const externalWebsocketLocationTemplate = fs.readFileSync(
	path.resolve(__dirname, `${templateDir}/externalWebsocketLocation`),
	'utf8'
);
const internalLocationTemplate = fs.readFileSync(
	path.resolve(__dirname, `${templateDir}/internalLocation`),
	'utf8'
);
const internalWebsocketLocationTemplate = fs.readFileSync(
	path.resolve(__dirname, `${templateDir}/internalWebsocketLocation`),
	'utf8'
);

const template = (deployment: NginxDeploymentType, localIps): string => {
	const { server_name, locations, ssl } = deployment;

	if (ssl) console.log('SSL is not implemented yet');

	let templateContent = baseTemplate.replace('{{server_name}}', server_name);

	//Loop to replace all {{url}} with server_name (because there are two {{url}} in the template for www and non-www)
	for (let i = 0; i < 1; i++) {
		templateContent = templateContent.replace('{{url}}', server_name);
	}

	let locationContent = '';

	for (const location of locations) {
		let locationTemplate = location.internal
			? location.websocket
				? internalWebsocketLocationTemplate
				: internalLocationTemplate
			: location.websocket
			? externalWebsocketLocationTemplate
			: externalLocationTemplate;

		locationTemplate = locationTemplate.replace(
			'{{location}}',
			location.location
		);
		locationTemplate = locationTemplate.replace(
			'{{proxy_pass}}',
			location.proxy_pass
		);

		if (location.internal) {
			locationTemplate = locationTemplate.replace(
				'{{internal_ips}}',
				localIps
			);
		}

		locationContent += locationTemplate;
	}

	templateContent = templateContent.replace('{{locations}}', locationContent);

	return templateContent;
};

export default template;

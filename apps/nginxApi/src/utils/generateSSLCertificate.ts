// External dependencies
import { BadRequestException } from '@nestjs/common';
import { exec } from 'child_process';
import { Logger } from '@nestjs/common/services';

const generateSSLCertificate = async (domain: string, email: string) => {
	const logger = new Logger('generateSSLCertificate');

	try {
		logger.log(`Generating SSL certificate for ${domain} with email ${email}`);

		const result = await new Promise<boolean>((resolve, reject) => {
			// Generate a new SSL certificate with Certbot
			exec(
				`certbot --nginx -d ${domain} -d www.${domain} --agree-tos --no-eff-email --non-interactive --email ${email}`,
				(error, _, stderr) => {
					if (error) {
						reject(false);
					}
					if (stderr) {
						reject(false);
					}
					resolve(true);
				}
			);
		});

		//
		if (!result) {
			logger.error(`Couldn't generate SSL certificate for ${domain} with email ${email}`);

			throw new BadRequestException({
				success: false,
				message: "Couldn't generate SSL certificate"
			});
		}

		return new Promise<boolean>((resolve, reject) => {
			// Automatically renew the SSL certificate before it expires
			exec(
				`certbot renew --nginx --agree-tos --no-eff-email --non-interactive --email ${email}`,
				(error, _, stderr) => {
					if (error) {
						reject(false);
					}
					if (stderr) {
						reject(false);
					}
					resolve(true);
				}
			);
		});
	} catch (_) {
		return false;
	}
};

export default generateSSLCertificate;

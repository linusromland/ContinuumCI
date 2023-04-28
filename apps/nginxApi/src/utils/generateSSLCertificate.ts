// External dependencies
import { BadRequestException } from '@nestjs/common';
import { exec } from 'child_process';

const generateSSLCertificate = async (domain: string, email: string) => {
	try {
		const result = await new Promise<boolean>((resolve, reject) => {
			// Generate a new SSL certificate with Certbot
			exec(
				`certbot --nginx -d ${domain} -d www.${domain} --agree-tos --no-eff-email --non-interactive --email ${email}`,
				(error, stdout, stderr) => {
					if (error) {
						console.log(error);
						reject(false);
					}
					if (stderr) {
						console.log(stderr);
						reject(false);
					}
					console.log(stdout);
					resolve(true);
				}
			);
		});

		//
		if (!result) {
			throw new BadRequestException({
				success: false,
				message: "Couldn't generate SSL certificate"
			});
		}

		return new Promise<boolean>((resolve, reject) => {
			// Automatically renew the SSL certificate before it expires
			exec(
				`certbot renew --nginx --agree-tos --no-eff-email --non-interactive --email ${email}`,
				(error, stdout, stderr) => {
					if (error) {
						console.log(error);
						reject(false);
					}
					if (stderr) {
						console.log(stderr);
						reject(false);
					}
					console.log(stdout);
					resolve(true);
				}
			);
		});
	} catch (error) {
		console.log(error, 'error');
		return false;
	}
};

export default generateSSLCertificate;

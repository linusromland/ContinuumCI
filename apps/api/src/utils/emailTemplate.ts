// External dependencies
import fs from 'fs';
import path from 'path';

const emailTemplate = (
	templateName: string,
	template: {
		[key: string]: string;
	}
): string => {
	const templatePath = `../templates/${templateName}.html`;
	const templateContent = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8');

	if (!templateContent) throw new Error('Template not found');

	const templateKeys = Object.keys(template);
	templateKeys.forEach((key) => {
		const regex = new RegExp(`{{${key}}}`, 'g');
		templateContent.replace(regex, template[key]);
	});

	return templateContent;
};

export default emailTemplate;

/*
 * Template is a normal HTML Document
 * The template should have {{key}} where key is the key of the template object
 */

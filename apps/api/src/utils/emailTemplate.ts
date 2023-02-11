// External dependencies
import fs from 'fs';
import path from 'path';

//TODO: implement some email template engine
// Ex. https://mjml.io/

const emailTemplate = (
	templateName: string,
	template: {
		[key: string]: string;
	}
): string => {
	const templatePath = `../templates/${templateName}.html`;
	let templateContent = fs.readFileSync(
		path.resolve(__dirname, templatePath),
		'utf8'
	);

	if (!templateContent) throw new Error('Template not found');

	const templateKeys = Object.keys(template);
	for (const key of templateKeys) {
		const templateValue = template[key];
		const templateRegex = new RegExp(`{{${key}}}`, 'g');
		templateContent = templateContent.replace(templateRegex, templateValue);
	}

	return templateContent;
};

export default emailTemplate;

/*
 * Template is a normal HTML Document
 * The template should have {{key}} where key is the key of the template object
 */

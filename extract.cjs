const fs = require('fs');
const content = fs.readFileSync('src/amara-content.ts', 'utf-8');

let html = content.split('export const AMARA_BODY = ')[1].split('export const AMARA_SCRIPT = ')[0];
// It's a string, so we need to eval it or strip the quotes
// Let's just strip the first and last quotes and replace \n with newlines, \\" with "
html = html.trim();
if (html.startsWith('"')) html = html.substring(1);
if (html.endsWith('";')) html = html.substring(0, html.length - 2);
else if (html.endsWith('"')) html = html.substring(0, html.length - 1);

html = html.replace(/\\n/g, '\n').replace(/\\"/g, '"');

// Replace base64 images with placeholders to make it readable
html = html.replace(/src="data:image[^"]+"/g, 'src="[BASE64_IMAGE_HIDDEN_FOR_READABILITY]"');

fs.writeFileSync('Aapka-Clean-Landing-Page-Code.html', html);
console.log('Done');

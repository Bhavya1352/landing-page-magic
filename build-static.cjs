const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('src/amara-content.ts', 'utf-8');

// Extract AMARA_STYLE
let style = content.split('export const AMARA_STYLE = "')[1].split('";\n\nexport const AMARA_BODY')[0];
style = style.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

// Extract AMARA_BODY
let body = content.split('export const AMARA_BODY = "')[1].split('";\n\nexport const AMARA_SCRIPT')[0];
body = body.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

// Extract AMARA_SCRIPT
let script = content.split('export const AMARA_SCRIPT = "')[1];
// Remove trailing ";
script = script.trim();
if (script.endsWith('";')) script = script.substring(0, script.length - 2);
else if (script.endsWith('"')) script = script.substring(0, script.length - 1);
script = script.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Amara Signature Living — Premium 2 & 3 BHK in Keshavnagar, Pune</title>
  <meta name="description" content="Amara Signature Living — premium 2 & 3 BHK residences in Keshavnagar, Pune. Crafted interiors, signature amenities, and timeless architecture.">
  <meta property="og:title" content="Amara Signature Living">
  <meta property="og:description" content="Premium 2 & 3 BHK residences in Keshavnagar, Pune.">
  <meta property="og:type" content="website">
  <meta name="author" content="Amara Signature Living">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Raleway:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,500&display=block" rel="stylesheet">
  <style>${style}</style>
</head>
<body>
${body}
<script>${script}</script>
</body>
</html>`;

// Create deploy directory
const deployDir = path.join(__dirname, 'deploy');
if (!fs.existsSync(deployDir)) fs.mkdirSync(deployDir);

fs.writeFileSync(path.join(deployDir, 'index.html'), html);
console.log('Static build complete! Output: deploy/index.html');
console.log('File size:', (fs.statSync(path.join(deployDir, 'index.html')).size / 1024 / 1024).toFixed(2), 'MB');

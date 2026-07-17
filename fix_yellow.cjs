const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/amber/g, 'yellow');

fs.writeFileSync('src/App.tsx', content);
